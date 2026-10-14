import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Packages from "./sections/Packages";
import WhyChooseUs from "./sections/WhyChooseUs";
import Gallery from "./sections/Gallery";
import Instagram from "./sections/Instagram";
import Contact from "./sections/Contact";

const sectionIds = ["home", "about", "services", "packages", "why", "gallery", "instagram", "contact"];

function App() {
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target?.id;
        if (!id) return;
        setActiveTab(id === "instagram" ? "gallery" : id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const open = (event) => {
      const tab = event.detail || "packages";
      setActiveTab(tab);
      window.setTimeout(() => {
        document.getElementById(tab)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
    };

    window.addEventListener("open-tab", open);
    return () => window.removeEventListener("open-tab", open);
  }, []);

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        <Hero />
        <About />
        <Services />
        <Packages />
        <WhyChooseUs />
        <Gallery />
        <Instagram />
        <Contact />
      </main>
      <Footer setActiveTab={setActiveTab} />
      <WhatsAppButton />
    </>
  );
}

export default App;
