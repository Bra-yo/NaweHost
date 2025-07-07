
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdminServerManagement from "@/components/admin/AdminServerManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Server, 
  Package, 
  Users, 
  BarChart, 
  Network, 
  Shield, 
  Settings, 
  AlertCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedZone, setSelectedZone] = useState<string>("na-east");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">CloudStack Management Console</h1>
            <div className="flex items-center space-x-4">
              <select 
                className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
              >
                <option value="na-east">Zone: North America East</option>
                <option value="na-west">Zone: North America West</option>
                <option value="eu-central">Zone: Europe Central</option>
                <option value="eu-west">Zone: Europe West</option>
                <option value="asia-east">Zone: Asia East</option>
                <option value="asia-south">Zone: Asia South</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Sidebar Navigation */}
            <div className="md:col-span-2 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-purple-600 text-white">
                <h3 className="font-semibold">Navigation</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <button className="w-full flex items-center px-4 py-3 hover:bg-purple-50 text-left font-medium text-purple-600">
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  Dashboard
                </button>
                <button className="w-full flex items-center px-4 py-3 hover:bg-purple-50 text-left">
                  <Server className="h-5 w-5 mr-3" />
                  Compute
                </button>
                <button className="w-full flex items-center px-4 py-3 hover:bg-purple-50 text-left">
                  <Network className="h-5 w-5 mr-3" />
                  Network
                </button>
                <button className="w-full flex items-center px-4 py-3 hover:bg-purple-50 text-left">
                  <Package className="h-5 w-5 mr-3" />
                  Templates
                </button>
                <button className="w-full flex items-center px-4 py-3 hover:bg-purple-50 text-left">
                  <Users className="h-5 w-5 mr-3" />
                  Accounts
                </button>
                <button className="w-full flex items-center px-4 py-3 hover:bg-purple-50 text-left">
                  <Shield className="h-5 w-5 mr-3" />
                  Security
                </button>
                <button className="w-full flex items-center px-4 py-3 hover:bg-purple-50 text-left">
                  <BarChart className="h-5 w-5 mr-3" />
                  Events
                </button>
                <button className="w-full flex items-center px-4 py-3 hover:bg-purple-50 text-left">
                  <Settings className="h-5 w-5 mr-3" />
                  Configuration
                </button>
                <button className="w-full flex items-center px-4 py-3 hover:bg-purple-50 text-left">
                  <AlertCircle className="h-5 w-5 mr-3" />
                  System
                </button>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="md:col-span-10">
              <Tabs defaultValue="infrastructure" className="w-full">
                <TabsList className="mb-6 bg-white p-1 rounded-lg shadow">
                  <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                  <TabsTrigger value="offerings">Service Offerings</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="system">System VMs</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                
                <TabsContent value="infrastructure" className="space-y-4">
                  <AdminServerManagement selectedZone={selectedZone} />
                </TabsContent>
                
                <TabsContent value="offerings">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Service Offerings</h2>
                    <p className="text-gray-600">
                      Manage compute, disk, and network offerings for your cloud infrastructure.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-md p-4 hover:border-purple-500 cursor-pointer">
                        <h3 className="font-medium">Compute Offerings</h3>
                        <p className="text-sm text-gray-500">CPU, RAM, and storage configurations</p>
                      </div>
                      <div className="border rounded-md p-4 hover:border-purple-500 cursor-pointer">
                        <h3 className="font-medium">Disk Offerings</h3>
                        <p className="text-sm text-gray-500">Storage size and IOPS configurations</p>
                      </div>
                      <div className="border rounded-md p-4 hover:border-purple-500 cursor-pointer">
                        <h3 className="font-medium">Network Offerings</h3>
                        <p className="text-sm text-gray-500">VLANs, load balancers, and firewalls</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="templates">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Templates</h2>
                    <p className="text-gray-600">
                      Manage OS templates and ISO images for virtual machine deployment.
                    </p>
                    <div className="mt-6 space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50">
                        <div>
                          <h3 className="font-medium">Ubuntu 22.04 LTS</h3>
                          <p className="text-sm text-gray-500">Linux x64 • Featured • Public</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Ready</span>
                      </div>
                      <div className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50">
                        <div>
                          <h3 className="font-medium">Windows Server 2022</h3>
                          <p className="text-sm text-gray-500">Windows x64 • Featured • Public</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Ready</span>
                      </div>
                      <div className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50">
                        <div>
                          <h3 className="font-medium">CentOS 9 Stream</h3>
                          <p className="text-sm text-gray-500">Linux x64 • Featured • Public</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Ready</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="system">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">System Virtual Machines</h2>
                    <p className="text-gray-600">
                      Monitor and manage system virtual machines for CloudStack operations.
                    </p>
                    <div className="mt-6 overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">v-2-VM</td>
                            <td className="px-6 py-4 whitespace-nowrap">Console Proxy</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Running</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">Up</td>
                            <td className="px-6 py-4 whitespace-nowrap">east-us-01</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">s-1-VM</td>
                            <td className="px-6 py-4 whitespace-nowrap">Secondary Storage VM</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Running</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">Up</td>
                            <td className="px-6 py-4 whitespace-nowrap">east-us-01</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">r-4-VM</td>
                            <td className="px-6 py-4 whitespace-nowrap">Virtual Router</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Running</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">Up</td>
                            <td className="px-6 py-4 whitespace-nowrap">west-us-01</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="events">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Events</h2>
                    <p className="text-gray-600">
                      Track system events and alerts across your cloud infrastructure.
                    </p>
                    <div className="mt-6 space-y-3">
                      <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-md">
                        <div className="flex justify-between">
                          <p className="font-medium">VM instance-00124 started successfully</p>
                          <p className="text-sm text-gray-500">10 minutes ago</p>
                        </div>
                        <p className="text-sm text-gray-600">Virtual machine was started on host east-us-01</p>
                      </div>
                      <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-md">
                        <div className="flex justify-between">
                          <p className="font-medium">Volume vol-003421 attached</p>
                          <p className="text-sm text-gray-500">1 hour ago</p>
                        </div>
                        <p className="text-sm text-gray-600">Storage volume attached to VM instance-00124</p>
                      </div>
                      <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-md">
                        <div className="flex justify-between">
                          <p className="font-medium">High CPU usage detected</p>
                          <p className="text-sm text-gray-500">3 hours ago</p>
                        </div>
                        <p className="text-sm text-gray-600">Host west-us-01 exceeding 85% CPU utilization</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
