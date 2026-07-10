const SectionTitle = ({ title, subtitle, light = false }) => (
  <div className="text-center mb-12">
    <h2
      className={`text-3xl md:text-4xl font-bold mb-3 ${
        light ? "text-white" : "text-[#1F2937]"
      }`}
    >
      {title}
    </h2>
    <div className="w-20 h-1 bg-[#F97316] mx-auto mb-4 rounded-full" />
    {subtitle && (
      <p
        className={`max-w-2xl mx-auto text-base md:text-lg ${
          light ? "text-[#E2E8F0]" : "text-[#475569]"
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionTitle;
