import { all } from "redux-saga/effects";
import { watcherCreatingHotel, watcherRoomsHotel } from "../features/saga/hotel/hotelCreateSaga";

export default function* rootSaga() {
    yield all([watcherCreatingHotel(), watcherRoomsHotel()])
}