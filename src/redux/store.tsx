import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";

const Store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        events: eventReducer,
        seller: sellerReducer,
        product: productReducer,
        products: productReducer,
    }
});

export default Store;