import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './OrderListSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
