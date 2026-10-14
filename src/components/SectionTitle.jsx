const SectionTitle = ({ eyebrow, title, subtitle, light = false, align = "center" }) => (
  <div className={`mb-10 sm:mb-12 ${align === "left" ? "text-left" : "text-center"}`}>
    {eyebrow && (
      <p className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-gold" : "text-brand-ink"}`}>
        {eyebrow}
      </p>
    )}
    <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
    <div className={`mt-3 h-1 w-14 rounded-full ${align === "left" ? "" : "mx-auto"} ${light ? "bg-gold" : "bg-brand"}`} />
    {subtitle && (
      <p className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${align === "left" ? "" : "mx-auto"} ${light ? "text-white/85" : "text-muted"}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionTitle;
