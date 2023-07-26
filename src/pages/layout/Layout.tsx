import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect } from "react";

/**
 * Setting layout/ui for website admin
 */
export default function Layout() {

    const nav = useNavigate()
    const user = localStorage.getItem('user')

    useEffect(() => {
        if ( !user ) {
            nav('/login')
        }
    })

    if ( user ) {
        // console.log("Login success")
        return(
            <div className="grid grid-cols-[20%_1fr] grid-rows-[8%_1fr] min-h-[100vh] w-full">
                {/* Header sidebar */}
                <div className="flex justify-center items-center">
                    <span className="text-blue-600 font-medium text-xl">Admin Page</span>
                </div>
                {/* Top header */}
                <div className="border-l-2 border-b-2"></div>
                {/* Sidebar */}
                <div className="border-r-2 border-t-2">
                    <Sidebar />
                </div>
                {/* Main content manages website */}
                <Outlet />
            </div>
        )
    } else {
        return null
    }    
}