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
    description: "Essential smart devices for security and convenience in your villa.",
    devices: [
      {
        label: "Smart Sensor",
        costPerUnit: 2700,
        description: "Monitors motion and entry points.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 2,
          poojaRoom: 1,
          diningArea: 1,
          bedroom: 1,
          washroom: 1,
        },
      },
      {
        label: "Digital Doorlock",
        costPerUnit: 16500,
        description: "Keyless entry with PIN and biometric options.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 1,
          washroom: 0,
        },
      },
      {
        label: "Smart Inwall Switch",
        costPerUnit: 9000,
        description: "Control lights and appliances remotely.",
        quantityMultiplier: {
          tvArea: 2,
          hall: 3,
          poojaRoom: 1,
          diningArea: 2,
          bedroom: 2,
          washroom: 1,
        },
      },
      {
        label: "Video Doorbell",
        costPerUnit: 6700,
        description: "See and talk to visitors from anywhere.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 0,
          washroom: 0,
        },
      },
    ],
    optionalDevices: [
      {
        label: "Automated Blinds & Curtains",
        costPerUnit: 25000,
        description: "Remote control of window treatments.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 2,
          poojaRoom: 1,
          diningArea: 1,
          bedroom: 2,
          washroom: 0,
        },
      },
      {
        label: "Voice Assistant Device",
        costPerUnit: 6000,
        description: "Voice control for villa devices.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 1,
          poojaRoom: 1,
          diningArea: 1,
          bedroom: 1,
          washroom: 0,
        },
      },
    ],
  },
  standard: {
    label: "Standard Automation",
    description: "Advanced integration for comfort, security, and energy savings.",
    devices: [
      {
        label: "Smart Sensor",
        costPerUnit: 2700,
        description: "Comprehensive environment sensing.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 3,
          poojaRoom: 1,
          diningArea: 2,
          bedroom: 2,
          washroom: 1,
        },
      },
      {
        label: "Digital Doorlock",
        costPerUnit: 20000,
        description: "Enhanced security door locking.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 2,
          washroom: 0,
        },
      },
      {
        label: "Video Door Phone",
        costPerUnit: 22000,
        description: "Two-way video calling.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 0,
          washroom: 0,
        },
      },
      {
        label: "Smart Panel Module",
        costPerUnit: 11000,
        description: "Centralized control for automation.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 1,
          poojaRoom: 1,
          diningArea: 1,
          bedroom: 1,
          washroom: 1,
        },
      },
      {
        label: "Smart Thermostat",
        costPerUnit: 12000,
        description: "Efficient climate control.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 1,
          washroom: 0,
        },
      },
      {
        label: "Voice Assistant Device",
        costPerUnit: 6000,
        description: "Voice command integration.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 1,
          poojaRoom: 1,
          diningArea: 1,
          bedroom: 1,
          washroom: 0,
        },
      },
    ],
    optionalDevices: [
      {
        label: "Automated Blinds & Curtains",
        costPerUnit: 25000,
        description: "Motorized window treatments.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 2,
          poojaRoom: 1,
          diningArea: 2,
          bedroom: 2,
          washroom: 0,
        },
      },
      {
        label: "Smart Irrigation System",
        costPerUnit: 25000,
        description: "Automates garden watering.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 0,
          washroom: 0,
        },
      },
    ],
  },
  advanced: {
    label: "Advanced Automation",
    description: "Full integration with premium smart devices.",
    devices: [
      {
        label: "Smart Sensor",
        costPerUnit: 2700,
        description: "Comprehensive environment sensing.",
        quantityMultiplier: {
          tvArea: 2,
          hall: 4,
          poojaRoom: 1,
          diningArea: 3,
          bedroom: 3,
          washroom: 1,
        },
      },
      {
        label: "Digital Doorlock",
        costPerUnit: 44000,
        description: "Top-tier security solutions.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 3,
          washroom: 0,
        },
      },
      {
        label: "Video Door Phone",
        costPerUnit: 25000,
        description: "Premium communication with visitors.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 0,
          washroom: 0,
        },
      },
      {
        label: "Smart Panel Module",
        costPerUnit: 16000,
        description: "Advanced centralized control system.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 1,
          poojaRoom: 1,
          diningArea: 1,
          bedroom: 1,
          washroom: 1,
        },
      },
      {
        label: "Smart Thermostat",
        costPerUnit: 12000,
        description: "AI-driven temperature management.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 2,
          washroom: 0,
        },
      },
      {
        label: "Voice Assistant Device",
        costPerUnit: 6000,
        description: "Complete voice command hub.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 1,
          poojaRoom: 1,
          diningArea: 1,
          bedroom: 2,
          washroom: 0,
        },
      },
      {
        label: "Automated Blinds & Curtains",
        costPerUnit: 25000,
        description: "Motorized window treatments.",
        quantityMultiplier: {
          tvArea: 2,
          hall: 3,
          poojaRoom: 1,
          diningArea: 2,
          bedroom: 3,
          washroom: 0,
        },
      },
      {
        label: "Air Quality & Wellness Sensors",
        costPerUnit: 10000,
        description: "Monitor indoor air quality.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 1,
          washroom: 0,
        },
      },
      {
        label: "Smart RGB Lighting",
        costPerUnit: 3000,
        description: "Customizable ambient lighting.",
        quantityMultiplier: {
          tvArea: 2,
          hall: 3,
          poojaRoom: 1,
          diningArea: 2,
          bedroom: 3,
          washroom: 1,
        },
      },
    ],
    optionalDevices: [
      {
        label: "Smart Irrigation System",
        costPerUnit: 25000,
        description: "Fully automatic garden watering.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 0,
          washroom: 0,
        },
      },
      {
        label: "Automatic Water Tank Cutoff",
        costPerUnit: 1500,
        description: "Prevents water overflow.",
        quantityMultiplier: {
          tvArea: 0,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 0,
          washroom: 0,
        },
      },
      {
        label: "Smart Security Cameras",
        costPerUnit: 20000,
        description: "High-res video surveillance.",
        quantityMultiplier: {
          tvArea: 1,
          hall: 3,
          poojaRoom: 0,
          diningArea: 0,
          bedroom: 2,
          washroom: 0,
        },
      },
    ],
  },
};

const villaAreas = [
  { key: "tvArea", label: "TV Area" },
  { key: "hall", label: "Hall" },
  { key: "poojaRoom", label: "Pooja Room" },
  { key: "diningArea", label: "Dining Area" },
];

const EstimateVillaAutomation = () => {
  const [automationPackage, setAutomationPackage] = useState("");
  const [areas, setAreas] = useState({
    tvArea: 0,
    hall: 0,
    poojaRoom: 0,
    diningArea: 0,
    bedrooms: 0,
    washrooms: 0,
  });
  const [deviceQuantities, setDeviceQuantities] = useState({});
  const [optionalQuantities, setOptionalQuantities] = useState({});

  // Update areas input
  const handleAreaChange = (key, value) => {
    const val = Math.max(0, parseInt(value) || 0);
    setAreas((prev) => ({ ...prev, [key]: val }));
    setOptionalQuantities({});
  };

  // Calculate initial device quantities based on areas and automation package
  useEffect(() => {
    if (!automationPackage) {
      setDeviceQuantities({});
      return;
    }
    const pkg = automationPackages[automationPackage];
    const quantities = {};
    pkg.devices.forEach((device) => {
      let qty = 0;
      for (const [areaKey, count] of Object.entries(areas)) {
        if (
          (areaKey === "bedrooms" || areaKey === "washrooms") &&
          device.quantityMultiplier[areaKey] !== undefined
        ) {
          qty += count * device.quantityMultiplier[areaKey];
        } else if (device.quantityMultiplier[areaKey]) {
          qty += count * device.quantityMultiplier[areaKey];
        }
      }
      quantities[device.label] = qty;
    });
    setDeviceQuantities(quantities);
    setOptionalQuantities({});
  }, [automationPackage, areas]);

  // Increment/decrement included device quantity
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

  // Increment/decrement optional devices
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

  // Calculate total estimate
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
      <main className="max-w-4xl mx-auto p-6 sm:p-10 mt-16 bg-white rounded-xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Villa Automation Cost Calculator
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
              <h2 className="text-2xl font-semibold mb-4">Specify Villa Areas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {villaAreas.map(({ key, label }) => (
                  <div key={key}>
                    <label htmlFor={key} className="block font-medium mb-1 text-gray-700">
                      {label} (count)
                    </label>
                    <input
                      type="number"
                      id={key}
                      min={0}
                      value={areas[key]}
                      onChange={(e) => handleAreaChange(key, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
                      aria-label={`Number of ${label}`}
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="bedrooms" className="block font-medium mb-1 text-gray-700">
                    Number of Bedrooms
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    min={0}
                    value={areas.bedrooms}
                    onChange={(e) => handleAreaChange("bedrooms", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
                    aria-label="Number of Bedrooms"
                  />
                </div>
                <div>
                  <label htmlFor="washrooms" className="block font-medium mb-1 text-gray-700">
                    Number of Washrooms
                  </label>
                  <input
                    type="number"
                    id="washrooms"
                    min={0}
                    value={areas.washrooms}
                    onChange={(e) => handleAreaChange("washrooms", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
                    aria-label="Number of Washrooms"
                  />
                </div>
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

            
          </>
          
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
            <div>
               <section className="bg-gray-50 rounded-lg max-w-md mx-2 mt-4 p-6 font-sans border-t-4 border-black">
      <div className="mb-4">
        <Link href="/estimated-cost" className="inline-flex items-center gap-2  text-blue-600 px-4 py-2 rounded-md border-2 border-transparent hover:bg-blue-100 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ">
          <ArrowBigRight />
          Get Estimated cost for Smart Home
        </Link>
      </div>
      <div>
        <Link href="/estimated-cost-hotel-room" className="inline-flex items-center gap-2 text-blue-600 px-4 py-2 rounded-md border-2 border-transparent hover:bg-blue-100 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <ArrowBigRight />
          Get Estimated cost for Smart Hotel Room
        </Link>
      </div>
     </section>
            </div>
      </main>
      <Footer />
    </>
  );
};

export default EstimateVillaAutomation;
