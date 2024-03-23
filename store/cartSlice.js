import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  cartItems: []
}
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // console.log(current(state))
      state.cartItems.push(action.payload);

    },
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    emptyCart(state, action) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
