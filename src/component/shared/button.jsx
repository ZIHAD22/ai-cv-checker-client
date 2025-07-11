export default function Button({ children, href, bg = true, width = "", className = "", ...props }) {
  return (
    <a href={href? href: "/"}
      className={`
        relative inline-block px-6 py-2 font-semibold rounded-lg
        transition-all duration-200 shadow-md
        disabled:opacity-50 disabled:cursor-not-allowed text-center
        ${bg
          ? "text-white bg-gradient-to-r from-[#4D2A69] to-[#8640A8] hover:from-[#8640A8] hover:to-[#4D2A69]"
          : "text-white border border-[#4D2A69] bg-transparent hover:bg-[#4D2A69]"}
        ${width}
        ${className}
      `}
      style={
        bg
          ? { background: "linear-gradient(90deg, #4D2A69 0%, #8640A8 100%)" }
          : {}
      }
      {...props}
    >
      {children}
    </a>
  );
}
