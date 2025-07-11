import Home from "../pages/Home/Home.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import { createBrowserRouter } from "react-router";
import CvSorter from "../pages/Dashboard/CvSorter.jsx";
import ExtractData from "../pages/Dashboard/ExtractData.jsx";
import SendEmail from "../pages/Dashboard/SendEmail.jsx";
import QuestionGeneration from "../pages/Dashboard/QuestionGeneration.jsx";
import Auth from "../pages/auth/auth.jsx";
import Test from "../pages/Home/test.jsx";
import PrivateRoute from "../utils/PrivateRoute.jsx";
import LandingPage from "../pages/landing/landingPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/cv-analyzer",
    element: <Home />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "cv-sorter",
        element: <CvSorter />,
      },
      {
        path: "extract-data",
        element: <ExtractData />,
      },
      {
        path: "send-email",
        element: <SendEmail />,
      },
      {
        path: "generation-question",
        element: <QuestionGeneration />,
      },
    ],
  },
]);

export default router;
