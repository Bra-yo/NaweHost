
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Server, HardDrive, Cpu, Plus, Edit, Trash, RefreshCw, Power, Zap, Shield } from "lucide-react";

interface PhysicalServer {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  cpuType: string;
  cpuCores: number;
  memory: number;
  storage: number;
  location: string;
  status: "active" | "maintenance" | "offline";
  instances: number;
  usedCpu?: number;
  usedMemory?: number;
  usedStorage?: number;
  ipAddress?: string;
  hypervisor?: string;
}

interface AdminServerManagementProps {
  selectedZone: string;
}

const AdminServerManagement = ({ selectedZone }: AdminServerManagementProps) => {
  const [servers, setServers] = useState<PhysicalServer[]>([
    {
      id: "server-1",
      name: "east-us-01",
      manufacturer: "Dell",
      model: "PowerEdge R750",
      cpuType: "Intel Xeon Gold 6330",
      cpuCores: 64,
      memory: 512,
      storage: 8000,
      location: "na-east",
      status: "active",
      instances: 12,
      usedCpu: 42,
      usedMemory: 384,
      usedStorage: 5200,
      ipAddress: "10.0.1.15",
      hypervisor: "KVM"
    },
    {
      id: "server-2",
      name: "west-us-01",
      manufacturer: "HP",
      model: "ProLiant DL380 Gen10",
      cpuType: "AMD EPYC 7763",
      cpuCores: 128,
      memory: 1024,
      storage: 16000,
      location: "na-west",
      status: "active",
      instances: 8,
      usedCpu: 36,
      usedMemory: 512,
      usedStorage: 6400,
      ipAddress: "10.0.2.15",
      hypervisor: "XenServer"
    },
    {
      id: "server-3",
      name: "eu-central-01",
      manufacturer: "Dell",
      model: "PowerEdge R840",
      cpuType: "Intel Xeon Platinum 8380",
      cpuCores: 80,
      memory: 768,
      storage: 12000,
      location: "eu-central",
      status: "maintenance",
      instances: 3,
      usedCpu: 12,
      usedMemory: 256,
      usedStorage: 4800,
      ipAddress: "10.0.3.15",
      hypervisor: "KVM"
    },
    {
      id: "server-4",
      name: "asia-east-01",
      manufacturer: "Lenovo",
      model: "ThinkSystem SR650",
      cpuType: "Intel Xeon Gold 6348",
      cpuCores: 56,
      memory: 512,
      storage: 10000,
      location: "asia-east",
      status: "active",
      instances: 9,
      usedCpu: 38,
      usedMemory: 384,
      usedStorage: 7200,
      ipAddress: "10.0.4.15",
      hypervisor: "VMware"
    }
  ]);
  
  const [newServer, setNewServer] = useState<Partial<PhysicalServer>>({
    manufacturer: "Dell",
    status: "active",
    hypervisor: "KVM"
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleAddServer = () => {
    if (!newServer.name || !newServer.model || !newServer.location) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const serverToAdd: PhysicalServer = {
      id: `server-${Date.now()}`,
      name: newServer.name || "",
      manufacturer: newServer.manufacturer || "Dell",
      model: newServer.model || "",
      cpuType: newServer.cpuType || "Intel Xeon",
      cpuCores: newServer.cpuCores || 64,
      memory: newServer.memory || 512,
      storage: newServer.storage || 8000,
      location: newServer.location || "na-east",
      status: newServer.status || "active",
      instances: 0,
      usedCpu: 0,
      usedMemory: 0,
      usedStorage: 0,
      ipAddress: newServer.ipAddress || "10.0.0.1",
      hypervisor: newServer.hypervisor || "KVM"
    };
    
    if (isEditing && newServer.id) {
      setServers(servers.map(s => s.id === newServer.id ? { ...serverToAdd, id: newServer.id } : s));
      toast({
        title: "Success",
        description: "Host updated successfully"
      });
    } else {
      setServers([...servers, serverToAdd]);
      toast({
        title: "Success",
        description: "Host added successfully"
      });
    }
    
    setNewServer({
      manufacturer: "Dell",
      status: "active",
      hypervisor: "KVM"
    });
    setIsDialogOpen(false);
    setIsEditing(false);
  };
  
  const handleEditServer = (server: PhysicalServer) => {
    setNewServer(server);
    setIsEditing(true);
    setIsDialogOpen(true);
  };
  
  const handleDeleteServer = (id: string) => {
    setServers(servers.filter(server => server.id !== id));
    toast({
      title: "Success",
      description: "Host removed successfully"
    });
  };

  // Filter servers by the selected zone
  const filteredServers = servers.filter(server => server.location === selectedZone);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Host Management</h2>
          <p className="text-gray-600">Manage physical hosts in the selected zone</p>
        </div>
        
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => {
                setNewServer({
                  manufacturer: "Dell",
                  status: "active",
                  hypervisor: "KVM",
                  location: selectedZone
                });
                setIsEditing(false);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Host
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? 'Edit Host' : 'Add New Host'}</DialogTitle>
                <DialogDescription>
                  {isEditing ? 
                    'Update the details of an existing physical host.' : 
                    'Add a new physical host to your infrastructure.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Host Name*</Label>
                    <Input
                      id="name"
                      value={newServer.name || ''}
                      onChange={(e) => setNewServer({...newServer, name: e.target.value})}
                      placeholder="e.g., east-us-01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Zone*</Label>
                    <Select 
                      value={newServer.location} 
                      onValueChange={(value) => setNewServer({...newServer, location: value})}
                    >
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="na-east">North America (East)</SelectItem>
                        <SelectItem value="na-west">North America (West)</SelectItem>
                        <SelectItem value="eu-central">Europe (Central)</SelectItem>
                        <SelectItem value="eu-west">Europe (West)</SelectItem>
                        <SelectItem value="asia-east">Asia (East)</SelectItem>
                        <SelectItem value="asia-south">Asia (South)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ipAddress">IP Address*</Label>
                    <Input
                      id="ipAddress"
                      value={newServer.ipAddress || ''}
                      onChange={(e) => setNewServer({...newServer, ipAddress: e.target.value})}
                      placeholder="e.g., 10.0.1.15"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hypervisor">Hypervisor*</Label>
                    <Select 
                      value={newServer.hypervisor} 
                      onValueChange={(value) => setNewServer({...newServer, hypervisor: value})}
                    >
                      <SelectTrigger id="hypervisor">
                        <SelectValue placeholder="Select hypervisor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KVM">KVM</SelectItem>
                        <SelectItem value="XenServer">XenServer</SelectItem>
                        <SelectItem value="VMware">VMware</SelectItem>
                        <SelectItem value="Hyper-V">Hyper-V</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Select 
                      value={newServer.manufacturer} 
                      onValueChange={(value) => setNewServer({...newServer, manufacturer: value})}
                    >
                      <SelectTrigger id="manufacturer">
                        <SelectValue placeholder="Select manufacturer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dell">Dell</SelectItem>
                        <SelectItem value="HP">HP</SelectItem>
                        <SelectItem value="Lenovo">Lenovo</SelectItem>
                        <SelectItem value="Supermicro">Supermicro</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model*</Label>
                    <Input
                      id="model"
                      value={newServer.model || ''}
                      onChange={(e) => setNewServer({...newServer, model: e.target.value})}
                      placeholder="e.g., PowerEdge R750"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpuType">CPU Type</Label>
                    <Input
                      id="cpuType"
                      value={newServer.cpuType || ''}
                      onChange={(e) => setNewServer({...newServer, cpuType: e.target.value})}
                      placeholder="e.g., Intel Xeon Gold 6330"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpuCores">CPU Cores</Label>
                    <Input
                      id="cpuCores"
                      type="number"
                      value={newServer.cpuCores || ''}
                      onChange={(e) => setNewServer({...newServer, cpuCores: parseInt(e.target.value)})}
                      placeholder="64"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="memory">Memory (GB)</Label>
                    <Input
                      id="memory"
                      type="number"
                      value={newServer.memory || ''}
                      onChange={(e) => setNewServer({...newServer, memory: parseInt(e.target.value)})}
                      placeholder="512"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storage">Storage (GB)</Label>
                    <Input
                      id="storage"
                      type="number"
                      value={newServer.storage || ''}
                      onChange={(e) => setNewServer({...newServer, storage: parseInt(e.target.value)})}
                      placeholder="8000"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newServer.status} 
                    onValueChange={(value: "active" | "maintenance" | "offline") => 
                      setNewServer({...newServer, status: value})
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddServer}>
                  {isEditing ? 'Update Host' : 'Add Host'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {filteredServers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Server className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No hosts in this zone</h3>
          <p className="mt-1 text-gray-500">Add a new host to start managing resources in this zone</p>
          <Button 
            className="mt-4" 
            onClick={() => {
              setNewServer({
                manufacturer: "Dell",
                status: "active",
                hypervisor: "KVM",
                location: selectedZone
              });
              setIsEditing(false);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Host
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-medium">Hosts in {selectedZone}</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Hypervisor</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServers.map((server) => (
                  <TableRow key={server.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{server.name}</div>
                        <div className="text-xs text-gray-500">{server.manufacturer} {server.model}</div>
                      </div>
                    </TableCell>
                    <TableCell>{server.ipAddress}</TableCell>
                    <TableCell>{server.hypervisor}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center">
                          <Cpu className="h-3 w-3 mr-1 text-gray-500" />
                          {server.cpuCores} Cores
                        </div>
                        <div className="flex items-center">
                          <Server className="h-3 w-3 mr-1 text-gray-500" />
                          {server.memory}GB
                        </div>
                        <div className="flex items-center">
                          <HardDrive className="h-3 w-3 mr-1 text-gray-500" />
                          {server.storage}GB
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500">
                          CPU: {server.usedCpu || 0}% 
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 rounded-full" 
                              style={{ width: `${server.usedCpu || 0}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Memory: {Math.round(((server.usedMemory || 0) / server.memory) * 100)}%
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${Math.round(((server.usedMemory || 0) / server.memory) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Storage: {Math.round(((server.usedStorage || 0) / server.storage) * 100)}%
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ width: `${Math.round(((server.usedStorage || 0) / server.storage) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${server.status === 'active' ? 'bg-green-100 text-green-800' : 
                          server.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {server.status === 'active' ? 'Active' : 
                         server.status === 'maintenance' ? 'Maintenance' : 'Offline'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditServer(server)}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          title="Restart"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          title="Power operations"
                        >
                          <Power className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          title="Security"
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteServer(server.id)}
                          title="Delete"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Zone Capacity</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU</span>
                    <span>
                      {filteredServers.reduce((sum, server) => sum + (server.usedCpu || 0), 0) / filteredServers.length}% used
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full" 
                      style={{ 
                        width: `${filteredServers.reduce((sum, server) => sum + (server.usedCpu || 0), 0) / filteredServers.length}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory</span>
                    <span>
                      {Math.round(
                        filteredServers.reduce((sum, server) => sum + (server.usedMemory || 0), 0) / 
                        filteredServers.reduce((sum, server) => sum + server.memory, 0) * 100
                      )}% used
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ 
                        width: `${Math.round(
                          filteredServers.reduce((sum, server) => sum + (server.usedMemory || 0), 0) / 
                          filteredServers.reduce((sum, server) => sum + server.memory, 0) * 100
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Storage</span>
                    <span>
                      {Math.round(
                        filteredServers.reduce((sum, server) => sum + (server.usedStorage || 0), 0) / 
                        filteredServers.reduce((sum, server) => sum + server.storage, 0) * 100
                      )}% used
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ 
                        width: `${Math.round(
                          filteredServers.reduce((sum, server) => sum + (server.usedStorage || 0), 0) / 
                          filteredServers.reduce((sum, server) => sum + server.storage, 0) * 100
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-purple-600 text-2xl font-bold">{filteredServers.length}</div>
                  <div className="text-sm text-gray-600">Total Hosts</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 text-2xl font-bold">
                    {filteredServers.reduce((sum, server) => sum + (server.instances || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Instances</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 text-2xl font-bold">
                    {filteredServers.reduce((sum, server) => sum + server.cpuCores, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Cores</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-yellow-600 text-2xl font-bold">
                    {filteredServers.reduce((sum, server) => sum + server.memory, 0)} GB
                  </div>
                  <div className="text-sm text-gray-600">Total RAM</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Alerts</h3>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-md">
                  <div className="font-medium text-sm">High CPU on {filteredServers.find(s => s.usedCpu && s.usedCpu > 80)?.name || "host"}</div>
                  <div className="text-xs text-gray-600">CPU utilization exceeds 80%</div>
                </div>
                <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-md">
                  <div className="font-medium text-sm">Maintenance Scheduled</div>
                  <div className="text-xs text-gray-600">Zone maintenance in 3 days</div>
                </div>
                <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-md">
                  <div className="font-medium text-sm">All systems operational</div>
                  <div className="text-xs text-gray-600">No critical alerts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServerManagement;
