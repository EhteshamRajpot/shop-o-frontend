import { createReducer, createAction } from "@reduxjs/toolkit";

// Define Actions
const productCreateRequest = createAction("productCreateRequest");
const productCreateSuccess = createAction<{ payload: any }>("productCreateSuccess");
const productCreateFail = createAction<{ payload: any }>("productCreateFail");
const clearErrors = createAction("clearErrors");

interface ProductState {
    isLoading?: boolean;
    product?: any;
    error?: any;
    success?: boolean;
};

const initialState: ProductState = {
    isLoading: true
};

export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(productCreateRequest, (state) => {
            state.isLoading = true;

        })
        .addCase(productCreateSuccess, (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
            state.success = true;

        })
        .addCase(productCreateFail, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;

        })
        .addCase(clearErrors, (state) => {
            state.error = null;
        });
})