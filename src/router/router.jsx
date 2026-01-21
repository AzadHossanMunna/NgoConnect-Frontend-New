import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import CoverageMap from "../pages/Coverage/coverage";
import PrivateRoute from "../routes/privateRoute";
import SendDonation from "../pages/SendDonation/SendDonation";
import MyDonations from "../pages/Dashboard/MyDonations/MyDonations";
import Profile from "../pages/Dashboard/Profile/Profile";
import DashboardLayout from "../layouts/DashboardLayout"; // make sure to import this
import Campaign from "../pages/Campaign/Campaigns";
import CampaignDetails from "../pages/Campaign/CampaignDetails";
import ManageCampaigns from "../pages/Dashboard/ManageCampaigns/ManageCampaigns";
import CampaignForm from "../pages/Dashboard/ManageCampaigns/CampaignForm";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ApplyVolunteer from "../pages/Dashboard/Volunteer/ApplyVolunteer";
import MyTimeLogs from "../pages/Dashboard/Volunteer/MyTimeLogs";
import ManageVolunteers from "../pages/Dashboard/ManageVolunteers/ManageVolunteers";
import VolunteerDetails from "../pages/Dashboard/ManageVolunteers/VolunteerDetails";
import ManageTasks from "../pages/Dashboard/ManageTasks/ManageTasks";
import MyTasks from "../pages/Dashboard/Volunteer/MyTasks";
import DonationRequests from "../pages/Dashboard/DonationRequests/DonationRequests";
import ManageEvents from "../pages/Dashboard/ManageEvents/ManageEvents";
import VolunteerEvents from "../pages/Dashboard/VolunteerEvents/VolunteerEvents";

import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFail from "../pages/Payment/PaymentFail";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Authentication/ResetPassword/ResetPassword";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/shared/NotFound/NotFound";
import PrivacyPolicy from "../pages/shared/Legal/PrivacyPolicy";



import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome"; // Import the component

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // changed from Component
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />, // changed from Component
      },

      {
        path: 'coverage',
        element: <CoverageMap />, // changed from Component
      },
      {
        path: 'about',
        element: <About />
      },
    


      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'privacy',
        element: <PrivacyPolicy />
      },
      {
        path: '*',
        element: <NotFound />
      },
      {
       path:'campaign',
       element:<Campaign  />
      },
      {
        path: 'campaign/:slug',
        element: <CampaignDetails />
      },
      {
        path: 'SendDonation',
        element: <SendDonation /> 
      },
      {
        path: 'payment/success',
        element: <PaymentSuccess />
      },
      {
        path: 'donation_success',
        element: <PaymentSuccess />
      },
      {
        path: 'payment/fail',
        element: <PaymentFail />
      },
      {
        path: 'payment/cancel', // Reuse fail for cancel or create new if needed
        element: <PaymentFail /> 
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
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
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
        index: true,
        element: <DashboardHome />
      },
      {
        path: 'myDonations',
        element: <MyDonations />
      },
      {
        path: 'donation-requests',
        element: <DonationRequests />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'campaigns',
        element: <ManageCampaigns />
      },
      {
        path: 'campaigns/create',
        element: <CampaignForm />
      },
      {
        path: 'campaigns/edit/:slug',
        element: <CampaignForm />
      },
      {
        path: 'users',
        element: <ManageUsers />
      },
      {
        path: 'volunteer/apply',
        element: <ApplyVolunteer />
      },
      {
        path: 'volunteer/logs',
        element: <MyTimeLogs />
      },
      {
        path: 'volunteers',
        element: <ManageVolunteers />
      },
      {
        path: 'volunteers/:id',
        element: <VolunteerDetails />
      },
      {
        path: 'tasks',
        element: <ManageTasks />
      },
      {
        path: 'volunteer/checklist',
        element: <MyTasks />
      },
      {
        path: 'events/manage',
        element: <ManageEvents />
      },
      {
        path: 'events',
        element: <VolunteerEvents />
      }
    ],
  }
]);
