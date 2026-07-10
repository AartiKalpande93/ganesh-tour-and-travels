const variants = {
  primary:
    "bg-accent hover:bg-accent-dark text-white shadow-xl shadow-accent/30 hover:shadow-accent/40",
  secondary:
    "bg-[#0369A1] hover:bg-[#0d5c95] text-white border border-[#0369A1] shadow-lg",
  outline:
    "bg-transparent hover:bg-[#0ea5e9]/10 text-[#1F2937] hover:text-[#0369A1] border-2 border-[#0369A1] shadow-sm",
};

const Button = ({ children, variant = "primary", onClick, type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center justify-center min-w-[140px] px-6 py-3 rounded-[14px] font-semibold text-sm md:text-base transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${variants[variant]} ${className}`}
  >
    {children}
  </button>
);

export default Button;
