import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Packages from "./sections/Packages";
import WhyChooseUs from "./sections/WhyChooseUs";
import Gallery from "./sections/Gallery";
import Contact from "./sections/Contact";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const open = (event) => {
      const tab = event.detail || "packages";
      setActiveTab(tab);
      window.setTimeout(() => {
        if (tab === "packages") {
          document.getElementById("packages")?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 80);
    };

    window.addEventListener("open-tab", open);
    return () => window.removeEventListener("open-tab", open);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <>
            <Hero />
            <About />
            <Contact />
          </>
        );
      case "packages":
        return (
          <>
            <Hero />
            <Packages />
            <Contact />
          </>
        );
      case "services":
        return (
          <>
            <Hero />
            <Services />
            <Contact />
          </>
        );
      case "gallery":
        return (
          <>
            <Hero />
            <Gallery />
            <Contact />
          </>
        );
      case "contact":
        return (
          <>
            <Hero />
            <Contact />
          </>
        );
      case "home":
      default:
        return (
          <>
            <Hero />
            <About />
            <Packages />
            <Services />
            <WhyChooseUs />
            <Gallery />
            <Contact />
          </>
        );
    }
  };

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>{renderContent()}</main>
      <Footer setActiveTab={setActiveTab} />
    </>
  );
}

export default App;
