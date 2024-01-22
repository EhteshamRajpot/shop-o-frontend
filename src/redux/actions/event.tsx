import axios from "axios";
import { server } from "../../server";
import { Dispatch } from "redux";

// create event
export const createEvent = (newForm: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({
            type: "eventCreateRequest",
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`${server}/event/create-event`, newForm, config);

        dispatch({
            type: "eventCreateSuccess",
            payload: data.event,
        });

    } catch (error: any) {
        dispatch({
            type: "eventCreateFail",
            payload: error?.response?.data?.message,
        });
    }
};

// get all Events
export const getAllEventsShop = (id: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: "getAllEventsShopRequest",
        });

        const { data } = await axios.get(`${server}/event/get-all-events/${id}`)

        dispatch({
            type: "getAllEventsShopSuccess",
            payload: data?.event
        })
    } catch (error: any) {
        dispatch({
            type: "getAllEventsShopFailed",
            payload: error?.response?.data?.message,
        })
    }
}

// delete event of shop
export const deleteEvent = (id: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: "deleteEventRequest"
        })
        const { data } = await axios.delete(`${server}/event/delete-shop-event/${id}`, { withCredentials: true })

        dispatch({
            type: "deleteEventSuccess",
            payload: data?.message
        })
    } catch (error: any) {
        dispatch({
            type: "deleteEventFailed",
            payload: error?.message?.data?.message
        })
    }
}

// get all events
export const getAllEvents = () => async (dispatch: any) => {
    try {
        dispatch({
            type: "getAllEventsRequest",
        });

        const { data } = await axios.get(`${server}/event/get-all-events`);
        dispatch({
            type: "getAllEventsSuccess",
            payload: data.events,
        });
    } catch (error: any) {
        dispatch({
            type: "getAllEventsFailed",
            payload: error?.response?.data?.message,
        });
    }
};

