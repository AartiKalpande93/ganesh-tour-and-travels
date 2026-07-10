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
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Packages />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
