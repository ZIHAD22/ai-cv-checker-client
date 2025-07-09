import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { IoIosLogOut } from "react-icons/io";
import {
  FaRocket,
  FaFileAlt,
  FaEnvelope,
  FaQuestionCircle,
  FaChartBar,
  FaCheckCircle,
} from "react-icons/fa";

const SIDEBAR_WIDTH = 414;

const Dashboard = () => {
  const location = useLocation();
  const navigation = useNavigate();
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

  const handleLogOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem("jwt_token");
    navigation("/");
  };

  return (
    <div
      className="flex overflow-hidden min-h-screen"
      style={{
        boxSizing: "border-box",
        background: "#070C10",
      }}
    >
      {/* Sidebar */}
      <div className="flex-shrink-0 flex flex-col ">
        <div
          className="border border-gray-700 m-5 min-h-screen"
          style={{
            width: SIDEBAR_WIDTH,
            minWidth: SIDEBAR_WIDTH,
            background: "#070C10",
          }}
        >
          <Link to="/dashboard" className="block text-center mx-auto">
            <div className="flex justify-evenly items-center p-6">
              <label
                aria-label="close sidebar"
                className="cursor-pointer text-4xl w-[255px] h-[54px] text-white"
              >
                Intelligent - HR
              </label>
              <span>
                <IoIosLogOut
                  size="50"
                  className="text-white"
                  onClick={handleLogOut}
                />
              </span>
            </div>
          </Link>
          <ul
            className="menu text-base-content w-full p-4"
            style={{ background: "#070C10" }}
          >
            {/* Sidebar content here */}
            <li>
              <Link to="cv-sorter" className="text-white">
                Sort Cv
              </Link>
            </li>
            <li>
              <Link to="extract-data" className="text-white">
                Extract Data
              </Link>
            </li>
            <li>
              <Link to="send-email" className="text-white">
                Send Email
              </Link>
            </li>
            <li>
              <Link to="generation-question" className="text-white">
                Generate Question
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0" style={{ background: "#070C10" }}>
        {location.pathname === "/dashboard" && (
          <>
            <div className="p-6 max-w-4xl mx-auto mt-20">
              <h1 className="text-3xl font-bold text-center mb-6 text-white">
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
      </div>
    </div>
  );
};

export default Dashboard;
