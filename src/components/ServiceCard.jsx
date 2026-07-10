const ServiceCard = ({ icon, title, description }) => (
  <div className="group bg-white rounded-[16px] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#E2E8F0]/60">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 text-[#15803D]">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#1F2937] mb-2">{title}</h3>
    <p className="text-[#475569] leading-relaxed">{description}</p>
  </div>
);

export default ServiceCard;
