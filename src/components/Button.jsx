const variants = {
  primary:
    "bg-[linear-gradient(35deg,#1e293b,#0d9488)] hover:bg-[linear-gradient(35deg,#0d9488,#ffffff)] text-white hover:text-slate-900 border border-[#27374D] shadow-lg shadow-teal-900/20",
  secondary:
    "bg-[linear-gradient(35deg,#0d9488,#ffffff)] hover:bg-[linear-gradient(35deg,#ffffff,#0d9488)] text-slate-800 hover:text-white border border-slate-200 shadow-md",
  outline:
    "bg-transparent hover:bg-teal-50 text-teal-800 hover:text-teal-900 border-2 border-teal-600 shadow-sm",
};

const Button = ({ children, variant = "primary", onClick, type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center justify-center min-w-[140px] px-7 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-400 hover:-translate-y-0.5 cursor-pointer ${variants[variant]} ${className}`}
  >
    {children}
  </button>
);

export default Button;
