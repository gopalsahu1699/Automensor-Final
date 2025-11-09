"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowBigRight, Plus, Minus } from "lucide-react";

const automationPackages = {
  basic: {
    label: "Basic",
    description: "Basic automation package with essential devices.",
    devices: [
      {
        label: "Motion Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 2700,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 1,
          dressingRoom : 1,
          outdoorArea: 0,
        },
      },
      {
        label: "Wardrobe Sensor",
        description: "Auto on/off wardrobe light when open/close",
        costPerUnit: 1700,
        quantityMultiplier: {
          tvArea: 0,
          hall: 2,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 1,
          dressingRoom : 2,
          washrooms: 0,
          outdoorArea: 0,
        },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 640,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 3,
           dressingRoom : 0,
        },
      },
      {
        label: "4m Inwall Module",
        description: "Controls power outlet devices.",
        costPerUnit: 9100,
        quantityMultiplier: {
          tvArea: 1,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 1,
          washrooms: 1,
          outdoorArea: 0,
           dressingRoom : 1,
        },
      },
      {
        label: "8m Inwall Module",
        description: "Controls power outlet devices.",
        costPerUnit: 12700,
        quantityMultiplier: {
          tvArea: 1,
          hall: 2,
          poojaRoom: 1,
          diningArea: 1,
          bedrooms: 2,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 1,
        },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device",
        costPerUnit: 20500,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 0,
          dressingRoom : 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Video Door Bell",
        description: "Analog camera integrated door bell system",
        costPerUnit: 21000,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 0,
        },
        defaultQuantity: 1,
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description:
          "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
        costPerUnit: 3000,
      },
      {
        label: "Voice Assistant",
        description: "Control your smart home with voice command",
        costPerUnit: 6000,
      },
    ],
  },
  standard: {
    label: "Standard",
    description: "Standard package with extended devices.",
    devices: [
      {
        label: "Motion Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 2700,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 1,
          outdoorArea: 0,
           dressingRoom : 2,
        },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 640,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 3,
           dressingRoom : 0,
        },
      },
      {
        label: "Touch Panel - 4M",
        description: "Controls power outlet devices.",
        costPerUnit: 9800,
        quantityMultiplier: {
          tvArea: 1,
          hall: 1,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 1,
          outdoorArea: 0,
           dressingRoom : 1,
        },
      },
      {
        label: "Touch Panel - 8M",
        description: "Controls power outlet devices.",
        costPerUnit: 14400,
        quantityMultiplier: {
          tvArea: 2,
          hall: 2,
          poojaRoom: 1,
          diningArea: 2,
          bedrooms: 3,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 2,
        },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device",
        costPerUnit: 26500,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Video Door phone",
        description: "Analog camera integrated door bell system and display",
        costPerUnit: 19999,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Voice Assistant",
        description: "Control your smart home with voice command",
        costPerUnit: 6000,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Wardrobe Sensor",
        description: "Auto on/off wardrobe light when open/close",
        costPerUnit: 1700,
        quantityMultiplier: {
          tvArea: 0,
          hall: 2,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 2,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 2,
        },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description:
          "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
        costPerUnit: 2000,
      },
      {
        label: "Curtain open/close system",
        description: "Automatically open/close curtain blinds",
        costPerUnit: 32000,
      },
    ],
  },
  advance: {
    label: "Advance",
    description: "Full-featured advanced automation package.",
    devices: [
      {
        label: "Motion Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 2700,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 1,
          outdoorArea: 0,
           dressingRoom : 2,
        },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 640,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 4,
           dressingRoom : 0,
        },
      },
      {
        label: "Wardrobe Sensor",
        description: "Auto on/off wardrobe light when open/close",
        costPerUnit: 1700,
        quantityMultiplier: {
          tvArea: 0,
          hall: 2,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 2,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 4,
        },
      },
      {
        label: "Touch Panel - 4M",
        description: "Controls power outlet devices.",
        costPerUnit: 12000,
        quantityMultiplier: {
          tvArea: 1,
          hall: 0,
          poojaRoom: 0,
          diningArea: 1,
          bedrooms: 1,
          washrooms: 1,
          outdoorArea: 0,
           dressingRoom : 2,
        },
      },
      {
        label: "Touch Panel - 8M",
        description: "Controls power outlet devices.",
        costPerUnit: 16300,
        quantityMultiplier: {
          tvArea: 2,
          hall: 3,
          poojaRoom: 1,
          diningArea: 1,
          bedrooms: 3,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 2,
        },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device",
        costPerUnit: 43500,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Video Door phone",
        description: "Analog camera integrated door bell system and display",
        costPerUnit: 21000,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Voice Assistant",
        description: "Control your smart home with voice command",
        costPerUnit: 6000,
        quantityMultiplier: {
          tvArea: 0,
          hall: 0,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 0,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Curtain Motor",
        description: "Automatically open/close curtain blinds",
        costPerUnit: 32000,
        quantityMultiplier: {
          tvArea: 0,
          hall: 2,
          poojaRoom: 0,
          diningArea: 0,
          bedrooms: 1,
          washrooms: 0,
          outdoorArea: 0,
           dressingRoom : 0,
        },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description:
          "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
        costPerUnit: 2000,
      },
      {
        label: "Smart Lighting Control",
        description: "Smart lighting control with scene creation",
        costPerUnit: 0,
      },
    ],
  },
};

