import * as React from "react";
import { useEffect, useState } from 'react';
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  FAQPage,
  HomePage,
  LoginPage,
  EventsPage,
  SignupPage,
  ProfilePage,
  PaymentPage,
  ProductsPage,
  CheckoutPage,
  ShopLoginPage,
  ActivationPage,
  ShopCreatePage,
  TrackOrderPage,
  BestSellingPage,
  OrderSuccessPage,
  OrderDetailsPage,
  ProductDetailsPage,
  SellerActivationPage,
} from "./routes/Routes";

import {
  ShopHomePage,
  ShopInboxPage,
  ShopAllProducts,
  ShopPreviewPage,
  ShopSettingsPage,
  ShopAllEventsPage,
  ShopCreateProduct,
  ShopAllOrdersPage,
  ShopDashboardPage,
  ShopAllRefundsPage,
  ShopAllCoupounsPage,
  ShopCreateEventsPage,
  ShopOrderDetailsPage,
  ShopWithDrawMoneyPage,
} from "./routes/ShopRoutes";

import { ToastContainer } from "react-toastify";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import SellerProtectedRoutes from "./protectedRoutes/SellerProtectedRoutes";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import { server } from "./server";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    getStripeApikey();
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllEvents());
    Store.dispatch(getAllProducts());
  }, [])

  const router = createBrowserRouter([
    stripeApikey  && {
      path: "/payment",
      element: (
        <Elements stripe={loadStripe(stripeApikey )}>
          <ProtectedRoutes>
            <PaymentPage />
          </ProtectedRoutes>
        </Elements>
      ),
    },

    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element:
        <ProtectedRoutes>
          <LoginPage />
        </ProtectedRoutes>,
    },
    {
      path: "/sign-up",
      element: <SignupPage />,
    },
    {
      path: "/activation/:activation_token",
      element: <ActivationPage />,
    },
    {
      path: "/seller/activation/:activation_token",
      element: <SellerActivationPage />,
    },
    {
      path: "/products",
      element: <ProductsPage />,
    },
    {
      path: "/best-selling",
      element: <BestSellingPage />,
    },
    {
      path: "/events",
      element: <EventsPage />,
    },
    {
      path: "/faq",
      element: <FAQPage />,
    },
    {
      path: "/product/:id",
      element: <ProductDetailsPage getAllProducts={getAllProducts} />,
    },
    {
      path: "/profile",
      element:
        <ProtectedRoutes>
          <ProfilePage />
        </ProtectedRoutes>,
    },
    {
      path: "/user/order/:id",
      element:
        <ProtectedRoutes>
          <OrderDetailsPage />
        </ProtectedRoutes>,
    },
    {
      path: "/user/track/order/:id",
      element:
        <ProtectedRoutes>
          <TrackOrderPage />
        </ProtectedRoutes>,
    },
    // Shop Routes
    {
      path: "/shop-create",
      element: <ShopCreatePage />,
    },
    {
      path: "/shop-login",
      element: <ShopLoginPage />,
    },
    {
      path: "/shop/:id",
      element:
        <SellerProtectedRoutes>
          <ShopHomePage />
        </SellerProtectedRoutes>
    },
    {
      path: "/settings",
      element:
        <SellerProtectedRoutes>
          <ShopSettingsPage />
        </SellerProtectedRoutes>
    },
    {
      path: "/dashboard",
      element:
        <SellerProtectedRoutes>
          <ShopDashboardPage />
        </SellerProtectedRoutes>
    },
    {
      path: "/dashboard-create-product",
      element:
        <SellerProtectedRoutes>
          <ShopCreateProduct />
        </SellerProtectedRoutes>
    },
    {
      path: "/order/:id",
      element:
        <SellerProtectedRoutes>
          <ShopOrderDetailsPage />
        </SellerProtectedRoutes>
    },
    {
      path: "/dashboard-products",
      element:
        <SellerProtectedRoutes>
          <ShopAllProducts />
        </SellerProtectedRoutes>
    },
    {
      path: "/dashboard-orders",
      element:
        <SellerProtectedRoutes>
          <ShopAllOrdersPage />
        </SellerProtectedRoutes>
    },
    {
      path: "/dashboard-refunds",
      element:
        <SellerProtectedRoutes>
          <ShopAllRefundsPage />
        </SellerProtectedRoutes>
    },
    {
      path: "/dashboard-create-event",
      element:
        <SellerProtectedRoutes>
          <ShopCreateEventsPage />
        </SellerProtectedRoutes>
    },
    {
      path: "/dashboard-events",
      element:
        <SellerProtectedRoutes>
          <ShopAllEventsPage />
        </SellerProtectedRoutes>
    },
    {
      path: "/dashboard-coupouns",
      element:
        <SellerProtectedRoutes>
          <ShopAllCoupounsPage />
        </SellerProtectedRoutes>
    },
    {
      path: "/dashboard-withdraw-money",
      element:
        <SellerProtectedRoutes>
          <ShopWithDrawMoneyPage />
        </SellerProtectedRoutes>
    },
    {
      path: "/dashboard-messages",
      element:
        <SellerProtectedRoutes>
          <ShopInboxPage />
        </SellerProtectedRoutes>
    },
    {
      path: "/shop/preview/:id",
      element: <ShopPreviewPage />
    },
    {
      path: "/checkout",
      element:
        <ProtectedRoutes>
          <CheckoutPage />
        </ProtectedRoutes>
    },
    {
      path: "/order/success",
      element: <OrderSuccessPage />
    }


  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </React.StrictMode>
  );
}

export default App;
