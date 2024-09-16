import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  clientes: []
};



const clientSlice = createSlice({
  name: 'clientes',
  initialState,
  reducers: {
    addClient : (state, action) => {
      const clientAlreadyLoaded = state.clientes.some(
        (client) => client.id === action.payload.id
      );
      if(!clientAlreadyLoaded){
        state.clientes = [...state.clientes, action.payload];
      }
    },
    editClient: (state, action) => {
      let id = action.payload.id;
      const index = state.clientes.findIndex(cliente => cliente.id === id);
      if (index !== -1) {
        state.clientes[index] = action.payload;
      }
    },
    deleteClient: (state, action) => {
      const id = action.payload.id;
      state.clientes = state.clientes.filter(cliente => cliente.id !== id);
    }
  }
});

export const { addClient, editClient, deleteClient, validateClient } = clientSlice.actions;
export default clientSlice.reducer;