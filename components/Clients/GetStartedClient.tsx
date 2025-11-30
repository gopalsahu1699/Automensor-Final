// components/Clients/GetStartedClient.tsx
'use client';

import { ArrowRight, Check, Zap, Shield, Leaf, Smartphone } from "lucide-react";

export default function GetStartedClient() {
  const scrollToSteps = () => {
    document.getElementById("steps")?.scrollIntoView({ behavior: "smooth" });
  };

  const goToContact = () => {
    window.location.href = "/contact-us";
  };

  const goToProducts = () => {
    window.location.href = "/all-products";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Start Your Smart Home Journey with autommensor
          </h1>
          <p className="text-lg sm:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Automate lights, fans, ACs, gates & more in minutes. Control everything from your phone or voice.
          </p>
          <button
            onClick={scrollToSteps}
            className="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-8 py-3 text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center"
          >
            Get Started Now 
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Why Automate? */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12">
            Why Automate Your Home?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-blue-600 mx-auto mb-4" />}
              title="Save Energy"
              description="Automatically turn off lights and fans when not needed. Reduce power bills with smart schedules and sensors."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-blue-600 mx-auto mb-4" />}
              title="Enhanced Safety"
              description="Control gates, lights, and appliances remotely. Get alerts and monitor your home from anywhere."
            />
            <FeatureCard
              icon={<Leaf className="h-10 w-10 text-blue-600 mx-auto mb-4" />}
              title="Eco-Friendly"
              description="Optimize usage of ACs, geysers, and lights. Contribute to a greener planet with efficient automation."
            />
            <FeatureCard
              icon={<Smartphone className="h-10 w-10 text-blue-600 mx-auto mb-4" />}
              title="Total Control"
              description="Control everything from your phone&apos;s, tablet&apos;s, or voice assistants like Alexa and Google Assistant."
            />
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section id="steps" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12">
            How to Get Started in 5 Simple Steps
          </h2>
          <div className="space-y-10 max-w-4xl mx-auto">
            <StepCard
              number={1}
              title="Plan Your Smart Upgrade"
              description="Decide which areas to automate first — lighting, fans, ACs, gates, or curtains. Start small (e.g., 1–2 rooms) and expand later."
            />
            <StepCard
              number={2}
              title="Choose Your autommensor Devices"
              description="Pick from our range of smart switches, controllers, and sensors that work with your existing wiring. No major rewiring needed."
            />
            <StepCard
              number={3}
              title="Set Up the Hub & App"
              description="Connect the autommensor hub to your Wi-Fi and install the autommensor app. Pair your devices in minutes."
            />
            <StepCard
              number={4}
              title="Install & Pair Devices"
              description="A local electrician can install the devices in your switchboard. Then pair each device with the app and name them (e.g., &apos;Bedroom Lights&apos;)."
            />
            <StepCard
              number={5}
              title="Create Scenes & Schedules"
              description="Set up scenes like &apos;Good Morning&apos; (open curtains, turn on lights) and schedules (turn off all lights at 11 PM)."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12">
            How autommensor Works
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Simple & Reliable Technology
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Hybrid Wi-Fi + RF for fast, reliable control even if internet is down.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Retrofit-friendly: works with existing switches and wiring.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Control from anywhere via the autommensor app.</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Works with Alexa, Google Assistant, and more.</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Typical Setup</h3>
              <p className="text-gray-700 mb-4 space-y-1">
                <span>1. Smart controller module in your switchboard.</span>
                <span>2. autommensor hub connected to Wi-Fi.</span>
                <span>3. autommensor app on your phone.</span>
                <span>4. Optional: smart touch panels or wireless switches.</span>
              </p>
              <p className="text-sm text-gray-600">
                For new constructions, we also support centralized wiring for a clean, scalable setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Automate Your Home?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Whether you&apos;re a homeowner, builder, or dealer, we&apos;ll guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goToContact}
              className="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Talk to an Expert
            </button>
            <button
              onClick={goToProducts}
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-md transition-all duration-200"
            >
              Browse Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Pure CSS Feature Card - NO UI LIBRARY
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// Pure CSS Step Card - NO UI LIBRARY
function StepCard({ number, title, description }) {
  return (
    <div className="flex gap-6 items-start bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
