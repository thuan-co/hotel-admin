import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';

import StatusCell from '../../components/cell/StatusCell';
/**
 * Dashboard manages general system
 */
export default function Dashboard() {
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
    const [ users, setUsers ] = useState('')
    const [ orders, setOrders ] = useState('')
    const [ total, setTotal ] = useState('')
    // const rows = [
    //     // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, user: "thuan", hotel: "Alagon Saigon Hotel & Sapa", room: "201, 201", date: "12-12-2023", price: "$300", payment: "Credit Card", status: "checkout"}
    // ]

    const [ rowsTransaction, setRowsTransaction ] = useState([])

    useEffect(() => {
        
        // Fetching 8 transaction newest
        ;(async () => {
            const res = await axios.get('http://localhost:5000/api/v1/admin/transaction?limit=8')
            setRowsTransaction(res.data)
        })()
        // Fetching total users
        ;(async () => {
            const res = await axios.get('http://localhost:5000/api/v1/admin/total-user')
            // console.log("Total user: ", res.data)
            setUsers(res.data.totalUser)
        })()
        // Fetching Orders

        // Total earning
        ;(async () => {
            const res = await axios.get('http://localhost:5000/api/v1/admin/total-earning')
            // console.log("Total earning: ", res.data)
            setOrders(res.data.order)
            setTotal(res.data.total)
        })()
    }, [])

    return(
        <section className='w-full p-3'>
            {/* Overview financial */}
            <div className='grid grid-cols-4 w-full gap-3 mb-16'>
                <div className='shadow-lg flex flex-col p-2 rounded-md'>
                    <h3 className='uppercase text-xs mb-3 font-medium text-gray-500'>users</h3>
                    <p className='text-xl'>{users}</p>
                    <div className='flex justify-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#d86b6b] p-1 rounded-md bg-[#FFCCCC]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                </div>
                <div className='shadow-lg flex flex-col p-2 rounded-md'>
                    <h3 className='uppercase text-xs mb-3 font-medium text-gray-500'>orders</h3>
                    <p className='text-xl'>{orders}</p>
                    <div className='flex justify-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 bg-[#F8EDD2] p-1 rounded-md text-[#DFB13E]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </div>
                </div>
                <div className='shadow-lg flex flex-col p-2 rounded-md'>
                    <h3 className='uppercase text-xs mb-3 font-medium text-gray-500'>earnings</h3>
                    <p className='text-xl'>$ {total}</p>
                    <div className='flex justify-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 bg-[#CCE6CC] p-1 rounded-md text-[#39D139]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <div className='shadow-lg flex flex-col p-2 rounded-md'>
                    <h3 className='uppercase text-xs mb-3 font-medium text-gray-500'>balance</h3>
                    <p className='text-xl'>$ 100</p>
                    <div className='flex justify-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 bg-[#E6CCE6] p-1 rounded-md text-[#993399]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                    </div>
                </div>
            </div>
            {/* Header*/}
            <h3>Latest Transactions</h3>
            {/* Financial for booking*/}
            <DataGrid
                rows={rowsTransaction}
                columns={columns}
                // initialState={{
                //     pagination: {
                //         paginationModel: { page: 0, pageSize: 8 },
                //     },
                // }}
                pageSizeOptions={[8, 16]}
                checkboxSelection
            />
        </section>
    )
}