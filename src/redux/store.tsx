import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";

const Store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        order: orderReducer,
        events: eventReducer,
        seller: sellerReducer,
        product: productReducer,
        products: productReducer,
        wishlist: wishlistReducer,
    }
});

export default Store;