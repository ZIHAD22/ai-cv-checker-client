import Button from "../shared/button"

export default function UploadSection() {
  return (
    <section className="w-full bg-[#24242436] py-8 sm:py-12 md:py-16 flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-[900px] w-full flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center justify-center">
        <div className="text-center sm:text-left text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px] font-medium text-white mb-4 sm:mb-0 flex-1">
          Upload Your CV for better experience
        </div>
        <div className="w-full sm:w-auto">
          <Button width="w-full sm:w-auto" href={"/auth?method=signup"}>
            <span className="text-base sm:text-lg md:text-xl lg:text-[24px]">Try for Free</span>
          </Button>
        </div>
      </div>
    </section>
  );
}