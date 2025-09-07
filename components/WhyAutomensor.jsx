import React from "react";

function WhyAutomensor() {
  const benefits = [
    {
      title: "Personalized Automation with AI & Voice Control",
      desc: "Experience hands-free, adaptive smart home control using voice assistants and AI-driven automation.",
    },
    {
      title: "Sleek & Intuitive User Interface",
      desc: "Simplify management of your smart devices with a modern, mobile-inspired UI offering seamless experiences across platforms.",
    },
    {
      title: "Security-First Design Philosophy",
      desc: "Protect your home through encrypted communications, secure containers, and easy over-the-air updates.",
    },
    {
      title: "Advanced Energy Management",
      desc: "Save money by monitoring and optimizing energy use in real time across all connected devices.",
    },
    {
      title: "Rapid Deployment & Integration",
      desc: "Accelerate development timelines with reusable components and UI kits that ensure consistent branding and streamlined builds.",
    },
    {
      title: "Reliable Customer Support & Continuous Improvement",
      desc: "Count on dedicated support teams paired with ongoing software updates to keep your smart home cutting-edge.",
    },
  ];

  return (
    <section id="benefits" className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 border-b-4 border-blue-400 pb-2 max-w-md mx-auto drop-shadow-sm">
          Why Choose Automensor?
        </h2>
        <p className="max-w-4xl mx-auto text-center text-black mb-16 text-lg leading-relaxed">
          Discover the smart home solutions designed for convenience, security, and energy efficiency.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition duration-300 ease-in-out"
              tabIndex={0}
              aria-label={benefit.title}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-700">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyAutomensor;
