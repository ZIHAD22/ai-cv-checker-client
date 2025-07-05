import { useEffect } from "react";
import Navbar from "../../component/home/navBar";
import CVAnalyzerForm from "./analyze";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-24">
        <div className="flex flex-col-reverse md:flex-row bg-[#80808040] p-2 text-[#1d1e22] min-h-[800px] min-w-[50%] rounded-[15px]">
          <CVAnalyzerForm />
          {/* <SignUpForm /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
