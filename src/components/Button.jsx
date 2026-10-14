const variants = {
  primary:
    "bg-brand hover:bg-brand-dark text-white border border-brand-dark shadow-lg shadow-brand/25",
  secondary:
    "bg-white hover:bg-brand-soft text-ink border border-brand shadow-md",
  outline:
    "bg-transparent hover:bg-brand text-brand hover:text-white border-2 border-brand shadow-sm",
};

const Button = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center min-w-[140px] px-7 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-400 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${variants[variant]} ${className}`}
  >
    {children}
  </button>
);

export default Button;
