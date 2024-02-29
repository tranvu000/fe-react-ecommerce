import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const productSlide = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = capitalizeFirstLetter(action.payload);
    },
  },
});

export const { searchProduct } = productSlide.actions;

export default productSlide.reducer;