import { Button, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import DeleteRoomDialog from "../../components/cell/DeleteRoom";
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Show up list rooms
export default function ListRooms() {

    const [ pageState, setPageState ] = useState({
        isLoading: false,
        data: [{id: '', title: '', desc: '', price: '', maxPeople: '', action: ''}],
        total: 0,
    })
    const [ roomSelected, setRoomSelected ] = useState<any>({})
    const [ paginationModel, setPaginationModel ] = useState({
        pageSize: 10,
        page: 0,
    })
    /**
     * Open/close notify success deleting
     */
    const [ isOpen, setIsOpen ] = useState(false)
    // Open/close dialog verify deleting room
    const [ openDialog, setOpenDialog ] = useState(false)
    const [ isError, setIsError ] = useState(false)
    const [ messageError,setMessageError ] = useState('')

    const columns: GridColDef[] = [
        {field: 'id', width: 200, headerName: 'ID'},
        {field: 'title', width: 200, headerName: 'Title'},
        {field: 'desc', width: 250, headerName: 'Description'},
        {field: 'price', width: 150, headerName: 'Price'},
        {field: 'maxPeople', width: 150, headerName: 'Max People'},
        // Action passing ID
        {field: '', width: 100, type: "actions", headerName: "Action", getActions: (params: GridRowParams) => [
            <GridActionsCellItem
                icon={<Button variant='outlined' color='error' size='small'>Delete</Button>}
                label="Delete"
                onClick={()=>{
                    // showup dialog verify deleting room
                    setRoomSelected(params.row)
                    setOpenDialog(true)
                    // console.log('onclick: ', params.row)
                }}
            />,
        ]}
    ]

    const handleCloseDeletingAlter = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            setIsOpen(false)
            setIsError(false)
            return;
        }
    }

    useEffect(() => {
        // console.log("Pagination: ", paginationModel)
        ;(async ()=>{
            setPageState(old => ({ ...old, isLoading: true }))
            try {

                const response = await axios.get(`http://localhost:5000/api/v1/admin/list-room?limit=${paginationModel.pageSize}&page=${paginationModel.page}`)

                const result = response.data
                const rows = result.docs.map( (value:any) => {
                    return {
                        id: value.id,
                        title: value.title,
                        desc: value.desc,
                        price: value.price,
                        maxPeople: value.maxPeople,
                        // action: value.id
                    }
                })
                // console.log("Response from server: ", rows)
                setPageState(old => ({ ...old, isLoading: false, data: rows, total: result.totalDocs}))
            } catch( error ) {

            }
            
        })()
    }, [paginationModel, isOpen])
    
    return (
    <div className="m-6">
        {/* Notify deleting success room */}
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleCloseDeletingAlter}>
            <Alert onClose={handleCloseDeletingAlter} severity="success" sx={{ width: '100%' }}>
                Xóa thành công phòng (id: {roomSelected.id})
            </Alert>
        </Snackbar>
        {/* Notify deleting success room */}
        <Snackbar open={isError} autoHideDuration={3000} onClose={handleCloseDeletingAlter}>
            <Alert onClose={handleCloseDeletingAlter} severity="error" sx={{ width: '100%' }}>
                Xóa phòng thất bại! (id: {roomSelected.id})
                Error: {messageError}!!!
            </Alert>
        </Snackbar>
        {/* Dialog confirm delete a room */}
        <DeleteRoomDialog room={roomSelected} setIsOpen={setIsOpen} setIsError={setIsError} setMessageError={setMessageError}
            openDialog={openDialog} setOpenDialog={setOpenDialog}
        />
        {/* Show up data from server */}
        <DataGrid
            style={{ height: 'fit-content', width: 'fit-content' }}
            rows={pageState.data}
            columns={columns}
            rowCount={pageState.total}
            loading={pageState.isLoading}
            pageSizeOptions={[5]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
        />
    </div>
)}