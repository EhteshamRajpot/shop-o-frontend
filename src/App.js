import * as React from "react";
import "./App.css";
import {
  Navigate,
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
} from "./Routes.tsx";

import { ShopHomePage } from "./ShopRoutes.tsx";

import { ToastContainer } from "react-toastify";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import SellerProtectedRoutes from "./SellerProtectedRoutes.tsx";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, success } = useSelector((state) => state.user)
  const { isSeller, seller } = useSelector((state) => state.seller)

  React.useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());

    if (isSeller) {
      Navigate(`/shop/${seller._id}`)
    }
  }, [])

  console.log(isSeller, seller)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element:
        <ProtectedRoutes isAuthenticated={[isAuthenticated, success]}>
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
        <ProtectedRoutes isAuthenticated={isAuthenticated}>
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
        <SellerProtectedRoutes isSeller={isSeller} seller={seller}>
          <ShopHomePage />
        </SellerProtectedRoutes>
      ,
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
