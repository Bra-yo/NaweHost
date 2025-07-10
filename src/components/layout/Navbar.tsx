
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('user_id', user.id)
      .single();
    
    if (!error && data) {
      setUserProfile(data);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getUserName = () => {
    if (userProfile?.first_name) {
      return userProfile.first_name;
    }
    return 'User';
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md py-3 sticky top-0 z-50 border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <img src="/src/assets/nawehost-logo.png" alt="NaweHost" className="w-8 h-8 rounded-md" />
            <span className="font-bold text-xl text-gray-900">NaweHost</span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors text-sm">
              Home
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary font-medium transition-colors text-sm">
              Pricing
            </Link>
            <Link to="/cloud-hosting" className="text-gray-700 hover:text-primary font-medium transition-colors text-sm">
              Cloud Hosting
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-primary font-medium transition-colors text-sm">
              Features
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors text-sm">
              Contact
            </Link>
          </div>

          {/* User greeting and CTA buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-700 max-w-[200px] truncate">
                  <span className="font-medium">{getGreeting()} {getUserName()}</span>
                  <span className="text-gray-500 ml-1 hidden lg:inline">Welcome back!</span>
                </div>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="text-xs px-3 py-1.5">Dashboard</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-xs px-2 py-1.5">
                  <LogOut className="h-3 w-3 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="text-xs px-3 py-1.5">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="text-xs px-3 py-1.5">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            {user && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{getGreeting()} {getUserName()}</span>
                  <span className="text-gray-500 ml-1">Welcome back!</span>
                </div>
              </div>
            )}
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-gray-700 py-2 px-3 hover:bg-gray-100 rounded-md font-medium text-sm"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/pricing" 
                className="text-gray-700 py-2 px-3 hover:bg-gray-100 rounded-md font-medium text-sm"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/cloud-hosting" 
                className="text-gray-700 py-2 px-3 hover:bg-gray-100 rounded-md font-medium text-sm"
                onClick={() => setIsOpen(false)}
              >
                Cloud Hosting
              </Link>
              <Link 
                to="/features" 
                className="text-gray-700 py-2 px-3 hover:bg-gray-100 rounded-md font-medium text-sm"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 py-2 px-3 hover:bg-gray-100 rounded-md font-medium text-sm"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                  <Link to="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { handleSignOut(); setIsOpen(false); }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-3 pt-3 border-t border-gray-200">
                  <Link to="/login" className="w-1/2">
                    <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-1/2">
                    <Button className="w-full" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
