import { createReducer, createAction } from "@reduxjs/toolkit";

// Define Actions
const productCreateRequest = createAction("productCreateRequest");
const getAllProductsShopRequest = createAction("getAllProductsShopRequest");
const productCreateSuccess = createAction<{ payload: any }>("productCreateSuccess");
const getAllProductsShopSuccess = createAction<{ payload: any }>("getAllProductsShopSuccess");
const productCreateFail = createAction<{ payload: any }>("productCreateFail");
const getAllProductsShopFailed = createAction<{ payload: any }>("getAllProductsShopFailed");
const clearErrors = createAction("clearErrors");

interface ProductState {
    isLoading?: boolean;
    product?: any;
    products?: any;
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

        // get all products of shop
        .addCase(getAllProductsShopRequest, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllProductsShopSuccess, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        })
        .addCase(getAllProductsShopFailed, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(clearErrors, (state) => {
            state.error = null;
        });
})