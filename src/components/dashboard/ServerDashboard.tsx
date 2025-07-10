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
  Play,
  Trash2,
  CreditCard,
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
import PaymentModal from "@/components/payment/PaymentModal";

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
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [creatingServer, setCreatingServer] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [newServer, setNewServer] = useState({
    name: "",
    type: "",
    plan_id: ""
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

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_plans')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleCreateServer = async () => {
    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a plan first",
        variant: "destructive",
      });
      return;
    }
    
    // Open payment modal
    setPaymentModalOpen(true);
    setCreateDialogOpen(false);
  };

  const createServer = async () => {
    if (!user || !selectedPlan) return;
    
    setCreatingServer(true);
    try {
      const { data, error } = await supabase
        .from('servers')
        .insert({
          name: newServer.name,
          type: newServer.type,
          plan_id: selectedPlan.id,
          cpu_cores: selectedPlan.cpu_cores,
          ram_gb: selectedPlan.ram_gb,
          storage_gb: selectedPlan.storage_gb,
          monthly_price: selectedPlan.price,
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
      
      setNewServer({
        name: "",
        type: "",
        plan_id: ""
      });
      setSelectedPlan(null);
      
      toast({
        title: "Success",
        description: "Server created successfully after payment",
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

  const handleServerAction = async (serverId: string, action: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('server-action', {
        body: {
          server_id: serverId,
          action_type: action
        }
      });

      if (error) throw error;

      toast({
        title: "Action Initiated",
        description: data.message,
      });

      // Refresh servers to get updated status
      fetchServers();
    } catch (error) {
      console.error('Server action error:', error);
      toast({
        title: "Error",
        description: "Failed to perform server action",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchServers();
    fetchPlans();
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
                  
                  <div className="col-span-4">
                    <Label className="text-sm font-medium">Select Plan</Label>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                      {plans.map((plan) => (
                        <div 
                          key={plan.id} 
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedPlan?.id === plan.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedPlan(plan)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{plan.name}</h4>
                              <p className="text-sm text-gray-600">
                                {plan.cpu_cores} CPU • {plan.ram_gb}GB RAM • {plan.storage_gb}GB Storage
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-lg">${plan.price}</span>
                              <span className="text-gray-500 text-sm">/month</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleCreateServer}
                    disabled={!newServer.name || !newServer.type || !selectedPlan}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Proceed to Payment
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleServerAction(activeServer.id, 'restart')}
                        disabled={activeServer.status === 'restarting'}
                        className="flex items-center"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Restart
                      </Button>
                      {activeServer.status === 'active' ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleServerAction(activeServer.id, 'stop')}
                          className="flex items-center"
                        >
                          <PowerOff className="h-4 w-4 mr-2" />
                          Stop
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleServerAction(activeServer.id, 'start')}
                          className="flex items-center"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      )}
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleServerAction(activeServer.id, 'delete')}
                        className="flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                    <Button size="sm" className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
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
                        <CardTitle className="text-lg">Server Monitoring</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">28%</div>
                            <div className="text-sm text-gray-600">CPU Usage</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">42%</div>
                            <div className="text-sm text-gray-600">Memory Usage</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">65%</div>
                            <div className="text-sm text-gray-600">Storage Usage</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">99.9%</div>
                            <div className="text-sm text-gray-600">Uptime</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Recent Activity</h4>
                          <div className="space-y-2">
                            <div className="text-sm p-2 bg-gray-50 rounded">Server started - 2 hours ago</div>
                            <div className="text-sm p-2 bg-gray-50 rounded">Backup completed - 6 hours ago</div>
                            <div className="text-sm p-2 bg-gray-50 rounded">Security scan passed - 1 day ago</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="networking">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Network Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Public IP</Label>
                            <Input value="203.0.113.1" readOnly className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Private IP</Label>
                            <Input value="10.0.0.1" readOnly className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium">SSH Port</Label>
                            <Input value="22" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium">HTTP Port</Label>
                            <Input value="80" className="mt-1" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Firewall Rules</Label>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">SSH (22) - Allow from anywhere</span>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">HTTP (80) - Allow from anywhere</span>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">HTTPS (443) - Allow from anywhere</span>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-2">Add Rule</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Security Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">SSH Keys</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">ssh-rsa AAAAB3NzaC1yc2E... user@example.com</span>
                              <Button variant="outline" size="sm">Remove</Button>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-2">Add SSH Key</Button>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Security Scan Results</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                              <div>
                                <div className="text-sm font-medium text-green-800">Last Scan: Passed</div>
                                <div className="text-xs text-green-600">No vulnerabilities found</div>
                              </div>
                              <Badge className="bg-green-100 text-green-800">Secure</Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-2">Run Security Scan</Button>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Access Control</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Two-Factor Authentication</span>
                              <Button variant="outline" size="sm">Enable</Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Password Authentication</span>
                              <Button variant="outline" size="sm">Disable</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        )}
        
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          planId={selectedPlan?.id}
          planName={selectedPlan?.name}
          amount={selectedPlan?.price}
          onSuccess={createServer}
        />
      </div>
    </section>
  );
};

export default ServerDashboard;