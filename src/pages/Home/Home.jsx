import CVAnalyzerForm from "./analyze";
import SignUpForm from "./signUpForm";

const Home = () => {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="flex flex-col-reverse md:flex-row bg-gray-800 p-2 text-[#1d1e22] min-h-[600px] rounded-[15px]">
        <CVAnalyzerForm />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Home;
