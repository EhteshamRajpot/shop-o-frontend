import { createReducer, createAction } from "@reduxjs/toolkit";

// Define actions
const clearErrors = createAction("clearErrors");
const loadUserRequest = createAction("LoadUserRequest");
const getAllUsersRequest = createAction("getAllUsersRequest");
const loadUserFail = createAction<{ payload: any }>("LoadUserFail");
const updateUserInfoRequest = createAction("updateUserInfoRequest");
const deleteUserAddressRequest = createAction("deleteUserAddressRequest");
const getAllUsersSuccess = createAction("getAllUsersSuccess");
const getAllUsersFailed = createAction("getAllUsersFailed");
const deleteUserAddressSuccess = createAction<{ successMessage: any }>("deleteUserAddressSuccess");
const loadUserSuccess = createAction<{ payload: any }>("LoadUserSuccess");
const updateUserAddressRequest = createAction("updateUserAddressRequest");
const updateUserInfoFailed = createAction<{ payload: any }>("updateUserInfoFailed");
const updateUserInfoSuccess = createAction<{ payload: any }>("updateUserInfoSuccess");
const updateUserAddressFailed = createAction<{ payload: any }>("updateUserAddressFailed");
const deleteUserAddressFailed = createAction<{ payload: any, user: any }>("deleteUserAddressFailed");
const updateUserAddressSuccess = createAction<{ payload: any, user: any, successMessage: any }>("updateUserAddressSuccess");

interface UserState {
  user?: any;
  error?: any;
  loading?: boolean;
  addressLoading?: any;
  successMessage?: any;
  isAuthenticated?: boolean;
  usersLoading?: any, 
  users?: any
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
      state.addressLoading = true
    })
    .addCase(updateUserAddressSuccess, (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase(updateUserAddressFailed, (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // delete user address
    .addCase(deleteUserAddressRequest, (state) => {
      state.addressLoading = true;
    })
    .addCase(deleteUserAddressSuccess, (state, action) => {
      state.addressLoading = false;
      state.successMessage = action?.payload?.successMessage;
      state.user = action.payload;
    })
    .addCase(deleteUserAddressFailed, (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // get all users --admin
    .addCase(getAllUsersRequest, (state) => {
      state.usersLoading = true;
    })
    .addCase(getAllUsersSuccess, (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase(getAllUsersFailed, (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })


    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});
