
import { Server, Shield, GitBranch, Zap, Globe, RefreshCw } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Server className="h-6 w-6 text-primary" />,
      title: "Dedicated Resources",
      description:
        "Your workloads run on dedicated, physical hardware. No resource sharing with other customers."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "High Performance",
      description:
        "Latest generation Intel and AMD processors for maximum speed and computing power."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Enhanced Security",
      description:
        "Physical isolation provides an additional layer of security for your sensitive workloads."
    },
    {
      icon: <GitBranch className="h-6 w-6 text-primary" />,
      title: "Full Customization",
      description:
        "Configure your server exactly how you need it, from hardware to operating system."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Global Network",
      description:
        "Deploy your servers in multiple data centers across the globe for lower latency."
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-primary" />,
      title: "Rapid Provisioning",
      description:
        "Get your dedicated bare metal server online in minutes, not days or weeks."
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Engineered for Performance
          </h2>
          <p className="text-xl text-gray-600">
            Our bare metal servers provide the raw power, control, and security that high-performance applications demand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
            >
              <div className="p-3 bg-primary-50 inline-flex rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
