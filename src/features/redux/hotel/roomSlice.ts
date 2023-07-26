import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MessageCreateRoom, RoomDto } from "../../model/hotel";

const initialState:MessageCreateRoom = {
    message: '',
    error: false
}
/**
 * 
 */
const roomSlice = createSlice({
    name: 'add-room',
    initialState,
    reducers: {
        sendRequestAddRoom(state, action: PayloadAction<RoomDto>) {},
        successAddRoom(state, action: PayloadAction<MessageCreateRoom>){
            return {
                ...state,
                error: false,
                message: action.payload.message
            }
        },
        failAddRoom(state, action: PayloadAction<MessageCreateRoom>) {},
        resetState() {
            return initialState
        }
    }
})
const actionAddRoom = roomSlice.actions
export default actionAddRoom

export const reducerAddRoom = roomSlice.reducer
