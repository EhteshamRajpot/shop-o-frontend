import * as React from "react";
import { useEffect } from 'react';
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
  ProductsPage,
  CheckoutPage,
  ShopLoginPage,
  ActivationPage,
  ShopCreatePage,
  BestSellingPage,
  ProductDetailsPage,
  SellerActivationPage,
} from "./routes/Routes";

import {
  ShopHomePage,
  ShopAllProducts,
  ShopPreviewPage,
  ShopAllEventsPage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllCoupounsPage,
  ShopCreateEventsPage,
} from "./routes/ShopRoutes";

import { ToastContainer } from "react-toastify";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import SellerProtectedRoutes from "./protectedRoutes/SellerProtectedRoutes";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";

function App() {

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllEvents());
    Store.dispatch(getAllProducts());
  }, [])

  const router = createBrowserRouter([
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
      path: "/dashboard-products",
      element:
        <SellerProtectedRoutes>
          <ShopAllProducts />
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
