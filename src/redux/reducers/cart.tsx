import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";

// Define types
interface CartItem {
  _id: string;
  // Add other properties of your cart item
}

interface CartState {
  cart: CartItem[];
}

// Define Actions
const addToCart = createAction<CartItem>("addToCart");
const removeFromCart = createAction<string>("removeFromCart");

// Initial state
const storedCartItems = localStorage.getItem("cartItems");
const initialState: CartState = {
  cart: storedCartItems ? JSON.parse(storedCartItems) : [],
};

// Reducer
export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
        state.cart = state.cart.map((i) => (i._id === isItemExist._id ? item : i));
      } else {
        state.cart = [...state.cart, item];
      }
    })

    .addCase(removeFromCart, (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    });
});
