import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './clients/clientSlice';

export const store = configureStore({
  reducer: {
    clientes: clientReducer
  }
});