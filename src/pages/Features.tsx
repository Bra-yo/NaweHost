
import { CheckCircle2, Shield, Zap, Clock, Server, Cpu } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/home/CTA";

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Built for <span className="text-primary">Performance</span>
              </h1>
              <p className="text-xl text-gray-600">
                Discover all the features that make our bare metal servers the industry standard for high-performance computing.
              </p>
            </div>
          </div>
        </section>

        {/* Hardware Features */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Enterprise Grade Hardware
              </h2>
              <p className="text-xl text-gray-600">
                Our servers are built with the latest generation components to deliver maximum performance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary">
                        <Cpu className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">Latest Generation Processors</h3>
                      <p className="mt-2 text-gray-600">
                        Intel Xeon and AMD EPYC processors with up to 64 cores per socket for maximum processing power.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary">
                        <Server className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">High-Performance Memory</h3>
                      <p className="mt-2 text-gray-600">
                        DDR4 ECC memory with capacity options up to 512GB per server for demanding workloads.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary">
                        <Zap className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">NVMe Storage</h3>
                      <p className="mt-2 text-gray-600">
                        Ultra-fast NVMe SSDs for lightning-quick storage operations, up to 15x faster than traditional SSDs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 absolute inset-0 rounded-3xl blur-3xl"></div>
                <div className="bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden relative">
                  <div className="p-1 bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="p-6">
                    <img 
                      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80" 
                      alt="Server Hardware" 
                      className="rounded-lg object-cover w-full h-64"
                    />
                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">CPU Performance</div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Memory Bandwidth</div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Storage I/O</div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "98%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Network Features */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Global Network Infrastructure
              </h2>
              <p className="text-xl text-gray-600">
                Deploy your servers in data centers around the world, connected by a high-performance network.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="relative">
                  <div className="bg-gradient-to-r from-primary/20 to-secondary/20 absolute inset-0 rounded-3xl blur-3xl"></div>
                  <div className="bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden relative">
                    <div className="p-1 bg-gradient-to-r from-primary to-secondary"></div>
                    <div className="p-6">
                      <img 
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80" 
                        alt="Network Infrastructure" 
                        className="rounded-lg object-cover w-full h-64"
                      />
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">10+</div>
                          <div className="text-xs text-gray-600">Data Centers</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">40+</div>
                          <div className="text-xs text-gray-600">Network POPs</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">~20ms</div>
                          <div className="text-xs text-gray-600">Avg. Latency</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">Global Data Centers</h3>
                      <p className="mt-2 text-gray-600">
                        Deploy your servers in multiple regions across North America, Europe, and Asia.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary">
                        <Shield className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">DDoS Protection</h3>
                      <p className="mt-2 text-gray-600">
                        Built-in protection against Distributed Denial of Service attacks at no additional cost.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary">
                        <Clock className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">99.99% Network Uptime</h3>
                      <p className="mt-2 text-gray-600">
                        Our redundant network infrastructure ensures your servers stay connected with minimal downtime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Bare Metal?
              </h2>
              <p className="text-xl text-gray-600">
                Compare bare metal performance with traditional cloud hosting options.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-4 px-6 text-left border-b text-gray-900 font-semibold">Feature</th>
                    <th className="py-4 px-6 text-center border-b text-gray-900 font-semibold">
                      <span className="text-primary">ServerStrata</span> Bare Metal
                    </th>
                    <th className="py-4 px-6 text-center border-b text-gray-900 font-semibold">
                      Traditional VPS
                    </th>
                    <th className="py-4 px-6 text-center border-b text-gray-900 font-semibold">
                      Public Cloud
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 border-b">Dedicated Resources</td>
                    <td className="py-4 px-6 border-b text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Partial</td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Shared</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 border-b">Performance Consistency</td>
                    <td className="py-4 px-6 border-b text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Variable</td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Variable</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 border-b">Hardware Customization</td>
                    <td className="py-4 px-6 border-b text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Limited</td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Very Limited</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 border-b">Root Access</td>
                    <td className="py-4 px-6 border-b text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 border-b text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Limited</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 border-b">Price-to-Performance Ratio</td>
                    <td className="py-4 px-6 border-b text-center">
                      <span className="text-sm font-semibold text-green-500">Excellent</span>
                    </td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Good</td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Fair</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 border-b">Security Isolation</td>
                    <td className="py-4 px-6 border-b text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Partial</td>
                    <td className="py-4 px-6 border-b text-center text-gray-500">Shared</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 border-b">Provisioning Time</td>
                    <td className="py-4 px-6 border-b text-center">
                      <span className="text-sm font-semibold text-amber-500">Minutes</span>
                    </td>
                    <td className="py-4 px-6 border-b text-center text-green-500">Seconds</td>
                    <td className="py-4 px-6 border-b text-center text-green-500">Seconds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Features;
