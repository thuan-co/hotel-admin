import { DialogContent, DialogTitle } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    open: boolean
    message: string
}
/**
 * Dialog when create hotel success and redirect to add rooms
 * @param props message when create hotel success
 */
export default function DialogHotel( props: Props) {
    const nav = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(props.open)
    const [timerAction, setTimerAction] = useState<number>(4)

    useEffect(()=>{
        setIsOpen(props.open)
    }, [props.open])

    useEffect(()=>{

        const countdown = setInterval(() => { 
            if (isOpen && timerAction > 0) {
                setTimerAction(timerAction => timerAction - 1)
            }

            
        }, 1000)
        return () => clearInterval(countdown);

    }, [isOpen, timerAction])

    useEffect(()=>{
        if ( timerAction === 0 ) {
            // console.log("Redirect to /add-rooms")
            nav('/hotel/room/add')
        }
    }, [timerAction])

    return (
        <div>
            <Dialog
                open={isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id='alert-dialog-title'>
                    {props.message}
                </DialogTitle>
                <DialogContent id="alert-dialog-description">
                    Chuyển hướng đến trang thêm số phòng cho khách sạn, sau {timerAction} giây
                </DialogContent>
            </Dialog>
        </div>
    );
};