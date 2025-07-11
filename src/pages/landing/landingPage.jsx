import FeatureCard from "../../component/landing/FeatureCard";
import HeroSection from "../../component/landing/HeroSection";
import UploadSection from "../../component/landing/UploadSection";
import Button from "../../component/shared/button";
import Footer from "../../component/shared/Footer";
import Navbar from "../../component/shared/navbar/Navbar";

export default function LandingPage() {
  return (
    <div className="bg-[#070C10FC] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative">
        <HeroSection />
        <div className="absolute right-0 bottom-0 hidden md:block w-full h-[755px] bg-[#202225] pointer-events-none top-0 rounded-tl-[400px] md:rounded-tl-[600px] lg:rounded-tl-[800px] opacity-[.18]" />

        <div className="hidden md:block absolute right-4 lg:right-0 top-[37%] z-10">
          <Button width="w-[300px]" href={"/auth?method=signup"}>
            <span className="text-sm md:text-base lg:text-[24px]">Get Premium?</span>
          </Button>
        </div>
        
        <section className="py-16 sm:py-24 md:py-32 lg:py-44 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-28 max-w-7xl mx-auto">
          <div className="w-full md:w-2/5">
            <FeatureCard />
          </div>
          <div className="md:w-3/5 w-full text-left space-y-2">
            <ul className="text-[#E2E2E2] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px] mb-6 sm:mb-8 md:mb-10 lg:mb-12 pl-0 list-none space-y-2 md:space-y-3 lg:space-y-4">
              <li className="flex items-start">
                <span className="text-[#B282E3] mr-2">•</span>
                <span>Avoid titling the document &apos;curriculum vitae&apos; or &apos;CV&apos;.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#B282E3] mr-2">•</span>
                <span>Section headings are a good way to break up your CV.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#B282E3] mr-2">•</span>
                <span>Avoid fonts such as Comic Sans.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#B282E3] mr-2">•</span>
                <span>List everything in reverse chronological order.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#B282E3] mr-2">•</span>
                <span>Keep it concise by using bullet points.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#B282E3] mr-2">•</span>
                <span>Double check your margins.</span>
              </li>
            </ul>
            <div className="flex justify-center md:justify-start pt-4">
              <Button bg={false} width="w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px]">
                <span className="text-base md:text-lg lg:text-xl">See More</span>
              </Button>
            </div>
          </div>
        </section>
        
        <UploadSection />
      </main>
      <Footer />
    </div>
  );
}