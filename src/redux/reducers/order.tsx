import { createReducer, createAction } from "@reduxjs/toolkit";

// Define Actions
const adminAllOrdersRequest = createAction("adminAllOrdersRequest");
const getAllOrdersShopRequest = createAction("getAllOrdersShopRequest");
const getAllOrdersUserRequest = createAction("getAllOrdersUserRequest");
const adminAllOrdersFailed = createAction<{ payload: any }>("adminAllOrdersFailed");
const adminAllOrdersSuccess = createAction<{ payload: any }>("adminAllOrdersSuccess");
const getAllOrdersUserFailed = createAction<{ payload: any }>("getAllOrdersUserFailed");
const getAllOrdersShopFailed = createAction<{ payload: any }>("getAllOrdersShopFailed");
const getAllOrdersUserSuccess = createAction<{ payload: any }>("getAllOrdersUserSuccess");
const getAllOrdersShopSuccess = createAction<{ payload: any }>("getAllOrdersShopSuccess");
const clearErrors = createAction("clearErrors");

interface ProductState {
    isLoading?: boolean;
    product?: any;
    products?: any;
    error?: any;
    success?: boolean;
    message?: any;
    allProducts?: any
    orders?: any;
    adminOrders?: any;
    adminOrderLoading?: any
};

const initialState: ProductState = {
    isLoading: true
};

export const orderReducer = createReducer(initialState, (builder) => {

    // get all orders of shop
    builder
        .addCase(getAllOrdersUserRequest, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllOrdersUserSuccess, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        })
        .addCase(getAllOrdersUserFailed, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // get all orders of shop
        .addCase(getAllOrdersShopRequest, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllOrdersShopSuccess, (state, action) => {
            state.isLoading = false;
            state.allProducts = action.payload;
        })
        .addCase(getAllOrdersShopFailed, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // get all orders for admin
        .addCase(adminAllOrdersRequest, (state, action) => {
            state.adminOrderLoading = true;
        })
        .addCase(adminAllOrdersSuccess, (state, action) => {
            state.adminOrderLoading = false;
            state.adminOrders = action.payload;
        })
        .addCase(adminAllOrdersFailed, (state, action) => {
            state.adminOrderLoading = false;
            state.error = action.payload;
        })

        .addCase(clearErrors, (state) => {
            state.error = null;
        });
})