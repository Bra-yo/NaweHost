
import { useState } from "react";
import {
  Server,
  Database,
  Activity,
  HardDrive,
  BarChart3,
  Shield,
  Settings,
  RefreshCw,
  PowerOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ServerStatus {
  id: string;
  name: string;
  status: "online" | "offline" | "restarting" | "provisioning";
  ip: string;
  location: string;
  uptime: string;
  cpu: number;
  memory: number;
  disk: number;
  bandwidth: number;
  os: string;
}

const serverData: ServerStatus[] = [
  {
    id: "srv-01",
    name: "Web Server",
    status: "online",
    ip: "203.0.113.10",
    location: "North America (East)",
    uptime: "15d 7h 23m",
    cpu: 28,
    memory: 42,
    disk: 65,
    bandwidth: 36,
    os: "Ubuntu 22.04 LTS",
  },
  {
    id: "srv-02",
    name: "Database Server",
    status: "online",
    ip: "203.0.113.11",
    location: "North America (East)",
    uptime: "7d 12h 8m",
    cpu: 45,
    memory: 62,
    disk: 38,
    bandwidth: 22,
    os: "CentOS Stream 9",
  },
  {
    id: "srv-03",
    name: "Staging Environment",
    status: "provisioning",
    ip: "203.0.113.12",
    location: "Europe (West)",
    uptime: "0d 0h 15m",
    cpu: 5,
    memory: 12,
    disk: 8,
    bandwidth: 3,
    os: "Debian 11",
  },
];

const ServerDashboard = () => {
  const [activeServer, setActiveServer] = useState<ServerStatus>(serverData[0]);
  
  const statusColors: Record<string, string> = {
    online: "bg-green-500",
    offline: "bg-red-500",
    restarting: "bg-amber-500",
    provisioning: "bg-blue-500",
  };
  
  const statusText: Record<string, string> = {
    online: "Online",
    offline: "Offline",
    restarting: "Restarting",
    provisioning: "Provisioning",
  };

  return (
    <section className="py-8 md:py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Server Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your servers</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>Create New Server</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Servers</CardTitle>
                <CardDescription>Select a server to manage</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 px-3 pb-3">
                  {serverData.map((server) => (
                    <Button
                      key={server.id}
                      variant={activeServer.id === server.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveServer(server)}
                    >
                      <div className="flex items-center w-full">
                        <Server className="h-4 w-4 mr-2" />
                        <span className="truncate flex-1 text-left">{server.name}</span>
                        <div 
                          className={`h-2 w-2 rounded-full ml-2 ${statusColors[server.status]}`}
                          aria-hidden="true"
                        ></div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh List
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Servers Online</span>
                    <span className="font-medium">2/3</span>
                  </div>
                  <Progress value={67} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">CPU Usage (Avg)</span>
                    <span className="font-medium">36%</span>
                  </div>
                  <Progress value={36} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Memory Usage (Avg)</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Disk Usage (Avg)</span>
                    <span className="font-medium">38%</span>
                  </div>
                  <Progress value={38} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <CardTitle>{activeServer.name}</CardTitle>
                      <Badge className="ml-2" variant="outline">
                        {activeServer.id}
                      </Badge>
                    </div>
                    <CardDescription className="mt-1">
                      {activeServer.os} • {activeServer.location} • {activeServer.ip}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${statusColors[activeServer.status]}`}></div>
                    <span className="text-sm font-medium">{statusText[activeServer.status]}</span>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">CPU Usage</div>
                    <div className="text-2xl font-bold mb-1">{activeServer.cpu}%</div>
                    <Progress value={activeServer.cpu} className="h-1.5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Memory Usage</div>
                    <div className="text-2xl font-bold mb-1">{activeServer.memory}%</div>
                    <Progress value={activeServer.memory} className="h-1.5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Disk Usage</div>
                    <div className="text-2xl font-bold mb-1">{activeServer.disk}%</div>
                    <Progress value={activeServer.disk} className="h-1.5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Bandwidth</div>
                    <div className="text-2xl font-bold mb-1">{activeServer.bandwidth}%</div>
                    <Progress value={activeServer.bandwidth} className="h-1.5" />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-medium">Network Traffic (Last 24h)</h3>
                    <div className="text-xs text-gray-600">Uptime: {activeServer.uptime}</div>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-lg border flex items-end space-x-1 px-2 pb-2">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary-400 rounded-t"
                        style={{ height: `${10 + Math.random() * 80}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-600">
                    <span>12:00 AM</span>
                    <span>12:00 PM</span>
                    <span>11:59 PM</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restart
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <PowerOff className="h-4 w-4 mr-2" />
                    Power Off
                  </Button>
                </div>
                <Button size="sm" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Server Settings
                </Button>
              </CardFooter>
            </Card>

            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                <TabsTrigger value="networking">Networking</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Server Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-3">Hardware</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Processor</span>
                            <span>8 Cores @ 3.0GHz</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Memory</span>
                            <span>16 GB DDR4</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Storage</span>
                            <span>240 GB SSD</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Network</span>
                            <span>1 Gbps</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Software</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Operating System</span>
                            <span>{activeServer.os}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Kernel</span>
                            <span>5.15.0-60-generic</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Control Panel</span>
                            <span>ServerStrata Control</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Update</span>
                            <span>2 days ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Activity className="h-5 w-5 text-primary mr-2" />
                        <CardTitle className="text-lg">Active Services</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 rounded-lg hover:bg-gray-100">
                          <span>NGINX Web Server</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Running</Badge>
                        </div>
                        <div className="flex justify-between p-2 rounded-lg hover:bg-gray-100">
                          <span>PostgreSQL</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Running</Badge>
                        </div>
                        <div className="flex justify-between p-2 rounded-lg hover:bg-gray-100">
                          <span>Redis</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Running</Badge>
                        </div>
                        <div className="flex justify-between p-2 rounded-lg hover:bg-gray-100">
                          <span>Node.js</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Running</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-primary mr-2" />
                        <CardTitle className="text-lg">Server Health</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Firewall: Active</span>
                        </div>
                        <div className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Backups: Enabled (Daily)</span>
                        </div>
                        <div className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Updates: Automatic</span>
                        </div>
                        <div className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                          <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-sm">SSL Certificate: Expires in 14 days</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="monitoring">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Detailed Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Advanced monitoring metrics would be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="networking">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Network Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Network settings and configurations would be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Security configurations and options would be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerDashboard;
