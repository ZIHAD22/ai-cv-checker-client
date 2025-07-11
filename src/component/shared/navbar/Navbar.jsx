import React, { useState, useEffect } from "react";
import GradientButton from "./gradientButton";
import OnHoverCard from "./onHoverCard";

const solutions = [
  {
    title: "Job Matching Analysis",
    desc: "Compare your CV against any job description to identify keyword gaps and improve alignment.",
  },
  {
    title: "ATS Compatibility Checker",
    desc: "Ensure your resume passes common Applicant Tracking Systems with layout and keyword optimization.",
  },
  {
    title: "Content Quality Scoring",
    desc: "Get instant feedback on structure, clarity, and relevance.",
  },
  {
    title: "Grammar & Style Enhancement",
    desc: "Catch grammar issues and get suggestions for tone, clarity, and active voice.",
  },
  {
    title: "Personalized Recommendations",
    desc: "Receive tailored tips to improve impact based on your target industry or role.",
  },
];

const resources = [
  { title: "Getting Started Guide", url: "#" },
  { title: "Video Tutorials", url: "#" },
  { title: "Free CV Templates", url: "#" },
  { title: "ATS Optimization Tips", url: "#" },
  { title: "Job Market Insights", url: "#" },
  { title: "FAQ & Troubleshooting", url: "#" },
];

