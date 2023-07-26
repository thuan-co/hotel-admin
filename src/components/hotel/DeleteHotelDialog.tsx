import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
    hotel: any,
    isOpen:boolean,
    listHotels: any[],
    setListHotels: React.Dispatch<React.SetStateAction<any[]>>,
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean | null>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setMessDelete: React.Dispatch<React.SetStateAction<string | null>>,
}

/**
 * Show dialog to verify deletes hotel from system
 */
function DeleteHotelDialog(props: Props) {

    // const [ open, setOpen ] = useState(props.isOpen)

    const handleClose = () => {
        props.setIsOpen(false)
    }

    // console.log("render");
    const handleVerifyDelete = async () => {
        console.log("Handle Deleting Hotel ", props.hotel.name)
        try {
            const res = await axios.post(`http://localhost:5000/api/v1/admin/confirm-delete-hotel/${props.hotel.id}`)
            console.log('Response confirm deletes: ', res.data)
            // success 
            props.setIsSuccess(true)
            let tmp = props.listHotels.filter( item => item.id !== props.hotel.id)
            props.setListHotels(tmp)
        } catch (error:any) {
            // fail
            props.setMessDelete(error.response.data.message)
            props.setIsSuccess(false)
        }
        props.setIsOpen(false)
    }
    // useEffect(()=>{
        
    //     if (props.hotel.id !== undefined) {

    //         setOpen(true)
    //     }
    //     return () => {
    //         console.log("Clean up");
    //         props.hotel.id=undefined
    //     }
    // }, [props.hotel.id])
    return(
        <div>
            <Dialog
                open={props.isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    Xác nhận xóa khác sạn <i className='font-semibold'>{props.hotel.name || ''}</i>
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Vui lòng xác nhận hành động xóa phòng của khách sạn <i>{}</i>
                    
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button variant='outlined' color='error' onClick={handleClose}>Hủy</Button>
                <Button variant='contained' color='success' onClick={handleVerifyDelete} autoFocus>
                    Đồng ý
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default DeleteHotelDialog