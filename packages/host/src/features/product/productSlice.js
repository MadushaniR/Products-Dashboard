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
    setProducts: (s, a) => {
      s.data = a.payload;
      s.categories = [...new Set(a.payload.map(p => p.category))];
    },
    setCategory: (s, a) => {
      s.selectedCategory = a.payload;
      s.selectedProducts = [];
      s.hasRunReport = false;
      s.showColumn = false;
    },
    setSelectedProducts: (s, a) => {
      s.selectedProducts = a.payload;
      s.hasRunReport = false;
    },
    setSelectedProductsToRender: (s, a) => {
      s.selectedProductsToRender = a.payload;
    },
    toggleShowColumn: (s, a) => {
      s.showColumn = a.payload;
    },
    resetFilters: (s) => {
      s.selectedCategory = '';
      s.selectedProducts = [];
      s.selectedProductsToRender = [];
      s.showColumn = false;
      s.hasRunReport = false;
    },
    setHasRunReport: (s, a) => {
      s.hasRunReport = a.payload;
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
