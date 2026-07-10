const SectionTitle = ({ title, subtitle, light = false }) => (
  <div className="text-center mb-12">
    <h2
      className={`text-3xl md:text-4xl font-bold mb-3 ${
        light ? "text-white" : "text-primary"
      }`}
    >
      {title}
    </h2>
    <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full" />
    {subtitle && (
      <p
        className={`max-w-2xl mx-auto text-base md:text-lg ${
          light ? "text-blue-100" : "text-gray-600"
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionTitle;
