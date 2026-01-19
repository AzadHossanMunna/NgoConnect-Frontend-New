import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/coverage";
import PrivateRoute from "../routes/privateRoute";
import SendDonation from "../pages/SendDonation/SendDonation";
import MyDonations from "../pages/Dashboard/MyDonations/MyDonations";
import DashboardLayout from "../layouts/DashboardLayout"; // make sure to import this
import Campaign from "../pages/Campaign/Campaigns";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // changed from Component
    children: [
      {
        index: true,
        element: <Home />, // changed from Component
      },
      {
        path: 'coverage',
        element: <Coverage />, // changed from Component
      },
      {
       path:'campaign',
       element:<Campaign  />
      },
      {
        path: 'SendDonation',
        element: <PrivateRoute><SendDonation /></PrivateRoute> // kept as is
      }
    ],
  },

  {
    path: "/",
    element: <AuthLayout />, // changed from Component
    children: [
      {
        path: "login",
        element: <Login />, // changed from Component
      },
      {
        path: 'register',
        element: <Register />, // changed from Component
      }
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'myDonations',
        element: <MyDonations /> // changed from Component
      }
    ],
  }
]);
