import React from "react";

function MarketNeed() {
  const needs = [
    {
      title: "Easy Connection of Different Devices",
      desc: "Smart homes bring all your gadgets together so they work smoothly without complicated setups.",
    },
    {
      title: "Simple Controls Everyone Can Use",
      desc: "Think of it as having phone-like controls for your home, letting you manage lights, temperature, and security easily from anywhere.",
    },
    {
      title: "Grow and Change as You Need",
      desc: "Start small and add more smart features over time without hassle or big expenses.",
    },
    {
      title: "Save Money by Using Energy Wisely",
      desc: "Smart systems help cut your electricity bills by managing power use smartly and automatically.",
    },
    {
      title: "Feel Safer with Smart Security",
      desc: "Get real-time alerts and keep your home protected with smart cameras, locks, and sensors working together.",
    },
    {
      title: "Hands-Free Life with Voice & AI",
      desc: "Control your home using your voice or intelligent assistants that learn your habits and make life easier.",
    },
  ];

  return (
    <section id="needs" className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-orange-600">
          Why Smart Homes Are the Future We All Need
        </h2>
        <p className="max-w-3xl mx-auto text-center text-gray-700 mb-12 text-lg">
          The world is changing and so is the way we live. Smart automation is no longer a luxury—it’s becoming essential for comfort, security, and saving money in every home. It’s time to embrace this change and upgrade your lifestyle.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {needs.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-green-600">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketNeed;
