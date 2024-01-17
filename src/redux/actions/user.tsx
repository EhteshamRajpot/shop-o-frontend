import axios from "axios";
import { server } from "../../server.tsx";

// load user
export const loadUser = () => async (dispatch: any) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });
        const { data } = await axios.get(`${server}/user/getuser`, { withCredentials: true });
        dispatch({
            type: "LoadUserSuccess",
            payload: data?.user,
        });
    } catch (error: any) {
        dispatch({
            type: "LoadUserFail",
            payload: error?.response?.data?.message,
        });
    }
}

// load seller
export const loadSeller = () => async (dispatch: any) => {
    try {
        dispatch({
            type: "LoadSellerRequest",
        });
        const { data } = await axios.get(`${server}/shop/getSeller`, { withCredentials: true });
        dispatch({
            type: "LoadSellerSuccess",
            payload: data?.seller,
        });
    } catch (error: any) {
        dispatch({
            type: "LoadSellerFail",
            payload: error?.response?.data?.message,
        });
    }
}