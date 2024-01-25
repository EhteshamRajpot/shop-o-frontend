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


// user update information
export const updateUserInformation =
    (name: any, email: any, phoneNumber: any, password: any) => async (dispatch: any) => {
        try {
            dispatch({
                type: "updateUserInfoRequest",
            });

            const { data } = await axios.put(
                `${server}/user/update-user-info`,
                {
                    email,
                    password,
                    phoneNumber,
                    name,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                    },
                }
            );

            dispatch({
                type: "updateUserInfoSuccess",
                payload: data.user,
            });
        } catch (error: any) {
            dispatch({
                type: "updateUserInfoFailed",
                payload: error.response.data.message,
            });
        }
    };

// update user address
export const updatUserAddress =
    (country: any, city: any, address1: any, address2: any, zipCode: any, addressType: any) =>
        async (dispatch: any) => {
            try {
                dispatch({
                    type: "updateUserAddressRequest",
                });

                const { data } = await axios.put(
                    `${server}/user/update-user-addresses`,
                    {
                        country,
                        city,
                        address1,
                        address2,
                        zipCode,
                        addressType,
                    },
                    { withCredentials: true }
                );

                dispatch({
                    type: "updateUserAddressSucess",
                    payload: {
                        successMessage: "User address updated succesfully!",
                        user: data.user,
                    },
                });
            } catch (error: any) {
                dispatch({
                    type: "updateUserAddressFailed",
                    payload: error.response.data.message,
                });
            }
        };