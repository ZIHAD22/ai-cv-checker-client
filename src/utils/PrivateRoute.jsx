/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    if (!token) {
      navigate("/auth?method=login");
    }
  }, []);

  // Show a loading indicator while user details are being fetched

  return children;
};

export default PrivateRoute;
