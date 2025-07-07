
import Navbar from "@/components/layout/Navbar";
import CloudPackages from "@/components/cloud/CloudPackages";
import Footer from "@/components/layout/Footer";

const CloudHosting = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <CloudPackages />
      </main>
      <Footer />
    </div>
  );
};

export default CloudHosting;
