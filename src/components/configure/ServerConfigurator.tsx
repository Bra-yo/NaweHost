import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { HardDrive, Cpu, Globe, Server, MemoryStick } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

const serverLocations = [
  { value: "na-east", label: "North America (East)" },
  { value: "na-west", label: "North America (West)" },
  { value: "eu-central", label: "Europe (Central)" },
  { value: "eu-west", label: "Europe (West)" },
  { value: "asia-east", label: "Asia (East)" },
  { value: "asia-south", label: "Asia (South)" },
];

const operatingSystems = [
  { value: "ubuntu-22-04", label: "Ubuntu 22.04 LTS" },
  { value: "debian-11", label: "Debian 11" },
  { value: "centos-9", label: "CentOS Stream 9" },
  { value: "windows-server-2022", label: "Windows Server 2022" },
  { value: "custom", label: "Custom OS (Upload ISO)" },
];

const physicalServers = [
  {
    id: "server-1",
    name: "east-us-01",
    manufacturer: "Dell",
    model: "PowerEdge R750",
    location: "na-east",
    status: "active",
  },
  {
    id: "server-2",
    name: "west-us-01",
    manufacturer: "HP",
    model: "ProLiant DL380 Gen10",
    location: "na-west",
    status: "active", 
  },
  {
    id: "server-3",
    name: "eu-central-01",
    manufacturer: "Dell",
    model: "PowerEdge R840",
    location: "eu-central",
    status: "maintenance",
  }
];

const ServerConfigurator = () => {
  const [cpuCores, setCpuCores] = useState([8]);
  const [memory, setMemory] = useState([16]);
  const [storage, setStorage] = useState([480]);
  const [bandwidth, setBandwidth] = useState([10]);
  const [location, setLocation] = useState("na-east");
  const [os, setOS] = useState("ubuntu-22-04");
  const [backupOption, setBackupOption] = useState("daily");
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  const basePrice = 129;
  const cpuPrice = (cpuCores[0] - 8) * 10;
  const memoryPrice = (memory[0] - 16) * 5;
  const storagePrice = (storage[0] - 480) * 0.1;
  const bandwidthPrice = (bandwidth[0] - 10) * 5;
  const backupPrices = { none: 0, daily: 15, hourly: 39 };

  const totalPrice = basePrice + cpuPrice + memoryPrice + storagePrice + bandwidthPrice + backupPrices[backupOption as keyof typeof backupPrices];

  const availableServers = physicalServers.filter(
    server => server.location === location && server.status === "active"
  );

  const handleDeploy = () => {
    if (!selectedServer && availableServers.length > 0) {
      toast({
        title: "Please select a server",
        description: "You need to select a physical server to deploy your instance.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Deployment started!",
      description: "Your server is being provisioned. Check your dashboard for updates.",
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Configure Your Server</h1>
          <p className="text-xl text-gray-600 mb-8">Customize your server exactly how you need it.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <Cpu className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-lg">CPU</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">CPU Cores</span>
                    <span className="font-semibold">{cpuCores[0]} Cores</span>
                  </div>
                  <Slider
                    defaultValue={[8]}
                    min={4}
                    max={32}
                    step={2}
                    onValueChange={setCpuCores}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>4 Cores</span>
                    <span>32 Cores</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <MemoryStick className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-lg">Memory</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">RAM</span>
                    <span className="font-semibold">{memory[0]} GB</span>
                  </div>
                  <Slider
                    defaultValue={[16]}
                    min={8}
                    max={128}
                    step={8}
                    onValueChange={setMemory}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>8 GB</span>
                    <span>128 GB</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <HardDrive className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-lg">Storage</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">SSD Storage</span>
                    <span className="font-semibold">{storage[0]} GB</span>
                  </div>
                  <Slider
                    defaultValue={[480]}
                    min={120}
                    max={2000}
                    step={120}
                    onValueChange={setStorage}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>120 GB</span>
                    <span>2000 GB</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <Globe className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-lg">Network</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Bandwidth</span>
                    <span className="font-semibold">{bandwidth[0]} TB</span>
                  </div>
                  <Slider
                    defaultValue={[10]}
                    min={5}
                    max={50}
                    step={5}
                    onValueChange={setBandwidth}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>5 TB</span>
                    <span>50 TB</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <Server className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-lg">Configuration</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block mb-2">Data Center Location</Label>
                    <Select value={location} onValueChange={(loc) => {
                      setLocation(loc);
                      setSelectedServer(null);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {serverLocations.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value}>
                            {loc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="block mb-2">Operating System</Label>
                    <Select value={os} onValueChange={setOS}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OS" />
                      </SelectTrigger>
                      <SelectContent>
                        {operatingSystems.map((os) => (
                          <SelectItem key={os.value} value={os.value}>
                            {os.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label className="block mb-2">Physical Server</Label>
                  {availableServers.length > 0 ? (
                    <Select value={selectedServer || ""} onValueChange={setSelectedServer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select physical server" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-select optimal server</SelectItem>
                        {availableServers.map((server) => (
                          <SelectItem key={server.id} value={server.id}>
                            {server.name} ({server.manufacturer} {server.model})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-amber-600 text-sm bg-amber-50 p-3 rounded border border-amber-200">
                      No servers currently available in this location. Please select another location or contact support.
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Label className="block mb-3">Backup Options</Label>
                  <RadioGroup defaultValue="daily" value={backupOption} onValueChange={setBackupOption}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">No backups (+$0/month)</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Daily backups (+$15/month)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hourly" id="hourly" />
                      <Label htmlFor="hourly">Hourly backups (+$39/month)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-24 bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-lg mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">CPU</span>
                    <span>{cpuCores[0]} Cores</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Memory</span>
                    <span>{memory[0]} GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Storage</span>
                    <span>{storage[0]} GB SSD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bandwidth</span>
                    <span>{bandwidth[0]} TB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location</span>
                    <span>
                      {serverLocations.find((loc) => loc.value === location)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Operating System</span>
                    <span>
                      {operatingSystems.find((o) => o.value === os)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Backup</span>
                    <span className="capitalize">{backupOption}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Physical Server</span>
                    <span>
                      {selectedServer ? 
                        selectedServer === "auto" ? "Auto-selected" : 
                        physicalServers.find(s => s.id === selectedServer)?.name || "None" 
                        : "None"}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />
                
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Monthly Total</span>
                  <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                
                <Button className="w-full mb-3" onClick={handleDeploy}>Deploy Server</Button>
                <Button variant="outline" className="w-full">Save Configuration</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerConfigurator;
