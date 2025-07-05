import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
    },
    setProducts: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchProducts, setProducts } = productSlice.actions;
export default productSlice.reducer;
