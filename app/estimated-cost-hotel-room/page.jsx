"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowBigRight } from "lucide-react";

const automationPackages = {
  basic: {
  label: "Basic Automation",
  description: "Essential smart devices tailored for hotel rooms.",
  devices: [
    {
      label: "Smart Sensor",
      costPerUnit: 2500,
      description: "Detects guest presence and room entry.",
      quantityLogic: (areas) => areas.washrooms, // sensors only increase with washrooms
    },
    {
      label: "Digital Doorlock",
      costPerUnit: 15000,
      description: "Secure keyless entry system.",
      quantityLogic: () => 1, // always 1
    },
    {
      label: "Smart Panel Module",
      costPerUnit: 9000,
      description: "Centralized room control.",
      quantityLogic: (areas) => areas.rooms, // panels only increase with rooms
    },
    {
      label: "Video Door Phone",
      costPerUnit: 6500,
      description: "Monitor visitor access.",
      quantityLogic: () => 1, // always 1
    },
  ],
  optionalDevices: [
    {
      label: "Automated Blinds & Curtains",
      costPerUnit: 23000,
      description: "Remote-controlled window treatments.",
      quantityLogic: () => 1, // optional devices scale with rooms
    },
    {
      label: "Voice Assistant Device",
      costPerUnit: 5500,
      description: "Voice control for smart room devices.",
      quantityLogic: () => 1,
    },
  ],
},

  standard: {
    label: "Standard Automation",
    description: "Enhanced features for comfort and security.",
    devices: [
      {
        label: "Smart Sensor",
        costPerUnit: 2500,
        description: "Guest presence and environmental monitoring.",
        quantityLogic: (areas) => areas.washrooms,
      },
      {
        label: "Digital Doorlock",
        costPerUnit: 18000,
        description: "Advanced keyless security system.",
        quantityLogic: () => 1,
      },
      {
        label: "Video Door Phone",
        costPerUnit: 21000,
        description: "Two-way video communication.",
        quantityLogic: () => 1,
      },
      {
        label: "Smart Panel Module",
        costPerUnit: 11000,
        description: "Centralized room control.",
        quantityLogic: (areas) => areas.rooms,
      },
      {
        label: "Smart Thermostat",
        costPerUnit: 11500,
        description: "Efficient climate management.",
        quantityLogic: (areas) => areas.rooms,
      },
      {
        label: "Voice Assistant Device",
        costPerUnit: 5500,
        description: "Voice activation hub.",
        quantityLogic: (areas) => areas.rooms,
      },
    ],
    optionalDevices: [
      {
        label: "Automated Blinds & Curtains",
        costPerUnit: 23000,
        description: "Motorized window coverings.",
        quantityLogic: () => 1,
      },
      {
        label: "Smart Irrigation System",
        costPerUnit: 25000,
        description: "Automate external watering.",
        quantityLogic: () => 1, // not applicable
      },
    ],
  },
  advanced: {
    label: "Advanced Automation",
    description: "Comprehensive smart room integration.",
    devices: [
      {
        label: "Smart Sensor",
        costPerUnit: 2500,
        description: "Advanced environmental and presence sensing.",
        quantityLogic: (areas) => areas.washrooms,
      },
      {
        label: "Digital Doorlock",
        costPerUnit: 40000,
        description: "High-security access control.",
        quantityLogic: () => 1,
      },
      {
        label: "Video Door Phone",
        costPerUnit: 24000,
        description: "Premium video intercom.",
        quantityLogic: () => 1,
      },
      {
        label: "Smart Panel Module",
        costPerUnit: 15000,
        description: "Advanced control center.",
        quantityLogic: (areas) => areas.rooms,
      },
      {
        label: "Smart Thermostat",
        costPerUnit: 11500,
        description: "AI-enhanced climate control.",
        quantityLogic: (areas) => areas.rooms,
      },
      {
        label: "Voice Assistant Device",
        costPerUnit: 5500,
        description: "Voice command control system.",
        quantityLogic: () => 1,
      },
      {
        label: "Automated Blinds & Curtains",
        costPerUnit: 23000,
        description: "Motorized blinds and curtains.",
        quantityLogic: (areas) => areas.rooms 
      },
      {
        label: "Air Quality & Wellness Sensors",
        costPerUnit: 9500,
        description: "Indoor air quality monitoring.",
        quantityLogic: (areas) => areas.rooms,
      },
    
    ],
    optionalDevices: [
          {
        label: "Smart RGB Lighting",
        costPerUnit: 2800,
        description: "Ambiance lighting system.",
        quantityLogic: () => 0,
      },
      {
        label: "Smart Irrigation System",
        costPerUnit: 25000,
        description: "Automated outdoor watering.",
        quantityLogic: () => 0,
      },
      {
        label: "Automatic Water Tank Cutoff",
        costPerUnit: 1400,
        description: "Overflow prevention system.",
        quantityLogic: () => 0,
      },
      {
        label: "Smart Security Cameras",
        costPerUnit: 20000,
        description: "High resolution security cameras.",
        quantityLogic: () => 0,
      },
    ],
  },
};

