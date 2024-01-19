import axios from "axios";
import { server } from "../../server";
import { Dispatch } from "redux";

// create product
export const createProduct = (newForm: any) => async (dispatch: Dispatch) => {
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

// get all Products
export const getAllProductsShop = (id: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: "getAllProductsShopRequest",
        });

        const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`)

        dispatch({
            type: "getAllProductsShopSuccess",
            payload: data?.products
        })
    } catch (error: any) {
        dispatch({
            type: "getAllProductsShopFailed",
            payload: error?.response?.data?.message,
        })
    }

}
