
import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/layout/Footer";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
