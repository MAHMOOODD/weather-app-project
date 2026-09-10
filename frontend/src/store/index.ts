import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './features/Weather/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    // user: userReducer,
  },
});

// استنتاج الـ types من الـ store نفسه
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;