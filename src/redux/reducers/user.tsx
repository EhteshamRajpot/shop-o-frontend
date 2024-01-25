import { createReducer, createAction } from "@reduxjs/toolkit";

// Define actions
const loadUserRequest = createAction("LoadUserRequest");
const updateUserInfoRequest = createAction("updateUserInfoRequest");
const updateUserAddressRequest = createAction("updateUserAddressRequest");
const loadUserSuccess = createAction<{ payload: any }>("LoadUserSuccess");
const updateUserInfoSuccess = createAction<{ payload: any }>("updateUserInfoSuccess");
const updateUserAddressSucess = createAction<{ payload: any }>("updateUserAddressSucess");
const loadUserFail = createAction<{ payload: any }>("LoadUserFail");
const updateUserInfoFailed = createAction<{ payload: any }>("updateUserInfoFailed");
const updateUserAddressFailed = createAction<{ payload: any }>("updateUserAddressFailed");
const clearErrors = createAction("clearErrors");

interface UserState {
  isAuthenticated: boolean;
  loading?: boolean;
  user?: any;
  error?: any;
}

const initialState: UserState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(loadUserSuccess, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(loadUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    // update  user information
    .addCase(updateUserInfoRequest, (state) => {
      state.loading = true;
    })
    .addCase(updateUserInfoSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(updateUserInfoFailed, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })

    // update user address
    .addCase(updateUserAddressRequest, (state) => {
      state.loading = true
    })
    .addCase(updateUserAddressSucess, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(updateUserAddressFailed, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});
