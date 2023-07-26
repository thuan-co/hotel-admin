import { Box, Checkbox, FormControlLabel, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { HotelDto, ResponseRoom, RoomDto } from "../../features/model/hotel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import actionAddRoom from "../../features/redux/hotel/roomSlice";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

/**
 * Component adding room numbers for hotel
 *
 */
export default function AddRoom() {

    const selector = useAppSelector((state:RootState) => state)
    const dispatch = useAppDispatch()
    const [ roomNumbers, setRoomNumbers ] = useState('')
    const [ hotels, setHotels ] = useState([] as HotelDto[])
    const [ rooms, setRooms] = useState<ResponseRoom[]>([])
    const [ roomId, setRoomId ] = useState('')
    const [ isNewRoom, setIsNewRoom] = useState(true)
    const [ hotelId, setHotelId ] = useState<string>('')
    const [ toastSuccess, setToastSuccess ] = useState(false)
    const [ roomDto, setRoomDto ] = useState<RoomDto>({
        id: '',
        title: '',
        desc: '',
        maxPeople: 3,
        price: 500,
        roomNumbers: [],
        hotelId: ''
    })
    const [ validMess, setValidMess ] = useState('')
    const [ openMess, setOpenMess ] = useState(false)
    
    async function getRoomsById() {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/admin/hotel/${hotelId}`)
            setRooms(res.data)
        } catch( err ) {
            console.error('Error: ', err)
        }
    }
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setToastSuccess(false);
    }
    const handleChangeField = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target
        setRoomDto({...roomDto, [name]: value})
    }

    /**
     * close message valid form
     */
    const handleCloseValidMess = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            setOpenMess(false);
            return
        }
    }

    const handleChangeCreateRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked
        
        // Check new room is false
        // ==> Showup select room,which loaded from server
        console.log("Check ?", hotelId)
        if (value === false) {
            getRoomsById()
        }
        setIsNewRoom(value)
        // console.log("Data: ", rooms)
    }
    // Valid form
    const validForm = () => {

        if (isNewRoom && roomDto.title === '') {
            setValidMess("Title room not empty")
            setOpenMess(true)
            return false
        }
        else if ( !isNewRoom && roomId === '') {

            setValidMess("Not room available")
            setOpenMess(true)
            return false
        }
        else if (roomDto.desc === '') {
            setValidMess("Description room not empty")
            setOpenMess(true)
            return false
        }
        else if (roomDto.price <= 0) {
            setValidMess("Price room not empty")
            setOpenMess(true)
            return false
        }
        else if (roomDto.maxPeople <= 0) {
            setValidMess("Max people room incorrect")
            setOpenMess(true)
            return false
        }
        return true
    }

    /**
     * Sending create room numbers
     */
    const sendingCreateRoomNumbers = () => {
        
        if (roomNumbers === ''){
            setValidMess("Room numbers is not empty")
            setOpenMess(true)
            return
        }
        let tmp = roomNumbers.split(/ *, */g)
        let listRoomNumbers
        try {

            listRoomNumbers = tmp.map(value => {
                let room:number = parseInt(value.trim())
                if (Number.isNaN(room)) {
                    throw new Error("Room numbers is incorrect format")
                } else {
                    return room
                }
            })
        } catch( error ) {
            // Error 
            setValidMess(String(error))
            setOpenMess(true)
            return
        }
        let tmpRoomDto
        const isValid = validForm()
        if (isValid) {
            tmpRoomDto = {
                ...roomDto,
                roomNumbers: listRoomNumbers,
                hotelId: hotelId
            }
            if ( !isNewRoom ) {
                tmpRoomDto = {
                    ...tmpRoomDto,
                    id: roomId
                }
            }
            dispatch(actionAddRoom.sendRequestAddRoom(tmpRoomDto))
        }
        // console.log("Sending data: ", roomDto)
    }
    /**
     * Fetching list hotels when load page
     */
    const fetchingHotels = async () => {

        const res = await axios.get('http://localhost:5000/api/v1/admin/hotels')
        // console.log("Hotels: ", res.data)
        setHotels(res.data)
        setHotelId(res.data[0].id)
    }
    /**
     * Fetching list rooms hotel when creating new hotel
     */
    const fetchingRoomsHotel = async (hotelId:string) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/admin/hotel/${hotelId}`)
            console.log("List rooms: ", res.data)
            setRooms(res.data)
        } catch(err) {
            console.error('Error call api get rooms by hotelId ', err)
        }
    }
    /**
     * Loading hotels from server or Add hotel page
     */
    useEffect(()=>{
        // => Checking hotelId (New hotel, created from add hotel page)
        if ( selector.hotel.hotelId !== '') {
            
            setRooms(selector.hotel.rooms)
            setRoomDto({...roomDto, 'hotelId': selector.hotel.hotelId})
            setHotelId(selector.hotel.hotelId)
            // fetchingRoomsHotel(selector.hotel.hotelId)
        } else {
            // => loading from server
            console.log("Loading hotels from server")
            fetchingHotels()
        }
    }, [])

    useEffect( ()=> {
        // console.log("Reload when choses hotel else")
        if ( hotelId !== '') {
            getRoomsById()
        }
    }, [hotelId])

    // Handle success create room number for hotel
    useEffect(() => {
        if ( selector.room.error === false && selector.room.message !== '') {
            // => showup alter success
            setToastSuccess(true)
            // => clear fields
            setRoomDto({
                id: '',
                title: '',
                desc: '',
                maxPeople: 3,
                price: 500,
                roomNumbers: [],
                hotelId: ''
            })
            setRoomNumbers('')
            setRoomId('')
        }
    }, [selector.room])
    
    return (
        <section className="p-3 text-black">
            {/* Header page */}
            <div className="shadow-hotel-title w-full h-12 flex items-center text-gray-400 font-medium mb-3 pl-3"><h3>Update rooms number for hotel</h3></div>
            <Box
                component='form'
                noValidate
                autoComplete="off"
                className="shadow-hotel-form max-h-full p-4 w-full grid grid-cols-2 gap-x-[125px] gap-y-6"
            >
                <Snackbar open={openMess} onClose={handleCloseValidMess} >
                    <Alert onClose={handleCloseValidMess}  severity="error" sx={{ width: '100%' }}>
                    {validMess}
                    </Alert>
                </Snackbar>
                <Snackbar open={toastSuccess} onClose={handleClose} autoHideDuration={3000} >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {selector.room.message}
                    </Alert>
                    </Snackbar>
                <div className="grid grid-cols-[75%_1fr] items-center justify-between">
                    {
                        (isNewRoom) ? <TextField id="room-title" className="w-[80%]" name="title" value={roomDto.title} onChange={handleChangeField} label='Title' variant="standard" placeholder="2 bed room"/> :
                            // Get list rooms
                            <Select name="roomId" value={roomId} 
                                sx={{ m: 1, minWidth: "80%" }} size="small"
                                onChange={(event) => setRoomId(event.target.value)} >
                                    <MenuItem value={''}>Selected Room</MenuItem>
                                {
                                    rooms.map((value, index) => (
                                        <MenuItem key={index} value={value.id}>{value.title}</MenuItem>
                                    ))
                                }
                            </Select>
                    }
                    <FormControlLabel control={<Checkbox defaultChecked={isNewRoom} onChange={handleChangeCreateRoom}/>} label="Tạo mới" />
                </div>
                <TextField id="room-description" label='Description' name="desc" onChange={handleChangeField} value={roomDto.desc} variant="standard" required placeholder="King size bed.1 bad room"/>
                <TextField id="room-price" label='Price' name="price" value={roomDto.price} onChange={handleChangeField} variant="standard" type="number" required placeholder="100"/>
                <TextField id="room-max" label='Max People' name="maxPeople" value={roomDto.maxPeople} onChange={handleChangeField} variant="standard" type="number" required placeholder="2"/>
                <div className="col-span-2 flex flew-row justify-between items-start">
                    <label htmlFor="hotel-rooms" className="flex flex-col">
                        Rooms
                        <textarea required name="room-numbers" value={roomNumbers} id="hotel-rooms" onChange={(event) => {
                            setRoomNumbers(event.target.value)
                        }} rows={3} cols={40} className="border border-gray-950" placeholder="give comma between room numbers"/>
                    </label>
                    <label className="flex flex-col">
                        Choose a hotel
                        <Select name="hotelId" value={hotelId}
                            sx={{ m: 1, minWidth: "100%" }} size="small"
                            onChange={(event) => {
                                setHotelId(event.target.value)
                                // setRoomDto({...roomDto, 'hotelId':event.target.value})
                            }} className="border border-gray-950 uppercase">
                            {
                                (hotels.length !== 0) ?
                                hotels.map((value, index) => (
                                    <MenuItem className="uppercase" key={index} value={value.id}>{value.name}</MenuItem>
                                )) : 
                                    <option className="uppercase" value={selector.hotel.hotelId} >{selector.hotel.hotelName}</option>
                            }
                        </Select>
                    </label>
                    {/* Button Send */}
                    <div onClick={sendingCreateRoomNumbers} className="bg-[#008080] w-[150px] h-10 flex items-center justify-center text-slate-50 hover:cursor-pointer hover:bg-[#002A2A]">
                        <span>Send</span>
                    </div>
                </div>
            </Box>
        </section>
    );
};