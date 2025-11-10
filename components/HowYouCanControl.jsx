import React from "react";
import {
  Hand,
  Smartphone,
  Mic,
  Radio,      // Use Radio instead of RemoteControl
  Watch,
} from "lucide-react";

const HowYouCanControl = () => {
  const controlMethods = [
    {
      icon: Hand,
      title: "Touch",
      description: "Smart touch panels for instant control",
    },
    {
      icon: Smartphone,
      title: "App",
      description: "Control from anywhere with our mobile app",
    },
    {
      icon: Mic,
      title: "Voice",
      description: "Compatible with Alexa, Google Assistant",
    },
    {
      icon: Radio,
      title: "Remote",
      description: "Universal remote for all devices",
    },
    {
      icon: Watch,
      title: "Smart Watch",
      description: "Quick access from your wrist",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-16 lg:px-32">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold mb-2">
          <span className="text-blue-600">HOW</span>
        </h2>
        <p className="text-3xl md:text-4xl text-gray-600 font-medium">
          YOU CAN CONTROL
        </p>
      </div>

      {/* Control Methods Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto">
        {controlMethods.map((method, index) => {
          const IconComponent = method.icon;
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border-2 border-gray-300 overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-xl p-6"
            >
              {/* Icon Container */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <IconComponent
                    size={96}
                    className="text-blue-600"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {method.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {method.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowYouCanControl;
