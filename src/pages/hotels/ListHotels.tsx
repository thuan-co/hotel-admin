import Button from '@mui/material/Button';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

import { ListHotelResponse } from "../../features/model/hotel";
import DeleteHotelDialog from '../../components/hotel/DeleteHotelDialog';
import UpdateHotelDialog from '../../components/hotel/UpdateHotelDialog';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})
/**
 * UI views Hotels, consist of performs: view, add, delete.
 */
export default function ListHotels() {

    const [ hotels, setHotels ] = useState<any[]>([])
    // Hotel being selected by user
    const [ hotelSelected, setHotelSelected ] = useState<any>({})
    // Open/Close dialog verify hotel
    const [ isOpen, setIsOpen ] = useState(false)
    // Open/close notification hotel deleting action success
    const [ isSuccess, setIsSuccess ] = useState<boolean | null>(null)
    // Message fail when deleting hotel
    const [ messDelete, setMessDelete ] = useState<string | null>(null)
    // open/close updating hotel dialog
    const [ updateOpen, setUpdateOpen ] = useState(false)
    // Close/open updating alter message
    const [ isUpdateSuccess, setIsUpdateSuccess ] = useState<boolean | null>(null)

    const delayCall = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Faking call api")
            }, 2000)
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', width: 200, headerName: 'ID'},
        {field: 'name', width: 250, headerName: 'Name'},
        {field: 'type', width: 100, headerName: 'Type'},
        // {field: 'title', headerName: 'Title'},
        {field: 'city', width: 150, headerName: 'City'},
        // Action passing ID
        // {field: 'action', width: 100, headerName: "Action", renderCell: DeleteCell}
        {field: '', width: 250, type: "actions", headerName: "Action", getActions: (params: GridRowParams) => [
            <GridActionsCellItem
                icon={<Button variant='outlined' color='error' size='small'>Delete</Button>}
                label="Delete"
                onClick={ async () => {
                    // showup dialog verify deleting room
                    // checking room have allow deleted?
                    try {
                        // await delayCall()
                        // console.log('onclick: ', params.row.id)
                        const res = await axios.delete(`http://localhost:5000/api/v1/admin/hotel/${params.row.id}`)
                        const data = res.data
                        if ( data.accept ) {

                            setHotelSelected(params.row)  
                            setIsOpen(true)    
                        } else {
                            setIsSuccess(false)
                            setMessDelete(data.message)
                        }
                    } catch (error) {
                        
                    }

                }}
            />,
            <GridActionsCellItem
                icon={<Button variant='contained' color='primary' size='small'>Update</Button>}
                label="Update"
                onClick={ () => {
                    ;(async () => {
                        try{
                            const res = await axios.get(`http://localhost:5000/api/v1/admin/get/hotel/${params.id}`)
                            // console.log("Hotel: ", res.data)
                            setHotelSelected(res.data)
                            setUpdateOpen(true)
                        } catch(error:any) {
                            console.log(error.response.data)
                        }
                    })()
                }}
            />,
        ]}
    ]

    const handleCloseDeletingAlter = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            setIsSuccess(false)
            setMessDelete(null)
            setIsUpdateSuccess(false)
            // setIsError(false)
            return;
        }
    }
    // Fetching data (list hotels) was existed from server
    async function getListHotels() {
        const response = await axios.get('http://localhost:5000/api/v1/admin/list-hotel')
        
        let rows = response.data.map((value: ListHotelResponse) => {
            return {
                id: value.id,
                name: value.name,
                type: value.type,
                city: value.city,
            }
        })
        setHotels(rows)
    }

    useEffect(()=> {
        if (hotels.length === 0) {
            // console.log("Loading list hotels")
            getListHotels()
        }
    }, [])

    return(
        <section className="p-3 w-full">
            {/* Dialog for deleting hotel */}
            <DeleteHotelDialog hotel={hotelSelected} 
                isOpen={isOpen} setIsOpen={setIsOpen} 
                setIsSuccess={setIsSuccess}
                setMessDelete={setMessDelete}
                listHotels={hotels}
                setListHotels={setHotels}
            />
            {/* Updating hotel dialog */}
            <UpdateHotelDialog open={updateOpen} setOpen={setUpdateOpen}
                hotel={hotelSelected}
                listHotels={hotels}
                setListHotels={setHotels}
                setIsUpdateSuccess={setIsUpdateSuccess}
            />
            {/* Notify deleting success hotel */}
            <Snackbar open={Boolean(isSuccess)} autoHideDuration={3000} onClose={handleCloseDeletingAlter}>
                <Alert onClose={handleCloseDeletingAlter} severity="success" sx={{ width: '100%' }}>
                    Xóa thành công khách sạn {hotelSelected.name}
                </Alert>
            </Snackbar>
            {/* Notify deleting success hotel */}
            <Snackbar open={Boolean(messDelete)} autoHideDuration={3000} onClose={handleCloseDeletingAlter}>
                <Alert onClose={handleCloseDeletingAlter} severity="error" sx={{ width: '100%' }}>
                    { messDelete }
                </Alert>
            </Snackbar>  
            {/* Notify Updating success hotel */}
            <Snackbar open={Boolean(isUpdateSuccess)} autoHideDuration={3000} onClose={handleCloseDeletingAlter}>
                <Alert onClose={handleCloseDeletingAlter} severity="success" sx={{ width: '100%' }}>
                    Cập nhật thành công khách sạn {hotelSelected.name}
                </Alert>
            </Snackbar> 
            {/* Header section hotels */}
            <div className="flex flex-row justify-between mb-3">
                <h3>Hotels List</h3>
            </div>
            <div>
                <Button size="small" variant="outlined" className="justify-end" color="success">Add New</Button>
                <DataGrid 
                    sx={{ width: 'fit-content',
                        height: 'fit-content',
                    }}
                    columns={columns}
                    rows={hotels}
                />
            </div>
        </section>
    )
}