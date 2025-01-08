import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./Redux/store.js";

import {
  AboutUs,
  AdminFormView,
  CarInsurance,
  ContactUs,
  FormView,
  HealthInsurance,
  Home,
  KycForm,
  Kycstatus,
  Login,
  MainApplication,
  Notification,
  OTP,
  PolicyStatus,
  Pollicies,
  Profile,
  Quotecar,
  QuoteHealth,
  Register,
} from "./pages/index.js";
import Protected from "./components/Protected.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/verify",
        element: <OTP />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/car-Quotation",
        element: <Quotecar />,
      },
      {
        path: "/health-Quotation",
        element: <QuoteHealth />,
      },
      {
        element: <Protected />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/kycStatus",
            element: <Kycstatus />,
          },
          {
            path: "/kycform",
            element: <KycForm />,
          },
          {
            path: "/document",
            element: <FormView />,
          },
          {
            path: "/notification",
            element: <Notification />,
          },
          {
            path: "/car-insurance",
            element: <CarInsurance />,
          },
          {
            path: "/policies",
            element: <Pollicies />,
          },
          {
            path: "/health-insurance",
            element: <HealthInsurance />,
          },
          {
            path: "/policy-status",
            element: <PolicyStatus />,
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/kycApplications",
            element: <MainApplication />,
          },
          {
            path: "/adminDocument/:id",
            element: <AdminFormView />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h1>Error page</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
