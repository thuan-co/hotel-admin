import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { hotelReducer } from '../features/redux/hotel/hotelSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { reducerAddRoom } from '../features/redux/hotel/roomSlice';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    hotel: hotelReducer,
    room: reducerAddRoom,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
