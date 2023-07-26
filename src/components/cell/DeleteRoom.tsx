import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Prop = {
    room: any,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setMessageError: React.Dispatch<React.SetStateAction<string>>,
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
}
/**
 * Show up Dialog verify deleting
 */
const DeleteRoomDialog = ( props:Prop ) => {

    /**
     * Set/get value to show or close Dialog Component
     */
    // const [ open, setOpen ] = useState(false)
    const [ hotelName, setHotelName ] = useState('')

    // handle deleting room by id
    const handlerDeleteRoom = async () => {

        try {
            const res = await axios
                .delete(`http://localhost:5000/api/v1/admin/room/${props.room.id}`)
            console.log(res.data)
            props.setIsError(false)
            props.setIsOpen(true)
            props.setOpenDialog(false)
        } catch( error:any ) {
            props.setIsError(true)
            props.setIsOpen(false)
            props.setMessageError(error.response.data)
            props.setOpenDialog(false)
        }   
    }

    const handleClose = () => {
        props.setOpenDialog(false)
    }

    useEffect(() => {
        if (props.room.id !== undefined ) {
            
            ;(async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/v1/admin/hotel-name/room?id=${props.room.id}`)
                    // console.log("Response data: ", response.data)
                    setHotelName(response.data.name)
                } catch(error) {
                    // Handler error
                    console.error(error)
                }
            })()
        }
    }, [props.openDialog])

    return (
        <div>
            <Dialog
                open={props.openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    Xác nhận xóa phòng <i className='font-semibold'>{props.room.title}</i>
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Vui lòng xác nhận hành động xóa phòng của khách sạn <i>{hotelName}</i>
                    
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button variant='outlined' color='error' onClick={handleClose}>Hủy</Button>
                <Button variant='contained' color='success' onClick={handlerDeleteRoom} autoFocus>
                    Đồng ý
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default DeleteRoomDialog