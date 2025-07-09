import { useState, useEffect } from "react";
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
  Plus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ServerType {
  id: string;
  name: string;
  type: string;
  status: string;
  cpu_cores?: number | null;
  ram_gb?: number | null;
  storage_gb?: number | null;
  monthly_price?: number | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const ServerDashboard = () => {
  const [servers, setServers] = useState<ServerType[]>([]);
  const [activeServer, setActiveServer] = useState<ServerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [creatingServer, setCreatingServer] = useState(false);
  const [newServer, setNewServer] = useState({
    name: "",
    type: "",
    cpu_cores: "",
    ram_gb: "",
    storage_gb: "",
    monthly_price: ""
  });
  const { user } = useAuth();
  
  const statusColors: Record<string, string> = {
    active: "bg-green-500",
    inactive: "bg-red-500",
    restarting: "bg-amber-500",
    provisioning: "bg-blue-500",
  };
  
  const statusText: Record<string, string> = {
    active: "Active",
    inactive: "Inactive",
    restarting: "Restarting",
    provisioning: "Provisioning",
  };

  const fetchServers = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('servers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setServers(data || []);
      if (data && data.length > 0 && !activeServer) {
        setActiveServer(data[0]);
      }
    } catch (error) {
      console.error('Error fetching servers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch servers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createServer = async () => {
    if (!user) return;
    
    setCreatingServer(true);
    try {
      const { data, error } = await supabase
        .from('servers')
        .insert({
          name: newServer.name,
          type: newServer.type,
          cpu_cores: newServer.cpu_cores ? parseInt(newServer.cpu_cores) : null,
          ram_gb: newServer.ram_gb ? parseInt(newServer.ram_gb) : null,
          storage_gb: newServer.storage_gb ? parseInt(newServer.storage_gb) : null,
          monthly_price: newServer.monthly_price ? parseFloat(newServer.monthly_price) : null,
          user_id: user.id,
          status: 'provisioning'
        })
        .select()
        .single();

      if (error) throw error;

      setServers(prev => [data, ...prev]);
      if (!activeServer) {
        setActiveServer(data);
      }
      setCreateDialogOpen(false);
      setNewServer({
        name: "",
        type: "",
        cpu_cores: "",
        ram_gb: "",
        storage_gb: "",
        monthly_price: ""
      });
      
      toast({
        title: "Success",
        description: "Server created successfully",
      });
    } catch (error) {
      console.error('Error creating server:', error);
      toast({
        title: "Error",
        description: "Failed to create server",
        variant: "destructive",
      });
    } finally {
      setCreatingServer(false);
    }
  };

  useEffect(() => {
    fetchServers();
  }, [user]);

  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading servers...</div>
          </div>
        </div>
      </section>
    );
  }

  const onlineServers = servers.filter(s => s.status === 'active').length;
  const totalServers = servers.length;

  return (
    <section className="py-8 md:py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Server Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your servers</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Server
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Server</DialogTitle>
                  <DialogDescription>
                    Configure your new server instance.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newServer.name}
                      onChange={(e) => setNewServer(prev => ({ ...prev, name: e.target.value }))}
                      className="col-span-3"
                      placeholder="My Server"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select onValueChange={(value) => setNewServer(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select server type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Server</SelectItem>
                        <SelectItem value="database">Database Server</SelectItem>
                        <SelectItem value="application">Application Server</SelectItem>
                        <SelectItem value="development">Development Server</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cpu_cores" className="text-right">
                      CPU Cores
                    </Label>
                    <Input
                      id="cpu_cores"
                      type="number"
                      value={newServer.cpu_cores}
                      onChange={(e) => setNewServer(prev => ({ ...prev, cpu_cores: e.target.value }))}
                      className="col-span-3"
                      placeholder="4"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ram_gb" className="text-right">
                      RAM (GB)
                    </Label>
                    <Input
                      id="ram_gb"
                      type="number"
                      value={newServer.ram_gb}
                      onChange={(e) => setNewServer(prev => ({ ...prev, ram_gb: e.target.value }))}
                      className="col-span-3"
                      placeholder="8"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="storage_gb" className="text-right">
                      Storage (GB)
                    </Label>
                    <Input
                      id="storage_gb"
                      type="number"
                      value={newServer.storage_gb}
                      onChange={(e) => setNewServer(prev => ({ ...prev, storage_gb: e.target.value }))}
                      className="col-span-3"
                      placeholder="100"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="monthly_price" className="text-right">
                      Monthly Price ($)
                    </Label>
                    <Input
                      id="monthly_price"
                      type="number"
                      step="0.01"
                      value={newServer.monthly_price}
                      onChange={(e) => setNewServer(prev => ({ ...prev, monthly_price: e.target.value }))}
                      className="col-span-3"
                      placeholder="29.99"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={createServer}
                    disabled={!newServer.name || !newServer.type || creatingServer}
                  >
                    {creatingServer ? "Creating..." : "Create Server"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {servers.length === 0 ? (
          <div className="text-center py-12">
            <Server className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No servers yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first server.</p>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Server
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Servers</CardTitle>
                  <CardDescription>Select a server to manage</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1 px-3 pb-3">
                    {servers.map((server) => (
                      <Button
                        key={server.id}
                        variant={activeServer?.id === server.id ? "secondary" : "ghost"}
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
                  <Button variant="outline" size="sm" className="w-full" onClick={fetchServers}>
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
                      <span className="font-medium">{onlineServers}/{totalServers}</span>
                    </div>
                    <Progress value={totalServers > 0 ? (onlineServers / totalServers) * 100 : 0} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Total Servers</span>
                      <span className="font-medium">{totalServers}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Monthly Cost</span>
                      <span className="font-medium">
                        ${servers.reduce((sum, s) => sum + (s.monthly_price || 0), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {activeServer && (
              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <CardTitle>{activeServer.name}</CardTitle>
                          <Badge className="ml-2" variant="outline">
                            {activeServer.type}
                          </Badge>
                        </div>
                        <CardDescription className="mt-1">
                          Created {new Date(activeServer.created_at).toLocaleDateString()}
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
                        <div className="text-xs text-gray-600 mb-1">CPU Cores</div>
                        <div className="text-2xl font-bold mb-1">{activeServer.cpu_cores || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">RAM (GB)</div>
                        <div className="text-2xl font-bold mb-1">{activeServer.ram_gb || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Storage (GB)</div>
                        <div className="text-2xl font-bold mb-1">{activeServer.storage_gb || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Monthly Price</div>
                        <div className="text-2xl font-bold mb-1">
                          {activeServer.monthly_price ? `$${activeServer.monthly_price}` : 'N/A'}
                        </div>
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
                                <span className="text-gray-600">CPU Cores</span>
                                <span>{activeServer.cpu_cores || 'Not specified'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Memory</span>
                                <span>{activeServer.ram_gb ? `${activeServer.ram_gb} GB` : 'Not specified'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Storage</span>
                                <span>{activeServer.storage_gb ? `${activeServer.storage_gb} GB` : 'Not specified'}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-3">Server Info</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Type</span>
                                <span className="capitalize">{activeServer.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status</span>
                                <span className="capitalize">{activeServer.status}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Created</span>
                                <span>{new Date(activeServer.created_at).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Monthly Cost</span>
                                <span>{activeServer.monthly_price ? `$${activeServer.monthly_price}` : 'Free'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="monitoring">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Monitoring</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">Server monitoring features will be available once the server is active.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="networking">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Network Configuration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">Network configuration options will be available once the server is provisioned.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Security Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">Security settings and firewall configuration will be available once the server is active.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServerDashboard;