import React from "react";
import {
  Users,
  Award,
  Lightbulb,
  Leaf,
  Handshake,
  Factory,
  ClipboardCheck,
  Puzzle,
  Store,
  ShieldCheck,
} from "lucide-react";

const WhyAutomensor = () => {
  const keyValues = [
    {
      icon: Users,
      title: "Customer Centric Approach",
      description: "Every solution is designed with you in mind",
    },
    {
      icon: Award,
      title: "Quality",
      description: "Premium products meeting highest standards",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Cutting-edge technology for modern living",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Eco-friendly solutions for a greener future",
    },
    {
      icon: Handshake,
      title: "Trust",
      description: "Building lasting relationships with customers",
    },
  ];

  const differentiators = [
    {
      icon: Factory,
      title: "Manufacturing Unit",
      description: "In-house production ensuring quality control",
    },
    {
      icon: ClipboardCheck,
      title: "Reliable Support and Service",
      description: "24/7 assistance when you need it most",
    },
    {
      icon: Puzzle,
      title: "Customization Options",
      description: "Tailored solutions for your unique needs",
    },
    {
      icon: Store,
      title: "Wide Range of Products",
      description: "Complete ecosystem of smart devices",
    },
    {
      icon: ShieldCheck,
      title: "10 Year Warranty",
      description: "Long-term protection for your investment",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16 lg:px-32">
      {/* Why Automensor Section */}
      <section className="bg-blue-50 p-8 md:p-12 rounded-2xl mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-blue-600">
          Why Automensor?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {keyValues.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className="text-orange-600" size={32} strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="bg-white p-8 md:p-12 rounded-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-blue-600">
          What Makes Us Different
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {differentiators.map((diff, index) => {
            const IconComponent = diff.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  {diff.title === "10 Year Warranty" ? (
                    <div className="relative">
                      <ShieldCheck className="text-orange-600" size={32} strokeWidth={1.5} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-[6px] leading-none">
                          10
                        </span>
                      </div>
                    </div>
                  ) : (
                    <IconComponent className="text-orange-600" size={32} strokeWidth={1.5} />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {diff.title}
                  </h3>
                </div>
                <p className="text-gray-600">{diff.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default WhyAutomensor;
