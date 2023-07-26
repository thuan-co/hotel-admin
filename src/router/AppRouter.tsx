import { BrowserRouter, Route, Routes } from "react-router-dom"

import Transaction from "../pages/Transaction/Transaction"
import Login from "../pages/auth/Login"
import Dashboard from "../pages/dashboard/Dashboard"
import AddHotel from "../pages/hotels/AddHotel"
import AddRoom from "../pages/hotels/AddRoom"
import ListHotels from "../pages/hotels/ListHotels"
import ListRooms from "../pages/hotels/ListRooms"
import Layout from "../pages/layout/Layout"
import ListUsers from "../pages/users/ListUsers"

/**
 * Configs router for website admin
 */
export default function AppRouter() {

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<Dashboard />} />
                    <Route path="/users" element={<ListUsers />} />
                    <Route path="/rooms" element={<ListRooms />} />
                    <Route path="/hotels" element={<ListHotels />} />
                    <Route path="/hotel/add" element={<AddHotel />} />
                    <Route path="/hotel/room/add" element={<AddRoom />} />
                    <Route path="/transaction" element={<Transaction />}/>
                </Route>
                <Route path="/logout" />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
    
}