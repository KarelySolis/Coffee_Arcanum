import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Menu from "@/components/landing/Menu";
import ContactoSection from "@/components/landing/ContactoSection";
import Footer from "@/components/landing/Footer";
import Newsletter from "@/components/landing/Newsletter";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <About />
        <Menu />
        <ContactoSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
