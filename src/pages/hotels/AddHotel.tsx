import { Box, TextField } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { forwardRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { NewHotelDto } from "../../features/model/hotel";
import hotelAction from "../../features/redux/hotel/hotelSlice";
import DialogHotel from "./DialogHotel";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})
/**
 * Component for action add new hotel
 */
export default function AddHotel() {

    const dispatch = useAppDispatch()
    const selector = useAppSelector( (state:RootState) => state.hotel)
    const [ open, setOpen ] = useState(false)
    const [ hotelDto, setHotelDto ] = useState<NewHotelDto>({
        name: "",
        city: "",
        distance: "",
        desc: "",
        photos: [],
        rooms: [],
        type: "",
        address: "",
        cheapestPrice: 500,
        featured: false,
        rating: 0.0
    })
    const [ validMess, setValidMess ] = useState('')
    const [ openMess, setOpenMess ] = useState(false)
    const [ rooms, setRooms ] = useState('')
    const [ photos, setPhotos ] = useState('')

    /**
     * close message valid form
     */
    const handleCloseValidMess = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            setOpenMess(false);
            return
        }
    };
    /** 
     * Handle change fields
     */
    const handleChangeFields = function(event:React.ChangeEvent<HTMLInputElement>) {
        const {value, name} = event.target
        setHotelDto({...hotelDto, [name]:value})
    }
    /**
     * Checking/valid fields form adding new hotel
     */
    const validFieldsForm = (hotelDto:NewHotelDto) => {
        // => checking empty fields
        if (hotelDto.name === '') {
            setValidMess("Name hotel not empty!")
            setOpenMess(true)
            return false
        }
        else if (hotelDto.city === '') {
            setValidMess("City field not empty!")
            setOpenMess(true)
            return false
        } 
        else if (hotelDto.desc === '') {
            setValidMess("Description hotel not empty!")
            setOpenMess(true)
            return false
        }
        else if (hotelDto.distance === '') {
            setValidMess("Distance field not empty!")
            setOpenMess(true)
            return false
        }
        else if (hotelDto.photos.length === 0) {
            setValidMess("Photos hotel not empty!")
            setOpenMess(true)
            return false
        }
        else if (hotelDto.type === '') {
            setValidMess("Type hotel not empty!")
            setOpenMess(true)
            return false
        }
        else if (hotelDto.address === '') {
            setValidMess("Address hotel not empty!")
            setOpenMess(true)
            return false
        }
        else if (hotelDto.cheapestPrice <= 0) {
            setValidMess("Price hotel not empty!")
            setOpenMess(true)
            return false
        }
        else if (hotelDto.rooms.length === 0) {
            setValidMess("List rooms hotel not empty!")
            setOpenMess(true)
            return false
        }

        return true
    }
    /**
     * Creating new hotel click "Send" button
     */
    const handleSendCreateHotel = () => {

        let tmpHotelDto = {...hotelDto}
        let tmpPhotos = photos.split('\n')
        tmpPhotos = tmpPhotos.map(value => value.trim())
        // setHotelDto({...hotelDto, photos:tmpPhotos})
        tmpHotelDto.photos = tmpPhotos

        let tmpRooms = rooms.split('\n')
        tmpRooms = tmpRooms.map(value => value.trim())
        // setHotelDto({...hotelDto, rooms: tmpRooms})
        tmpHotelDto.rooms = tmpRooms

        let isValid = validFieldsForm(tmpHotelDto)
        if ( isValid ) {

            dispatch(hotelAction.createHotelReq(tmpHotelDto))
        }
        // console.log("Hotel DTO: ", tmpHotelDto)
        setOpen(true)
    }

    return (
        <section className="p-3 text-black">
            <DialogHotel open={open} message={selector.message} />
            {/* Header page */}
            <div className="shadow-hotel-title w-full h-12 flex items-center text-gray-400 font-medium mb-3 pl-3"><h3>Add New Hotel</h3></div>
            {/* Form Adding new hotel */}
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
                <TextField id="hotel-name" label='Name' value={hotelDto.name} name="name" variant="standard" placeholder="My Hotel"
                    onChange={handleChangeFields}
                />
                <TextField id="hotel-city" label='City' value={hotelDto.city} name="city" variant="standard" placeholder="New York"
                    onChange={handleChangeFields}
                />
                <TextField id="hotel-distance" label='Distance from City Center' value={hotelDto.distance} name="distance" variant="standard" placeholder="500"
                    onChange={handleChangeFields}
                />
                <TextField id="hotel-description" multiline label='Description' value={hotelDto.desc} name="desc" variant="standard" placeholder="Description"
                    onChange={handleChangeFields}
                />
                <label >
                    Images:
                    <textarea name="photos" onChange={(event) => setPhotos(event.target.value)} id="hotel-images" className="w-full border border-gray-950" />
                </label>
                <TextField id="hotel-type" onChange={handleChangeFields} name="type" value={hotelDto.type} label='Type' variant="standard" placeholder="hotel"/>
                {/* TODO: address using other */}
                <TextField id="hotel-address" onChange={handleChangeFields} name="address" value={hotelDto.address} label='Address' variant="standard" placeholder="new york 123"/>
                {/* <TextField id="hotel-title" name="" label='Title' variant="standard" placeholder="The wonderful"/> */}
                <TextField id="hotel-price" onChange={handleChangeFields} type="number" name="cheapestPrice" value={hotelDto.cheapestPrice} label='Price' variant="standard" placeholder="100"/>
                <label className="flex flex-col">
                    Featured
                    <select name="featured" id="hotel-featured" 
                        // value={hotelDto.featured}
                        onChange={(event) => {
                            const { value, name } = event.target
                            let isFeatured = false
                            if (value === 'true') {
                                isFeatured = true
                            }
                            setHotelDto({...hotelDto, [name]:isFeatured})

                        }} className="w-14 border border-gray-950">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </label>

                <div className="col-span-2">
                    <label htmlFor="hotel-rooms">Rooms</label>
                    <textarea onChange={(event => setRooms(event.target.value))}  name="rooms" id="hotel-rooms" rows={4} className="w-full border border-gray-950" />
                </div>
                {/* Button Send */}
                <div className="bg-[#008080] w-[150px] h-10 flex items-center justify-center text-slate-50 hover:cursor-pointer hover:bg-[#002A2A]"
                onClick={handleSendCreateHotel}>
                    <span>Send</span>
                </div>
            </Box>
        </section>
    );
};