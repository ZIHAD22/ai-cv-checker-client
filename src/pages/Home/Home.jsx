import Navbar from "../../component/home/navBar";
import CVAnalyzerForm from "./analyze";


const Home = () => {
  return (
    <>
      <Navbar/>
    <div className="flex justify-center items-center mt-24">
      <div className="flex flex-col-reverse md:flex-row bg-gray-800 p-2 text-[#1d1e22] min-h-[600px] rounded-[15px]">
        <CVAnalyzerForm />
        {/* <SignUpForm /> */}
      </div>
    </div>
    </>
  );
};

export default Home;
