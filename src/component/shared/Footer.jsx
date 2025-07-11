import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#070C10] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-10 md:py-14 mt-8 pt-20 sm:pt-28 md:pt-40">
      <div className="flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-20 lg:gap-32 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] mb-2 text-white font-semibold">Contact Information</h2>
          <div className="text-base sm:text-lg md:text-xl lg:text-[22px] font-semibold text-[#838282e1] mb-6 sm:mb-8 md:mb-12">
            19th floor, 48 Burj Gate Tower, Sheikh Zayed Road,<br className="hidden sm:block" />
            Downtown Dubai, UAE
          </div>
          <div className="text-sm sm:text-base md:text-lg lg:text-[22px] text-[#E2E2E2] space-y-1 sm:space-y-2">
            <div className="flex flex-wrap items-center">
              <span className="font-semibold mr-1">Email</span> : support@emicontech.com
            </div>
            <div className="flex flex-wrap items-center">
              <span className="font-semibold mr-1">Tel</span> : +97144030602
            </div>
            <div className="flex flex-wrap items-center">
              <span className="font-semibold mr-1">Mobile</span> : +971563129676
            </div>
            <div className="flex flex-wrap items-center">
              <span className="font-semibold mr-1">Mobile</span> : +971507282339
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold mb-2 text-white">AI CV Checker</h2>
          <ul className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#838282e1] space-y-3 sm:space-y-5 md:space-y-7 font-semibold">
            <li><a href="#" className="hover:text-[#B282E3] transition-colors duration-200">About Us</a></li>
            <li><a href="#" className="hover:text-[#B282E3] transition-colors duration-200">Our Users</a></li>
            <li><a href="#" className="hover:text-[#B282E3] transition-colors duration-200">Our Partners</a></li>
            <li><a href="#" className="hover:text-[#B282E3] transition-colors duration-200">Career</a></li>
            <li><a href="#" className="hover:text-[#B282E3] transition-colors duration-200">Terms and Conditions</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-[#838282e1] text-sm mt-12 pt-8 border-t border-[#252525]">
        © {new Date().getFullYear()} AI CV Checker. All rights reserved.
      </div>
    </footer>
  );
}