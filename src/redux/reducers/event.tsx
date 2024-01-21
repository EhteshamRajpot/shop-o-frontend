import { createReducer, createAction } from "@reduxjs/toolkit";

// Define Actions
const eventCreateRequest = createAction("eventCreateRequest");
const getAllEventsShopRequest = createAction("getAllEventsShopRequest");
const deleteEventRequest = createAction("deleteEventRequest");
const eventCreateSuccess = createAction<{ payload: any }>("eventCreateSuccess");
const getAllEventsShopSuccess = createAction<{ payload: any }>("getAllEventsShopSuccess");
const deleteEventSuccess = createAction<{ payload: any }>("deleteEventSuccess");
const eventCreateFail = createAction<{ payload: any }>("eventCreateFail");
const getAllEventsShopFailed = createAction<{ payload: any }>("getAllEventsShopFailed");
const deleteEventFailed = createAction<{ payload: any }>("deleteEventFailed");
const clearErrors = createAction("clearErrors");

interface EventState {
    isLoading?: boolean;
    events?: any;
    error?: any;
    success?: boolean;
    message?: any
};

const initialState: EventState = {
    isLoading: true
};

export const eventReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(eventCreateRequest, (state) => {
            state.isLoading = true;

        })
        .addCase(eventCreateSuccess, (state, action) => {
            state.isLoading = false;
            state.events = action.payload;
            state.success = true;

        })
        .addCase(eventCreateFail, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;

        })

        // get all event events of shop
        .addCase(getAllEventsShopRequest, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllEventsShopSuccess, (state, action) => {
            state.isLoading = false;
            state.events = action.payload;
        })
        .addCase(getAllEventsShopFailed, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // delete event event of a shop
        .addCase(deleteEventRequest, (state) => {
            state.isLoading = true
        })
        .addCase(deleteEventSuccess, (state, action) => {
            state.isLoading = false
            state.message = action?.payload
        })
        .addCase(deleteEventFailed, (state, action) => {
            state.isLoading = false
            state.error = action?.payload
        })
        .addCase(clearErrors, (state) => {
            state.error = null;
        });
})