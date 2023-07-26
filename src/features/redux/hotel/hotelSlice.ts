import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NewHotelDto, ResponseNewHotel } from "../../model/hotel";

const initialState:ResponseNewHotel = {
    message: '',
    hotelId: '',
    hotelName: '',
    rooms: []
}
/**
 * Redux responsive for creating new hotel
 */
const hotelSlice = createSlice({
    name: 'create-hotel',
    initialState,
    reducers: {
        createHotelReq(state, action: PayloadAction<NewHotelDto>){

        },
        createHotelSuccess(state, action: PayloadAction<ResponseNewHotel>) {
            // console.log("Tao thanh cong khong")
            // console.log("Response: ", action.payload)
            let tmp = state
            tmp = {...action.payload}
            return tmp
        },
        createHotelFail(state, action:PayloadAction<string>) {
            let tmp = {
                ...state,
                message: action.payload,
                hotelId: '',
                rooms: []
            }
            return tmp
        },
        resetState() {
            return initialState
        }
    }
})
// Actions
const hotelAction = hotelSlice.actions 
export default hotelAction
// Reducer
export const hotelReducer = hotelSlice.reducer