const hotelRoomAreas = [
  { key: "rooms", label: "Number of Rooms" },
  { key: "washrooms", label: "Number of Washrooms" },
];

const HotelRoomAutomation = () => {
  const [automationPackage, setAutomationPackage] = useState("");
  const [areas, setAreas] = useState({ rooms: 0, washrooms: 0 });
  const [deviceQuantities, setDeviceQuantities] = useState({});
  const [optionalQuantities, setOptionalQuantities] = useState({});

  // Update areas input
  const handleAreaChange = (key, value) => {
    const val = Math.max(0, parseInt(value) || 0);
    setAreas((prev) => ({ ...prev, [key]: val }));
    setOptionalQuantities({});
  };

  // Calculate device quantities based on updated logic
  useEffect(() => {
    if (!automationPackage) {
      setDeviceQuantities({});
      return;
    }
    const pkg = automationPackages[automationPackage];
    const newQuantities = {};
    pkg.devices.forEach((device) => {
      newQuantities[device.label] = device.quantityLogic
        ? device.quantityLogic(areas)
        : 0;
    });
    setDeviceQuantities(newQuantities);
    setOptionalQuantities({});
  }, [automationPackage, areas]);

  const incrementDevice = (label) => {
    setDeviceQuantities((prev) => ({
      ...prev,
      [label]: (prev[label] || 0) + 1,
    }));
  };

  const decrementDevice = (label) => {
    setDeviceQuantities((prev) => ({
      ...prev,
      [label]: Math.max((prev[label] || 0) - 1, 0),
    }));
  };

  const incrementOptional = (label) => {
    setOptionalQuantities((prev) => ({
      ...prev,
      [label]: (prev[label] || 0) + 1,
    }));
  };

  const decrementOptional = (label) => {
    setOptionalQuantities((prev) => ({
      ...prev,
      [label]: Math.max((prev[label] || 0) - 1, 0),
    }));
  };

  const calculateEstimate = () => {
    if (!automationPackage) return 0;
    const pkg = automationPackages[automationPackage];
    let deviceCost = 0;
    pkg.devices.forEach((device) => {
      deviceCost += (deviceQuantities[device.label] || 0) * device.costPerUnit;
    });
    let optionalCost = 0;
    pkg.optionalDevices.forEach((device) => {
      optionalCost += (optionalQuantities[device.label] || 0) * device.costPerUnit;
    });
    return deviceCost + optionalCost;
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const QuantityControl = ({ label, quantity, onIncrement, onDecrement }) => (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= 0}
        className="w-8 h-8 bg-gray-200 rounded-md disabled:opacity-50"
        aria-label={`Decrease quantity of ${label}`}
      >
        -
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        type="button"
        onClick={onIncrement}
        className="w-8 h-8 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        aria-label={`Increase quantity of ${label}`}
      >
        +
      </button>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto p-6 sm:p-10 mt-16 bg-white rounded-xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Hotel Room Automation Cost Calculator
        </h1>

        <section className="mb-8 space-y-6">
          <label
            htmlFor="automationPackage"
            className="block mb-3 font-semibold text-lg text-gray-800"
          >
            Select Automation Package
          </label>
          <select
            id="automationPackage"
            value={automationPackage}
            onChange={(e) => setAutomationPackage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
            aria-label="Select automation package"
          >
            <option value="">Choose a package</option>
            {Object.entries(automationPackages).map(([key, pkg]) => (
              <option key={key} value={key}>
                {pkg.label}
              </option>
            ))}
          </select>
          {automationPackage && (
            <p className="mt-2 text-gray-600">{automationPackages[automationPackage].description}</p>
          )}
        </section>

        {automationPackage && (
          <>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Specify Room Details</h2>
              <div className="grid grid-cols-1 gap-6">
                {hotelRoomAreas.map(({ key, label }) => (
                  <div key={key}>
                    <label htmlFor={key} className="block font-medium mb-1 text-gray-700">
                      {label}
                    </label>
                    <input
                      type="number"
                      id={key}
                      min={0}
                      value={areas[key]}
                      onChange={(e) => handleAreaChange(key, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
                      aria-label={`Enter ${label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            </section>

            <motion.section
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="mb-10"
            >
              <h2 className="text-2xl font-semibold mb-4">Included Devices</h2>
              <div className="space-y-6">
                {automationPackages[automationPackage].devices.map((device) => (
                  <motion.div
                    key={device.label}
                    variants={itemVariants}
                    className="flex justify-between items-center border-b border-gray-200 pb-4"
                  >
                    <div>
                      <p className="font-medium">{device.label}</p>
                      <p className="text-sm text-gray-600">{device.description}</p>
                    </div>
                    <QuantityControl
                      label={device.label}
                      quantity={deviceQuantities[device.label] || 0}
                      onIncrement={() => incrementDevice(device.label)}
                      onDecrement={() => decrementDevice(device.label)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {automationPackages[automationPackage].optionalDevices.length > 0 && (
              <motion.section
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="mb-10"
              >
                <h2 className="text-2xl font-semibold mb-4">Optional Devices</h2>
                <div className="space-y-6">
                  {automationPackages[automationPackage].optionalDevices.map((device) => (
                    <motion.div
                      key={device.label}
                      variants={itemVariants}
                      className="flex justify-between items-center border-b border-gray-200 pb-4"
                    >
                      <div>
                        <p className="font-medium">{device.label}</p>
                        <p className="text-sm text-gray-600">{device.description}</p>
                      </div>
                      <QuantityControl
                        label={device.label}
                        quantity={optionalQuantities[device.label] || 0}
                        onIncrement={() => incrementOptional(device.label)}
                        onDecrement={() => decrementOptional(device.label)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            <section className="text-center">
              <p className="text-3xl font-bold text-gray-900">Estimated Cost</p>
              <p className="text-5xl font-extrabold text-orange-600 mt-4 drop-shadow-lg">
                ₹{calculateEstimate().toLocaleString()}
              </p>
              <p className="mt-3 text-gray-600 max-w-md mx-auto text-sm">
                This estimate includes your selected package and optional devices.
                Contact us for a detailed, personalized plan.
              </p>
              <div className="mt-8">
                <Link
                  href="/quotation"
                  className="inline-block bg-orange-600 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-orange-700 transition"
                  aria-label="Request a personalized quotation"
                >
                  Request a Quotation
                </Link>
              </div>
              
            </section>
          
          </>
          
        )}
        <section className="bg-gray-50 rounded-lg max-w-md mx-auto p-6 font-sans">
      <div className="mb-4">
        <Link href="/estimate-cost" className="inline-flex items-center gap-2 font-semibold text-blue-600 px-4 py-2 rounded-md border-2 border-transparent hover:bg-blue-100 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <ArrowBigRight />
          Get Estimated cost for  Smart Home
        </Link>
      </div>
      <div>
        <Link href="/estimated-cost-villa" className="inline-flex items-center gap-2 font-semibold text-blue-600 px-4 py-2 rounded-md border-2 border-transparent hover:bg-blue-100 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <ArrowBigRight />
          Get Estimated cost for  Smart Villa
        </Link>
      </div>
    </section>
      </main>
      <Footer />
    </>
  );
};

export default HotelRoomAutomation;
