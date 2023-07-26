import { DataGrid, GridColDef } from "@mui/x-data-grid"
import axios from "axios"
import { useEffect, useState } from "react"
import StatusCell from "../../components/cell/StatusCell"

function Transaction() {
    
    const columns: GridColDef[] = [
        { field: 'id', width: 200, headerName: 'ID' },
        { field: 'username', width: 200, headerName: 'User' },
        { field: 'hotel', width: 200, headerName: 'Hotel', minWidth: 200 },
        { field: 'room', width: 200, headerName: 'Room' },
        { field: 'date', width: 200, headerName: 'Date' },
        { field: 'price', headerName: 'Price', valueFormatter: (params) => '$' + params.value  },
        { field: 'payment', headerName: 'Payment Method'},
        { field: 'status', headerName: 'Status', renderCell: StatusCell }
    ]
    const [ rowsTransaction, setRowsTransaction ] = useState([])
    
    useEffect(() => {
        ;(async () => {
            const res = await axios.get('http://localhost:5000/api/v1/admin/transaction')
            console.log(res.data)
            setRowsTransaction(res.data)
        })()
    }, [])
    return(
        <section>
            Transaction Page
            
            <DataGrid
                rows={rowsTransaction}
                style={{ height: 'fit-content', width: 'fit-content' }}
                columns={columns}
                // initialState={{
                //     pagination: {
                //         paginationModel: { page: 0, pageSize: 8 },
                //     },
                // }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </section>
    )
}
export default Transaction