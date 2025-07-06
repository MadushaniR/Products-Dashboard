import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],                    // All product data fetched from API
    categories: [],              // Unique product categories derived from data
    selectedCategory: '',        // Currently selected category filter
    selectedProducts: [],        // Products selected by user for filtering
    selectedProductsToRender: [],// Products to display in report after running
    showColumn: false,           // Controls whether product columns are visible
    hasRunReport: false,         // Flag indicating if report has been run
  },
  reducers: {
    // Action to trigger fetching products (handled by saga)
    fetchProducts: () => {},

    // Store fetched products and extract unique categories
    setProducts: (state, action) => {
      state.data = action.payload;
      state.categories = [...new Set(action.payload.map(p => p.category))];
    },

    // Set selected category, clear selected products and reset report flags
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedProducts = [];
      state.hasRunReport = false;
      state.showColumn = false;
    },

    // Set selected products and reset report flag
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
      state.hasRunReport = false;
    },

    // Set products to render after running report
    setSelectedProductsToRender: (state, action) => {
      state.selectedProductsToRender = action.payload;
    },

    // Show or hide product columns
    toggleShowColumn: (state, action) => {
      state.showColumn = action.payload;
    },

    // Reset all filters and report-related flags to initial state
    resetFilters: (state) => {
      state.selectedCategory = '';
      state.selectedProducts = [];
      state.selectedProductsToRender = [];
      state.showColumn = false;
      state.hasRunReport = false;
    },

    // Set whether the report has been run
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
