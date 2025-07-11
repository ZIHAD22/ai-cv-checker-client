import cvImg from "../../assets/cv-ill.png";

export default function FeatureCard() {
  return (
    <div className="relative w-full max-w-[400px] md:max-w-full aspect-square flex-shrink-0 mb-6 md:mb-0 mx-auto md:mx-0">
      <div className="z-20 relative flex flex-col items-center">
        <span className="text-xl sm:text-2xl md:text-[24px] lg:text-[30px] font-semibold text-white mb-4 sm:mb-6 lg:mb-8 text-center block">
          How to write a perfect CV?
        </span>
        <img
          src={cvImg}
          alt="CV Illustration"
          className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[348px] h-auto object-contain mx-auto rounded-lg"
        />
      </div>
      <div className="absolute w-[calc(100%+40px)] sm:w-[calc(100%+60px)] md:w-[calc(100%+80px)] aspect-[1/1.1] rounded-xl sm:rounded-2xl bg-[linear-gradient(145.2deg,_rgba(83,44,111,0.4)_57.34%,_rgba(130,62,164,0.4)_100%)] -left-3 -top-3 sm:-left-4 sm:-top-4 md:-left-6 md:-top-6"></div>
      <div className="absolute w-[calc(100%+40px)] sm:w-[calc(100%+60px)] md:w-[calc(100%+80px)] aspect-[1/1.1] rounded-xl sm:rounded-2xl bg-[linear-gradient(145.2deg,_rgba(83,44,111,0.4)_57.34%,_rgba(130,62,164,0.4)_100%)] -left-6 -top-6 sm:-left-8 sm:-top-8 md:-left-12 md:-top-12 z-10"></div>
    </div>
  );
}