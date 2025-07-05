import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    categories: [],
    selectedCategory: '',
    selectedProducts: [],
    selectedProductsToRender: [],
    showColumn: false,
    hasRunReport: false,
  },
  reducers: {
    fetchProducts: () => {},
    setProducts: (state, action) => {
      state.data = action.payload;
      state.categories = [...new Set(action.payload.map(p => p.category))];
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedProducts = [];
      state.hasRunReport = false;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
      state.hasRunReport = false;
    },
    setSelectedProductsToRender: (state, action) => {
      state.selectedProductsToRender = action.payload;
    },
    toggleShowColumn: (state, action) => {
      state.showColumn = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategory = '';
      state.selectedProducts = [];
      state.selectedProductsToRender = [];
      state.showColumn = false;
      state.hasRunReport = false;
    },
    setHasRunReport: (state, action) => {
      state.hasRunReport = action.payload;
    },
  },
});

export const {
  fetchProducts,
  setProducts,
  setCategory,
  setSelectedProducts,
  setSelectedProductsToRender,
  toggleShowColumn,
  resetFilters,
  setHasRunReport,
} = productSlice.actions;

export default productSlice.reducer;
