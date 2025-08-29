import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import wishlistSlice from './slices/wishlistSlice';
import productsSlice from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;