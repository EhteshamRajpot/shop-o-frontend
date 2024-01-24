import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";

// Define types
interface WishlistItem {
  _id: string;
  // Add other properties of your wishlist item
}

interface WishlistState {
  wishlist: WishlistItem[];
}

// Define Actions
const addToWishlist = createAction<WishlistItem>("addToWishlist");
const removeFromWishlist = createAction<string>("removeFromWishlist");

// Initial state
const storedWishlistItems = localStorage.getItem("wishlistItems");
const initialState: WishlistState = {
  wishlist: storedWishlistItems ? JSON.parse(storedWishlistItems) : [],
};

// Reducer
export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToWishlist, (state, action: PayloadAction<WishlistItem>) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) => (i._id === isItemExist._id ? item : i));
      } else {
        state.wishlist = [...state.wishlist, item];
      }
    })

    .addCase(removeFromWishlist, (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
    });
});
