
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TechBackground from "@/components/animations/TechBackground";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <TechBackground />
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              Bare Metal Performance, <span className="text-primary">Cloud Simplicity</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Deploy high-performance dedicated servers with the simplicity of cloud. 
              No shared resources, just pure power for your most demanding workloads.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/pricing">
                <Button size="lg" className="px-6">
                  View Plans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg" className="px-6">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2 mr-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-900">Trusted by 10,000+ businesses</span>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs text-gray-600">4.9/5 from 2,000+ reviews</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-3xl opacity-30 animate-pulse-subtle"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-200 animate-float">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Performance Dashboard</h3>
                  <p className="text-sm text-gray-600">Server Status: Online</p>
                </div>
                <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                  99.9% Uptime
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-600">CPU Usage</span>
                    <span className="text-xs font-semibold">28%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-600">Memory Usage</span>
                    <span className="text-xs font-semibold">42%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-600">Storage Usage</span>
                    <span className="text-xs font-semibold">65%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="text-xs text-gray-600 mb-3">Network Traffic</div>
                <div className="h-20 flex items-end space-x-2">
                  {[25, 40, 30, 60, 70, 45, 50, 35, 20, 45, 60, 75].map((height, i) => (
                    <div key={i} className="flex-1">
                      <div 
                        className="bg-secondary-400 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">00:00</span>
                  <span className="text-xs text-gray-400">12:00</span>
                  <span className="text-xs text-gray-400">23:59</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
