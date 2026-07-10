import SectionTitle from "../components/SectionTitle";

const About = () => (
  <section id="about" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="About Us"
        subtitle="Discover who we are and what makes us your ideal travel companion"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1527631489985-52689da1abf8?w=700&q=80"
            alt="Travel team"
            className="rounded-2xl shadow-xl w-full h-80 lg:h-96 object-cover"
          />
          <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-lg hidden sm:block">
            <p className="text-3xl font-bold">10+</p>
            <p className="text-sm font-medium">Years of Experience</p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-primary mb-4">
            Your Journey, Our Passion
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Ganesh Tour and Travels is a leading travel agency dedicated to making
            your journeys memorable, comfortable, and hassle-free. Whether you are
            planning a family vacation, a spiritual pilgrimage, or a corporate retreat,
            we have the perfect package for you.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            With years of experience in the travel industry, we pride ourselves on
            delivering exceptional service at affordable prices. From the moment you
            contact us until you return home, we are with you every step of the way.
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
                className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-semibold text-primary">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
