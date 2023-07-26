import { PayloadAction } from '@reduxjs/toolkit'
import { call, delay, fork, put, takeLatest } from 'redux-saga/effects'

import { NewHotelDto, RoomDto } from '../../model/hotel'
import hotelAction from '../../redux/hotel/hotelSlice'
import { apiHotelAdmin } from '../../API/AdminApi'
import actionAddRoom from '../../redux/hotel/roomSlice'

// ==> Adding Hotel Feature
function* handleCreatingHotel(action:PayloadAction<NewHotelDto>) {
    const [result, error]:any[] = yield call(apiHotelAdmin, '/add-hotel', action.type, action.payload)
    if (result) {
        yield put(hotelAction.createHotelSuccess(result))
    } else {
        yield put(hotelAction.createHotelFail(error))
    }
}

function* creatingHotelSaga() {
    yield takeLatest(hotelAction.createHotelReq, handleCreatingHotel)
}

export function* watcherCreatingHotel() {
    yield fork(creatingHotelSaga)
}
// ==> End

// ==> Adding/Updating Room For Hotel Feature
function* handleModifyRoomHotel(action: PayloadAction<RoomDto>) {
    // yield delay(1000)
    // console.log("Payload: ", action.payload)
    const [result, error]:any[] = yield call(apiHotelAdmin, '/add-rooms', action.type, action.payload)
    if ( result ) {
        yield put(actionAddRoom.successAddRoom(result))
    } else {
        yield put(actionAddRoom.failAddRoom(error))
    }
}

function* modifyRoomHotelSaga() {
    yield takeLatest(actionAddRoom.sendRequestAddRoom, handleModifyRoomHotel)
}

export function* watcherRoomsHotel() {
    yield fork(modifyRoomHotelSaga)
}
// ==> End