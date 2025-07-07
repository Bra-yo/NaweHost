
import Navbar from "@/components/layout/Navbar";
import ServerConfigurator from "@/components/configure/ServerConfigurator";
import Footer from "@/components/layout/Footer";

const Configure = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ServerConfigurator />
      </main>
      <Footer />
    </div>
  );
};

export default Configure;
