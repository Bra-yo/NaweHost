
import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  priceUnit: string;
  highlight?: boolean;
  features: PlanFeature[];
  specs: {
    cpu: string;
    memory: string;
    storage: string;
    bandwidth: string;
    locations: number;
  };
}

const PricingPlans = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans: Plan[] = [
    {
      name: "Essential",
      description: "Perfect for small applications and websites",
      price: {
        monthly: 69,
        yearly: 59,
      },
      priceUnit: "month",
      features: [
        { name: "Single CPU configuration", included: true },
        { name: "Automated daily backups", included: true },
        { name: "Basic monitoring", included: true },
        { name: "DDoS protection", included: true },
        { name: "24/7 email support", included: true },
        { name: "Load balancing", included: false },
        { name: "Dedicated IPs", included: false },
        { name: "Custom hardware options", included: false },
      ],
      specs: {
        cpu: "4 cores @ 2.5GHz",
        memory: "8GB DDR4",
        storage: "120GB SSD",
        bandwidth: "5TB",
        locations: 3,
      }
    },
    {
      name: "Performance",
      description: "Ideal for medium-sized applications and databases",
      price: {
        monthly: 129,
        yearly: 109,
      },
      priceUnit: "month",
      highlight: true,
      features: [
        { name: "Dual CPU configuration", included: true },
        { name: "Automated daily backups", included: true },
        { name: "Advanced monitoring", included: true },
        { name: "DDoS protection", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Load balancing", included: true },
        { name: "Dedicated IPs", included: true },
        { name: "Custom hardware options", included: false },
      ],
      specs: {
        cpu: "8 cores @ 3.0GHz",
        memory: "16GB DDR4",
        storage: "240GB SSD",
        bandwidth: "10TB",
        locations: 5,
      }
    },
    {
      name: "Enterprise",
      description: "For high-traffic, resource-intensive applications",
      price: {
        monthly: 249,
        yearly: 209,
      },
      priceUnit: "month",
      features: [
        { name: "Quad CPU configuration", included: true },
        { name: "Automated daily backups", included: true },
        { name: "Enterprise monitoring", included: true },
        { name: "DDoS protection", included: true },
        { name: "24/7 phone & priority support", included: true },
        { name: "Load balancing", included: true },
        { name: "Multiple dedicated IPs", included: true },
        { name: "Custom hardware options", included: true },
      ],
      specs: {
        cpu: "16 cores @ 3.5GHz",
        memory: "32GB DDR4",
        storage: "480GB SSD",
        bandwidth: "20TB",
        locations: 10,
      }
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect bare metal server plan for your workload. Predictable pricing, no hidden fees.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mt-8">
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
                Save 15%
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden ${
                plan.highlight
                  ? "border-primary shadow-lg shadow-primary/10 relative"
                  : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="font-bold text-2xl text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${billingPeriod === "monthly" ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-gray-600">/{plan.priceUnit}</span>
                  {billingPeriod === "yearly" && (
                    <div className="mt-1 text-sm text-green-600 font-medium">Billed annually</div>
                  )}
                </div>
                
                <div className="mt-6">
                  <Link to="/configure">
                    <Button 
                      className={`w-full ${plan.highlight ? "bg-primary hover:bg-primary-600" : ""}`}
                    >
                      Configure Server
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6 md:p-8 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-4">Server Specifications</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <span className="font-medium w-24 text-gray-700">CPU:</span>
                    <span>{plan.specs.cpu}</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="font-medium w-24 text-gray-700">Memory:</span>
                    <span>{plan.specs.memory}</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="font-medium w-24 text-gray-700">Storage:</span>
                    <span>{plan.specs.storage}</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="font-medium w-24 text-gray-700">Bandwidth:</span>
                    <span>{plan.specs.bandwidth}</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="font-medium w-24 text-gray-700">Locations:</span>
                    <span>{plan.specs.locations} data centers</span>
                  </li>
                </ul>
                
                <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Need a custom configuration?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Contact our sales team to design a custom server solution tailored to your specific requirements.
          </p>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
