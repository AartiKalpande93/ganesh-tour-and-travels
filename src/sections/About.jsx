import SectionTitle from "../components/SectionTitle";
import teamImg from "../assets/team.jpeg";

const About = () => (
  <section id="about" className="py-20 bg-[#FFF8E7]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="About Us"
        subtitle="Discover who we are and what makes us your ideal travel companion"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={teamImg}
            alt="Travel team"
            className="rounded-2xl shadow-xl w-full h-80 lg:h-96 object-cover"
          />
          <div className="absolute -bottom-6 -right-6 bg-[#15803D] text-white p-6 rounded-[16px] shadow-2xl hidden sm:block">
            <p className="text-3xl font-bold">10+</p>
            <p className="text-sm font-medium">Years of Experience</p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
            Your Journey, Our Passion
          </h3>
          <p className="text-[#475569] leading-relaxed mb-4">
            At Ganesh Tour and Travels, we turn every trip into a memorable experience. 
            Whether you're planning a family vacation, a spiritual tour, or a corporate journey, we provide reliable, comfortable, and affordable travel services tailored to your needs.
          </p>
          <p className="text-[#475569] leading-relaxed mb-8">
            With a commitment to quality, safety, and customer satisfaction, our experienced team ensures a smooth travel experience from start to finish. 
            Travel with confidence and create unforgettable memories with <span className="font-bold text-[#0F172A]">Ganesh Tour and Travels</span>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "🛡️", text: "Safe Travel" },
              { icon: "💵", text: "Affordable Packages" },
              { icon: "🚗", text: "Experienced Drivers" },
              { icon: "🎧", text: "Customer Support" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 bg-white p-4 rounded-[16px] shadow-lg hover:shadow-2xl transition-shadow"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-semibold text-[#0EA5E9]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;

