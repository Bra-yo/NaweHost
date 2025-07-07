
import Navbar from "@/components/layout/Navbar";
import PricingPlans from "@/components/pricing/PricingPlans";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/home/CTA";

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PricingPlans />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
