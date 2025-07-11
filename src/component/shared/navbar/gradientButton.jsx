
export default function GradientButton({ children,href, className = "", ...props }) {
  return (
    <a href={href? href: "#"}
      className={`
        relative inline-block px-6 py-2 font-semibold rounded-lg text-white
        bg-gradient-to-r from-[#4D2A69] to-[#8640A8]
        hover:from-[#8640A8] hover:to-[#4D2A69]
        shadow-md transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        background: "linear-gradient(90deg, #4D2A69 0%, #8640A8 100%)",
      }}
      {...props}
    >
      {children}
    </a>
  );
}