const docs = [
  { header: "Developer quickstart", paragraph: "Learn how to integrate AI-CV Checkers" },
  { header: "Conversational AI", paragraph: "Deploy" },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 16) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        setMobileSubmenu(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Toggle mobile submenu
  const toggleMobileSubmenu = (menu) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu);
  };

  return (
    <nav
      className="w-full flex justify-center bg-[#070C10FC] z-50 sticky top-0 transition-shadow duration-300 py-4 md:py-6 lg:py-8 xl:py-12"
      style={{ boxShadow: scrolled ? "0 2px 16px 0 rgba(0,0,0,0.08)" : "none" }}
    >
      <div
        className="px-4 sm:px-6 md:px-8 flex flex-col md:items-center justify-between w-full"
        style={{
          maxWidth: 1280,
          width: "100%",
        }}
      >
        <div className="flex justify-between items-center w-full">
          <span className="text-[18px] md:text-[25px] xl:text-[36px] font-bold text-white block">
            AI–CV Checker
          </span>
          
          {/* Mobile hamburger menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {scrolled && (
              <div className="mr-2">
                <GradientButton>
                  <span className="text-xs">Get started</span>
                </GradientButton>
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {!mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop navigation menu */}
          <div
            className={`hidden md:flex items-center gap-4 lg:gap-6 text-white text-sm font-medium transition-opacity duration-200 ${
              scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div
              onMouseEnter={() => setOpenMenu("solutions")}
              onMouseLeave={() => setOpenMenu(null)}
              className="relative"
            >
              <button className="flex items-center gap-1 md:text-base lg:text-lg xl:text-[22px] cursor-pointer">
                SOLUTIONS{" "}
                <svg
                  className="w-4 h-4 inline-block"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>
              {openMenu === "solutions" && (
                <OnHoverCard>
                  {solutions.map((s, i) => (
                    <div key={i} className="mb-6 last:mb-0">
                      <div className="font-semibold text-white text-base lg:text-lg xl:text-[20px]">{s.title}</div>
                      <div className="text-sm lg:text-base xl:text-[16px] text-gray-300">{s.desc}</div>
                    </div>
                  ))}
                </OnHoverCard>
              )}
            </div>
            <div
              onMouseEnter={() => setOpenMenu("resources")}
              onMouseLeave={() => setOpenMenu(null)}
              className="relative"
            >
              <button className="flex items-center gap-1 md:text-base lg:text-lg xl:text-[22px] cursor-pointer">
                RESOURCES{" "}
                <svg
                  className="w-4 h-4 inline-block"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>
              {openMenu === "resources" && (
                <OnHoverCard>
                  {resources.map((r, i) => (
                    <a
                      key={i}
                      href={r.url}
                      className="block text-white py-2 hover:text-[#B282E3] cursor-pointer md:text-base lg:text-lg xl:text-[20px]"
                    >
                      {r.title}
                    </a>
                  ))}
                </OnHoverCard>
              )}
            </div>
            <div
              onMouseEnter={() => setOpenMenu("docs")}
              onMouseLeave={() => setOpenMenu(null)}
              className="relative"
            >
              <button className="flex items-center gap-1 md:text-base lg:text-lg xl:text-[22px] cursor-pointer">
                DOCS{" "}
                <svg
                  className="w-4 h-4 inline-block"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>
              {openMenu === "docs" && (
                <OnHoverCard>
                  <p className="text-base md:text-lg xl:text-[24px] font-bold">Most Popular</p>
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-3 lg:mt-5">
                    {docs.map((r, i) => (
                      <a
                        key={i}
                        href="#"
                        className="block text-white hover:text-[#B282E3] cursor-pointer border border-[#4D2A69] p-4 lg:p-8 lg:py-5"
                      >
                        <p className="text-lg lg:text-xl xl:text-[24px]">{r.header}</p>
                        <p className="text-sm lg:text-base xl:text-[20px]">{r.paragraph}</p>
                      </a>
                    ))}
                  </div>
                </OnHoverCard>
              )}
            </div>
          </div>

          {/* Desktop login/signup buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {scrolled ? (
              <GradientButton>
                <span className="text-xs md:text-sm lg:text-base xl:text-[24px]">Get started for free</span>
              </GradientButton>
            ) : (
              <>
                <a
                  href="/auth?method=login"
                  className="text-white font-medium px-3 py-1 lg:px-5 lg:py-2 rounded-lg hover:bg-[#23242A] text-xs md:text-sm lg:text-base xl:text-[24px]"
                >
                  Login
                </a>
                <GradientButton href={"/auth?method=signup"}>
                  <span className="text-xs md:text-sm lg:text-base xl:text-[24px]">Sign up</span>
                </GradientButton>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {/* Mobile menu items */}
              <div className="text-white">
                <button
                  onClick={() => toggleMobileSubmenu("solutions")}
                  className="flex items-center justify-between w-full py-2 text-left text-lg"
                >
                  <span>SOLUTIONS</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileSubmenu === "solutions" ? "transform rotate-180" : ""
                    }`}
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
                {mobileSubmenu === "solutions" && (
                  <div className="pl-4 mt-2 border-l-2 border-gray-600 space-y-4">
                    {solutions.map((s, i) => (
                      <div key={i} className="mb-4 last:mb-0">
                        <div className="font-semibold text-white text-base">{s.title}</div>
                        <div className="text-sm text-gray-300">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-white">
                <button
                  onClick={() => toggleMobileSubmenu("resources")}
                  className="flex items-center justify-between w-full py-2 text-left text-lg"
                >
                  <span>RESOURCES</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileSubmenu === "resources" ? "transform rotate-180" : ""
                    }`}
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
                {mobileSubmenu === "resources" && (
                  <div className="pl-4 mt-2 border-l-2 border-gray-600">
                    {resources.map((r, i) => (
                      <a
                        key={i}
                        href={r.url}
                        className="block text-white py-2 hover:text-[#B282E3] text-base"
                      >
                        {r.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-white">
                <button
                  onClick={() => toggleMobileSubmenu("docs")}
                  className="flex items-center justify-between w-full py-2 text-left text-lg"
                >
                  <span>DOCS</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileSubmenu === "docs" ? "transform rotate-180" : ""
                    }`}
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
                {mobileSubmenu === "docs" && (
                  <div className="pl-4 mt-2 border-l-2 border-gray-600">
                    <p className="text-base font-bold mb-2">Most Popular</p>
                    <div className="space-y-3">
                      {docs.map((r, i) => (
                        <a
                          key={i}
                          href="#"
                          className="block text-white hover:text-[#B282E3] border border-[#4D2A69] p-3"
                        >
                          <p className="text-base font-medium">{r.header}</p>
                          <p className="text-sm">{r.paragraph}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile login/signup buttons */}
              {!scrolled && (
                <div className="flex flex-col space-y-2 pt-2">
                  <a
                    href="/auth?method=login"
                    className="text-white font-medium py-2 rounded-lg hover:bg-[#23242A] text-center border border-gray-700"
                  >
                    Login
                  </a>
                  <div className="w-full">
                    <GradientButton href={"/auth?method=signup"}>
                      <span className="text-sm">Sign up</span>
                    </GradientButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}