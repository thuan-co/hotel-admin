import axios from "axios"
import hotelAction from "../redux/hotel/hotelSlice"
import actionAddRoom from "../redux/hotel/roomSlice"

export function apiHotelAdmin(endpoint:string, action:string, data:any) {
    const baseUrl = 'http://localhost:5000/api/v1/admin'
    const header = {
        "Content-Type": "application/json"
    }
    /**
     * Creating new hotel
     */
    if (action === hotelAction.createHotelReq.type) {
        return axios(
            {
                headers:header,
                url: baseUrl + endpoint,
                method: 'post',
                data: data,
            }
        ).then(res => {
            return [res.data, null]
        }).catch( error => {
            console.log("Error call api creates hotel;")
            return [null, error.response.data]
        })
    }
    /**
     * Creating or updating room for hotel
     */
    else if (action === actionAddRoom.sendRequestAddRoom.type) {
        return axios(
            {
                headers:header,
                url: baseUrl + endpoint,
                method: 'post',
                data: data,
            }
        ).then(res => {
            return [res.data, null]
        }).catch( error => {
            console.log("Error call api add room for hotel;")
            return [null, error.response.data]
        })
    }
}