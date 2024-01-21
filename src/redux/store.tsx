import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";

const Store = configureStore({
    reducer: {
        user: userReducer,
        events: eventReducer,
        seller: sellerReducer,
        product: productReducer,
        products: productReducer,
    }
});

export default Store;