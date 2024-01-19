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
  ShopLoginPage,
  ActivationPage,
  ShopCreatePage,
  BestSellingPage,
  ProductDetailsPage,
  SellerActivationPage,
} from "./routes/Routes";

import {
  ShopHomePage,
  ShopCreateProduct,
  ShopDashboardPage, 

} from "./routes/ShopRoutes";

import { ToastContainer } from "react-toastify";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import SellerProtectedRoutes from "./protectedRoutes/SellerProtectedRoutes";

function App() {

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
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
      path: "/product/:name",
      element: <ProductDetailsPage />,
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