const villaAreas = [
  { key: "tvArea", label: "TV Area" },
  { key: "hall", label: "Hall" },
  { key: "poojaRoom", label: "Pooja Room" },
  { key: "diningArea", label: "Dining Area" },
  { key: "outdoorArea", label: "Outdoor Area" },
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
    outdoorArea: 0,
  });
  const [deviceQuantities, setDeviceQuantities] = useState({});
  const [optionalQuantities, setOptionalQuantities] = useState({});

  const handleIncrement = (key) => {
    setAreas((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    setOptionalQuantities({});
  };

  const handleDecrement = (key) => {
    setAreas((prev) => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }));
    setOptionalQuantities({});
  };

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
        if (device.quantityMultiplier[areaKey] !== undefined) {
          qty += count * device.quantityMultiplier[areaKey];
        }
      }
      quantities[device.label] = device.defaultQuantity && qty === 0 ? 1 : qty;
    });
    setDeviceQuantities(quantities);
    setOptionalQuantities({});
  }, [automationPackage, areas]);

  const calculateEstimate = () => {
    if (!automationPackage) return 0;
    const pkg = automationPackages[automationPackage];
    let deviceCost = 0;
    pkg.devices.forEach((device) => {
      deviceCost += (deviceQuantities[device.label] || 0) * device.costPerUnit;
    });
    let optionalCost = 0;
    pkg.optionalDevices.forEach((device) => {
      optionalCost +=
        (optionalQuantities[device.label] || 0) * device.costPerUnit;
    });
    return deviceCost + optionalCost;
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <main className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-10 sm:p-12">
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
            <p className="mt-2 text-gray-600">
              {automationPackages[automationPackage].description}
            </p>
          )}
        </section>

        {automationPackage && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Specify Villa Areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {villaAreas.map(({ key, label }) => (
                <div key={key}>
                  <label className="block font-medium mb-2 text-gray-700">
                    {label}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrement(key)}
                      className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label={`Decrease ${label}`}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-16 text-center text-xl font-semibold text-gray-900">
                      {areas[key]}
                    </span>
                    <button
                      onClick={() => handleIncrement(key)}
                      className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-400"
                      aria-label={`Increase ${label}`}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              ))}
              <div>
                <label className="block font-medium mb-2 text-gray-700">
                  Number of Bedrooms
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrement("bedrooms")}
                    className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                    aria-label="Decrease bedrooms"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-16 text-center text-xl font-semibold text-gray-900">
                    {areas.bedrooms}
                  </span>
                  <button
                    onClick={() => handleIncrement("bedrooms")}
                    className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-label="Increase bedrooms"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700">
                  Number of Washrooms
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrement("washrooms")}
                    className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                    aria-label="Decrease washrooms"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-16 text-center text-xl font-semibold text-gray-900">
                    {areas.washrooms}
                  </span>
                  <button
                    onClick={() => handleIncrement("washrooms")}
                    className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-label="Increase washrooms"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {automationPackage && (
          <>
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
                      <p className="text-sm text-gray-600">
                        {device.description}
                      </p>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      Qty: {deviceQuantities[device.label] || 0}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {automationPackages[automationPackage].optionalDevices.length >
              0 && (
              <motion.section
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                className="mb-10"
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Optional Devices
                </h2>
                <div className="space-y-6">
                  {automationPackages[automationPackage].optionalDevices.map(
                    (device) => (
                      <motion.div
                        key={device.label}
                        variants={itemVariants}
                        className="flex justify-between items-center border-b border-gray-200 pb-4"
                      >
                        <div>
                          <p className="font-medium">{device.label}</p>
                          <p className="text-sm text-gray-600">
                            {device.description}
                          </p>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          Qty: {optionalQuantities[device.label] || 0}
                        </div>
                      </motion.div>
                    )
                  )}
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

        <section className="bg-gray-50 rounded-lg max-w-md mx-auto mt-10 p-6 font-sans border-black border-t-4">
          <div className="mb-4">
            <Link
              href="/estimate-cost-calculator/estimated-cost-home"
              className="inline-flex items-center gap-2 text-blue-600 px-4 py-2 rounded-md border-2 border-transparent hover:bg-blue-100 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <ArrowBigRight />
              Get Estimated cost for Smart Home
            </Link>
          </div>
          <div>
            <Link
              href="/estimate-cost-calculator/estimated-cost-hotel-room"
              className="inline-flex items-center gap-2 text-blue-600 px-4 py-2 rounded-md border-2 border-transparent hover:bg-blue-100 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <ArrowBigRight />
              Get Estimated cost for Smart Hotel Room
            </Link>
          </div>
        </section>
      </main>
    </section>
  );
};

export default EstimateVillaAutomation;
