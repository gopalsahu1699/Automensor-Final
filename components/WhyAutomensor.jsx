import React from "react";

function WhyAutomensor() {
  const benefits = [
    {
      title: "Seamless Unified Connectivity",
      desc: "Connect and control all your smart devices effortlessly with support for Zigbee, Wi-Fi, BLE, Thread, and more, ensuring full compatibility and flexibility.",
    },
    {
      title: "Highly Modular and Scalable Architecture",
      desc: "Easily expand or customize your system’s features anytime without extensive rewrites, enabling future-proof smart home solutions.",
    },
    {
      title: "Sleek & Intuitive User Interface",
      desc: "Delight users with modern, mobile-inspired UIs that simplify smart device management and provide a seamless experience across platforms.",
    },
    {
      title: "Security-First Design Philosophy",
      desc: "Protect your home with industry-leading encrypted communications, secure containers, and hassle-free over-the-air updates to keep your system safe.",
    },
    {
      title: "Advanced Energy Management",
      desc: "Save on utility bills by intelligently monitoring and optimizing energy use across all connected devices with real-time analytics.",
    },
    {
      title: "Rapid Deployment & Integration",
      desc: "Accelerate your project timelines with reusable components and UI kits, offering consistent branding and streamlined development.",
    },
    {
      title: "Personalized Automation with AI & Voice Control",
      desc: "Enhance convenience by integrating voice assistants and AI-driven automation for truly hands-free, adaptive smart home control.",
    },
    {
      title: "Reliable Customer Support & Continuous Improvement",
      desc: "Benefit from dedicated support teams and ongoing software enhancements ensuring your smart home stays cutting-edge and reliable.",
    },
  ];

  return (
    <section id="benefits" className="bg-white py-16">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-4xl font-extrabold mb-6 text-orange-600">
          Why Choose Automensor for Your Smart Home?
        </h2>
        <p className="max-w-3xl mx-auto mb-16 text-gray-700 text-lg">
          Automensor combines cutting-edge technology, modular design, and seamless integration to transform your living space into a secure, energy-efficient, and fully connected smart environment. Discover how our platform empowers homeowners and businesses to embrace the future of automation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transform hover:scale-105 transition"
            >
              <h3 className="font-semibold text-lg mb-3 text-green-600">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyAutomensor;
