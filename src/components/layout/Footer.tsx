import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl text-gray-900">NaweHost</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              High-performance bare metal servers for your most demanding workloads.
            </p>
            <div className="flex space-x-4 text-gray-600">
              <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary text-sm">Bare Metal Servers</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary text-sm">Dedicated Hosting</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary text-sm">Cloud Instances</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary text-sm">Storage Solutions</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary text-sm">Networking</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-gray-600 hover:text-primary text-sm">Documentation</Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-primary text-sm">API</Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-primary text-sm">Status</Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-primary text-sm">Blog</Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-primary text-sm">Tutorials</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary text-sm">Contact</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary text-sm">Careers</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary text-sm">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {year} NaweHost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
