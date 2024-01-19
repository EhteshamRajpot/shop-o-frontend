import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct = (newForm: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: "productCreateRequest",
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`${server}/product/create-product`, newForm, config);

        dispatch({
            type: "productCreateSuccess",
            payload: data.product,
        });

    } catch (error: any) {
        dispatch({
            type: "productCreateFail",
            payload: error?.response?.data?.message,
        });
    }
};
