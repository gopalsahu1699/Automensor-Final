import React from "react";

function MarketNeed() {
  const needs = [
    {
      title: "Feel Safer with Smart Security",
      desc: "Stay connected and protected with real-time alerts from smart cameras, locks, and sensors working together seamlessly.",
    },
    {
      title: "Hands-Free Living with Voice & AI",
      desc: "Effortlessly control your home using voice commands or intelligent assistants that learn and adapt to your lifestyle.",
    },
    {
      title: "Effortless Device Integration",
      desc: "Connect all your smart devices in one place for smooth, hassle-free control without complicated setup.",
    },
    {
      title: "Intuitive Controls for Everyone",
      desc: "Manage lighting, climate, and security with simple, phone-like controls accessible from anywhere.",
    },
    {
      title: "Scalable to Fit Your Needs",
      desc: "Start small and easily expand your smart home with more features over time—no big expenses or hassle.",
    },
    {
      title: "Cut Costs with Smart Energy Use",
      desc: "Automatically optimize power usage to save money and reduce your environmental impact.",
    },
  ];

  return (
    <section id="needs" className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-900 border-b-4 border-blue-400 pb-2 max-w-md mx-auto drop-shadow-sm">
          Why Smart Homes Are the Future
        </h2>
        <p className="max-w-4xl mx-auto text-center text-gray-700 mb-16 text-lg leading-relaxed">
          Upgrade your lifestyle with smart technology.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {needs.map((item, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition duration-300 ease-in-out"
              tabIndex={0}
              aria-label={item.title}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-700">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketNeed;
