import { Link, Outlet, useLocation } from "react-router";
import {
  FaRocket,
  FaFileAlt,
  FaEnvelope,
  FaQuestionCircle,
  FaChartBar,
  FaCheckCircle,
} from "react-icons/fa";

const Dashboard = () => {
  const location = useLocation();
  const features = [
    {
      icon: <FaRocket className="text-primary text-3xl" />,
      title: "Streamline Your Hiring Process Effortlessly",
    },
    {
      icon: <FaFileAlt className="text-secondary text-3xl" />,
      title: "CV Sorting Made Easy",
      description:
        "Automatically analyze and categorize thousands of CVs in seconds.",
    },
    {
      icon: <FaEnvelope className="text-accent text-3xl" />,
      title: "Automated Email Outreach",
      description:
        "Send personalized emails to candidates directly from an Excel sheet.",
    },
    {
      icon: <FaQuestionCircle className="text-info text-3xl" />,
      title: "AI-Generated Interview Questions",
      description:
        "Get relevant interview questions based on job roles and candidate skills.",
    },
    {
      icon: <FaChartBar className="text-warning text-3xl" />,
      title: "Real-Time Insights & Reports",
      description:
        "Track application progress, email responses, and hiring trends in one place.",
    },
    {
      icon: <FaCheckCircle className="text-success text-3xl" />,
      title: "Save Time & Focus on What Matters!",
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        {location.pathname === "/dashboard" && (
          <>
            <div className="p-6 max-w-4xl mx-auto mt-20">
              <h1 className="text-3xl font-bold text-center mb-6">
                HR Automation Dashboard
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="card bg-base-100 shadow-xl p-4">
                    <div className="flex items-center space-x-4">
                      {feature.icon}
                      <h2 className="card-title">{feature.title}</h2>
                    </div>
                    {feature.description && (
                      <p className="text-gray-600 mt-2">
                        {feature.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <Link to="/dashboard" className="p-4 block text-center mx-auto ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="cursor-pointer"
          >
            Intelligent - HR
          </label>
        </Link>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link to="cv-sorter">Sort Cv</Link>
          </li>
          <li>
            <Link to="extract-data">Extract Data</Link>
          </li>
          <li>
            <Link to="send-email">Send Email</Link>
          </li>
          <li>
            <Link to="generation-question">Generate Question</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
