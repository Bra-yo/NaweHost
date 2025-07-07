
import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Server, Database, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CloudPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  specs: {
    cpu: string;
    memory: string;
    storage: string;
    transfer: string;
  };
  icon: typeof Package;
  features: string[];
}

const CloudPackages = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans: CloudPlan[] = [
    {
      name: "Nanode",
      description: "For developers and small applications",
      price: {
        monthly: 5,
        yearly: 4,
      },
      specs: {
        cpu: "1 vCPU",
        memory: "1 GB",
        storage: "25 GB SSD",
        transfer: "1 TB",
      },
      icon: Package,
      features: [
        "40 Gbps Network In",
        "1000 Mbps Network Out",
        "24/7 Basic Support",
        "Global Availability",
      ],
    },
    {
      name: "Standard",
      description: "For production applications and APIs",
      price: {
        monthly: 20,
        yearly: 18,
      },
      specs: {
        cpu: "2 vCPUs",
        memory: "4 GB",
        storage: "80 GB SSD",
        transfer: "4 TB",
      },
      icon: Server,
      features: [
        "40 Gbps Network In",
        "4000 Mbps Network Out",
        "24/7 Standard Support",
        "Global Availability",
        "NodeBalancers",
      ],
    },
    {
      name: "Dedicated",
      description: "For resource-intensive applications",
      price: {
        monthly: 60,
        yearly: 54,
      },
      specs: {
        cpu: "4 vCPUs",
        memory: "8 GB",
        storage: "160 GB SSD",
        transfer: "5 TB",
      },
      icon: Database,
      features: [
        "40 Gbps Network In",
        "5000 Mbps Network Out",
        "24/7 Priority Support",
        "Global Availability",
        "NodeBalancers",
        "Cloud Firewall",
      ],
    },
    {
      name: "Enterprise",
      description: "For high-traffic applications and services",
      price: {
        monthly: 120,
        yearly: 108,
      },
      specs: {
        cpu: "8 vCPUs",
        memory: "16 GB",
        storage: "320 GB SSD",
        transfer: "6 TB",
      },
      icon: Network,
      features: [
        "40 Gbps Network In",
        "6000 Mbps Network Out",
        "24/7 Priority Support",
        "Global Availability",
        "NodeBalancers",
        "Cloud Firewall",
        "DDoS Protection",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cloud Hosting Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            High-performance SSD cloud instances designed for all your workloads
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${billingPeriod === "monthly" ? "text-gray-900" : "text-gray-500"}`}>
              Monthly
            </span>
            <Switch
              checked={billingPeriod === "yearly"}
              onCheckedChange={(checked) => setBillingPeriod(checked ? "yearly" : "monthly")}
            />
            <div className="flex items-center">
              <span className={`text-sm font-medium ${billingPeriod === "yearly" ? "text-gray-900" : "text-gray-500"}`}>
                Yearly
              </span>
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                Save 10%
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 hover:border-primary/60 hover:shadow-lg transition-all duration-200"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">
                        ${billingPeriod === "monthly" ? plan.price.monthly : plan.price.yearly}
                      </span>
                      <span className="text-gray-600 ml-2">/mo</span>
                    </div>
                    {billingPeriod === "yearly" && (
                      <p className="text-green-600 text-sm mt-1">Billed annually</p>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600">CPU:</span>
                        <span className="ml-2 font-medium">{plan.specs.cpu}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600">Memory:</span>
                        <span className="ml-2 font-medium">{plan.specs.memory}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600">Storage:</span>
                        <span className="ml-2 font-medium">{plan.specs.storage}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600">Transfer:</span>
                        <span className="ml-2 font-medium">{plan.specs.transfer}</span>
                      </div>
                    </div>
                  </div>

                  <Link to="/configure">
                    <Button className="w-full">Deploy Instance</Button>
                  </Link>
                </div>

                <div className="border-t border-gray-100 p-6 bg-gray-50 rounded-b-xl">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          )}
        </div>
      </div>
    </section>
  );
};

export default CloudPackages;
