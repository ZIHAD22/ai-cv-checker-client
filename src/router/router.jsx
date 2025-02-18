import Home from "../pages/Home/Home.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import { createBrowserRouter } from "react-router";
import CvSorter from "../pages/Dashboard/CvSorter.jsx";
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
    ],
  },
]);

export default router;
