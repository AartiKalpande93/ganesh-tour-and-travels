import { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { contactInfo } from "../data/siteData";
import { submitContactForm } from "../api/contact";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  destination: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const handleSelectPackage = (e) => {
      const { title, date } = e.detail;
      setForm((prev) => ({
        ...prev,
        destination: title,
        message: `Hi, I would like to book the "${title}" package scheduled for "${date}". Please share availability and details.`,
      }));
    };
    window.addEventListener("select-package", handleSelectPackage);
    return () => window.removeEventListener("select-package", handleSelectPackage);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.destination.trim()) {
      newErrors.destination = "Destination is required";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const resData = await submitContactForm({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        destination: form.destination.trim(),
        message: form.message.trim(),
      });

      if (resData.success) {
        setSubmitted(true);
        setForm(initialForm);
        setTimeout(() => setSubmitted(false), 7000);
      } else {
        setSubmitError(resData.message || "Failed to send message. Please try again or contact us directly.");
      }
    } catch (err) {
      if (err.errors?.length) {
        const fieldErrors = {};
        err.errors.forEach((item) => {
          if (item.field) fieldErrors[item.field] = item.message;
        });
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      }
      setSubmitError(err.message || "Network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    let message = "Hello Ganesh Tour & Travels! I would like to enquire about your tour packages.";
    if (form.destination) {
      message = `Hello Ganesh Tour & Travels! I am interested in booking/enquiring about the "${form.destination}" package.`;
    }
    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodedText}`, "_blank");
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-[14px] border ${
      errors[field] ? "border-red-500" : "border-[#CBD5E1]"
    } bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 focus:border-[#0EA5E9] transition-colors`;

  return (
    <section id="contact" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Contact Us"
          subtitle="Ready to plan your next adventure? Get in touch with us today"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-[16px] shadow-2xl p-8 border border-slate-100">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Send us a Message</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg font-medium text-sm flex items-center gap-2">
                <span>✅</span>
                <span>Thank you! Your message has been sent successfully. We will contact you soon.</span>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg font-medium text-sm flex items-center gap-2">
                <span>❌</span>
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#475569] mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#475569] mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass("phone")}
                  placeholder="Your phone number"
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#475569] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-[#475569] mb-1">
                  Destination / Package *
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  className={inputClass("destination")}
                  placeholder="Where do you want to go?"
                  disabled={isSubmitting}
                />
                {errors.destination && (
                  <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#475569] mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className={inputClass("message")}
                  placeholder="Tell us about your travel plans..."
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="bg-[#0369A1] text-white rounded-[16px] p-8 shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
              <p className="text-[#D9EFFF] text-sm italic">
                "{contactInfo.tagline}"
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">📞</span>
                  <div>
                    <p className="font-semibold text-[#F97316]">Phone Numbers</p>
                    <div className="flex flex-col gap-1.5 mt-1">
                      {contactInfo.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/[\s+]/g, "")}`}
                          className="text-[#D9EFFF] hover:text-white transition-colors text-sm sm:text-base font-semibold"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">✉️</span>
                  <div>
                    <p className="font-semibold text-[#F97316]">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-[#D9EFFF] hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">📍</span>
                  <div>
                    <p className="font-semibold text-[#F97316]">Address</p>
                    <p className="text-[#D9EFFF] text-sm leading-relaxed">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">🌐</span>
                  <div>
                    <p className="font-semibold text-[#F97316]">Website</p>
                    <a
                      href={`https://${contactInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D9EFFF] hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {contactInfo.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat on WhatsApp */}
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg cursor-pointer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </button>

            {/* Map Frame */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-64 border border-slate-200">
              <iframe
                title="Office location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.3242080766324!2d77.74716757602492!3d20.919379891583344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a4b2a8d11677%3A0xc0fb1767e7ee8693!2sAMC%20Complex%2C%20Amravati%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
