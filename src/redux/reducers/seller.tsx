import { createReducer, createAction } from "@reduxjs/toolkit";

// Define actions
const loadSellerRequest = createAction("LoadSellerRequest");
const getAllSellersRequest = createAction("getAllSellersRequest");
const loadSellerSuccess = createAction<{ payload: any }>("LoadSellerSuccess");
const getAllSellersSuccess = createAction<{ payload: any }>("getAllSellersSuccess");
const loadSellerFail = createAction<{ payload: any }>("LoadSellerFail");
const getAllSellerFailed = createAction<{ payload: any }>("getAllSellerFailed");
const clearErrors = createAction("clearErrors");

interface SellerState {
  isLoading?: boolean;
  seller?: any;
  error?: any;
  isSeller?: any;
}

const initialState: SellerState = {
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadSellerRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(loadSellerSuccess, (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase(loadSellerFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })

    // get all sellers ---admin
    .addCase(getAllSellersRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllSellersSuccess, (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase(getAllSellerFailed, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});
