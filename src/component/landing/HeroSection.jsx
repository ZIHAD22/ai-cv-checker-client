import heroImg from "../../assets/hero.jpg";
import Button from "../shared/button";

export default function HeroSection() {
  return (
    <section className="relative max-w-[1280px] min-h-[calc(100vh-260px)] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 xl:pt-14 xl:mt-8">
      <div className="z-10 flex flex-col-reverse md:gap-8 xl:flex-row justify-between w-full mt-[60px] md:mt-[80px] xl:mt-[110px]">
        <div className="flex-1 max-w-full xl:max-w-[750px] mt-8 xl:mt-0">
          <h1 className="text-3xl md:text-5xl xl:text-[64px] font-light text-white mb-4 md:mb-6 leading-tight md:leading-tight xl:leading-[80px]">
            Expose Your CV.
            <br className="hidden sm:block" />
            Expand Your Opportunity.
          </h1>
          <p className="text-base md:text-xl xl:text-[24px] text-[#E2E2E2] mb-6 md:mb-8">
            Our AI-powered CV checker analyzes your resume instantly, giving you
            actionable feedback to boost your chances of landing interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-base md:text-xl xl:text-[24px]">
            <Button bg={true} href={"/auth?method=signup"} width="w-full sm:w-[48%] xl:w-[400px]">Get Started</Button>
            <Button bg={false} href={"/dashboard"} width="w-full sm:w-[48%] xl:w-[400px]">HR Dashboard</Button>
          </div>
        </div>
        <div className="flex justify-center xl:justify-end">
          <img
            src={heroImg}
            alt="Business reviewing CV"
            className="rounded-lg object-cover w-full max-w-[300px] md:max-w-[340px] xl:max-w-[388px] h-auto shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}