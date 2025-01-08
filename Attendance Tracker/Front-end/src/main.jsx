import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./Redux/store.js";
import {
  ListEmp,
  Login,
  OTP,
  Profile,
  Register,
  UserHistroy,
} from "./pages/index.js";
import { AdminRoute, Calender, Protected } from "./component/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "verify-otp",
        element: <OTP />,
      },
      {
        path: "/calc",
        element: <Calender />,
      },
      {
        element: <Protected />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          // Fixed from 'childrens' to 'children'
          {
            path: "/all-users",
            element: <ListEmp />,
          },
          {
            path: "/user/:id",
            element: <UserHistroy />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
