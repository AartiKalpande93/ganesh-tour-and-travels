const variants = {
  primary:
    "bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/30 hover:shadow-accent/50",
  secondary:
    "bg-white hover:bg-gray-50 text-primary border-2 border-white shadow-lg",
  outline:
    "bg-transparent hover:bg-primary text-primary hover:text-white border-2 border-primary",
};

const Button = ({ children, variant = "primary", onClick, type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${variants[variant]} ${className}`}
  >
    {children}
  </button>
);

export default Button;
