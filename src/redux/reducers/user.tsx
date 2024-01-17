import { createReducer, createAction } from "@reduxjs/toolkit";

// Define actions
const loadUserRequest = createAction("LoadUserRequest");
const loadUserSuccess = createAction<{ payload: any }>("LoadUserSuccess");
const loadUserFail = createAction<{ payload: any }>("LoadUserFail");
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
    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});
