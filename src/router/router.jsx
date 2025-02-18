import Home from "../pages/Home/Home.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import { createBrowserRouter } from "react-router";
import CvSorter from "../pages/Dashboard/CvSorter.jsx";
import ExtractData from "../pages/Dashboard/ExtractData.jsx";
import SendEmail from "../pages/Dashboard/SendEmail.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
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
    ],
  },
]);

export default router;
