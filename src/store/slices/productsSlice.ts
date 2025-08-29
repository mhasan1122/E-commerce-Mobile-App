import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ViewMode } from '../../types';

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  viewMode: ViewMode;
  loading: boolean;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: 'all',
  searchQuery: '',
  viewMode: 'grid',
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.categories = ['all', ...Array.from(new Set(action.payload.map(p => p.category)))];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredProducts = state.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(action.payload.toLowerCase()) ||
                            product.description.toLowerCase().includes(action.payload.toLowerCase());
        const matchesCategory = state.selectedCategory === 'all' || product.category === state.selectedCategory;
        return matchesSearch && matchesCategory;
      });
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.filteredProducts = state.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCategory = action.payload === 'all' || product.category === action.payload;
        return matchesSearch && matchesCategory;
      });
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setSearchQuery, setSelectedCategory, setViewMode, setLoading } = productsSlice.actions;
export default productsSlice.reducer;