import { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { Icon } from "../components/Icons";
import { contactInfo, INSTAGRAM_URL } from "../data/siteData";
import { submitContactForm } from "../api/contact";
import { useLanguage } from "../context/useLanguage";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  destination: "",
  message: "",
};

const Contact = () => {
  const { lang } = useLanguage();
  const mr = lang === "mr";
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
        message: mr
          ? `नमस्कार, मला "${title}" सहलीची माहिती हवी आहे (${date}). कृपया उपलब्धता आणि तपशील कळवा.`
          : `Hi, I would like to enquire about the "${title}" tour (${date}). Please share availability and details.`,
      }));
    };
    window.addEventListener("select-package", handleSelectPackage);
    return () => window.removeEventListener("select-package", handleSelectPackage);
  }, [mr]);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = mr ? "नाव आवश्यक आहे" : "Name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = mr ? "फोन नंबर आवश्यक आहे" : "Phone number is required";
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = mr ? "योग्य फोन नंबर टाका" : "Enter a valid phone number";
    }

    if (!form.email.trim()) {
      newErrors.email = mr ? "ईमेल आवश्यक आहे" : "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = mr ? "योग्य ईमेल टाका" : "Enter a valid email address";
    }

    if (!form.destination.trim()) {
      newErrors.destination = mr ? "गंतव्य आवश्यक आहे" : "Destination is required";
    }

    if (!form.message.trim()) {
      newErrors.message = mr ? "संदेश आवश्यक आहे" : "Message is required";
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
    `w-full min-h-12 rounded-xl border px-4 py-3 text-base ${
      errors[field] ? "border-brand" : "border-line"
    } bg-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20`;

  return (
    <section id="contact" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow={mr ? "संपर्क" : "Contact"}
          title={mr ? "सहलीबद्दल विचारा" : "Plan your next trip"}
          subtitle={
            mr
              ? "फोन, WhatsApp, ईमेल किंवा खालील फॉर्म — जे सोयीचे असेल ते वापरा."
              : "Call, WhatsApp, email, or send the form. We will get back to you about dates and availability."
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="rounded-3xl border border-line bg-cream p-5 shadow-sm sm:p-8">
            <h3 className="mb-6 text-2xl font-bold text-ink">{mr ? "संदेश पाठवा" : "Send a message"}</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-palm-soft border border-palm/30 text-palm rounded-lg font-medium text-sm flex items-center gap-2">
                <span>✅</span>
                <span>
                  {mr
                    ? "धन्यवाद! संदेश पाठवला गेला आहे. आम्ही लवकरच संपर्क करू."
                    : "Thank you. Your message has been sent. We will contact you soon."}
                </span>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-brand-soft border border-brand/25 text-brand-ink rounded-lg font-medium text-sm flex items-center gap-2">
                <span>❌</span>
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted mb-1">
                  {mr ? "नाव *" : "Name *"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                  placeholder={mr ? "तुमचे नाव" : "Your full name"}
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-brand-ink text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-muted mb-1">
                  {mr ? "फोन *" : "Phone *"}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass("phone")}
                  placeholder={mr ? "तुमचा फोन नंबर" : "Your phone number"}
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="text-brand-ink text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">
                  {mr ? "ईमेल *" : "Email *"}
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
                {errors.email && <p className="text-brand-ink text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-muted mb-1">
                  {mr ? "गंतव्य / पॅकेज *" : "Destination / Package *"}
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  className={inputClass("destination")}
                  placeholder={mr ? "कुठे जायचे आहे?" : "Where do you want to go?"}
                  disabled={isSubmitting}
                />
                {errors.destination && (
                  <p className="text-brand-ink text-sm mt-1">{errors.destination}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted mb-1">
                  {mr ? "संदेश *" : "Message *"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className={inputClass("message")}
                  placeholder={mr ? "प्रवासाबद्दल थोडक्यात सांगा..." : "Tell us about your travel plans..."}
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-brand-ink text-sm mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (mr ? "पाठवत आहोत..." : "Sending...") : mr ? "संदेश पाठवा" : "Send Message"}
              </Button>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-line bg-cream p-5 sm:p-6">
              <p className="font-script-mr text-lg text-brand-ink">{contactInfo.tagline}</p>
              <ul className="mt-5 space-y-4">
                <li className="flex gap-3">
                  <span className="mt-0.5 text-brand-ink">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{mr ? "फोन" : "Phone"}</p>
                    <div className="mt-1 flex flex-col gap-1">
                      {contactInfo.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm font-semibold text-ink hover:text-brand-ink">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 text-brand-ink">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{mr ? "ईमेल" : "Email"}</p>
                    <a href={`mailto:${contactInfo.email}`} className="mt-1 block break-all text-sm font-semibold text-ink hover:text-brand-ink">
                      {contactInfo.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 text-brand-ink">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{mr ? "पत्ता" : "Address"}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink">{contactInfo.address}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 text-brand-ink">
                    <Icon name="instagram" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Instagram</p>
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm font-semibold text-ink hover:text-brand-ink">
                      {contactInfo.instagramHandle}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={openWhatsApp}
              className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 text-base font-semibold text-white transition hover:bg-[#20ba59]"
            >
              {mr ? "WhatsApp वर संदेश" : "Chat on WhatsApp"}
            </button>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-line bg-white text-sm font-semibold text-ink transition hover:border-brand hover:text-brand-ink"
            >
              <Icon name="instagram" className="h-5 w-5" />
              {mr ? "Instagram वर फॉलो करा" : "Follow on Instagram"}
            </a>

            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <iframe
                title={mr ? "आमच्या कार्यालयाचा नकाशा" : "Map to our office"}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`}
                className="h-64 w-full border-0 sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-sm font-semibold text-ink transition hover:text-brand-ink"
              >
                {contactInfo.address}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
