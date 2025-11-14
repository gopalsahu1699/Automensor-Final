"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBigRight, Plus, Minus, Building2, Package, Check, IndianRupee } from "lucide-react";

const automationPackages = {
  basic: {
    label: "Basic",
    description: "Basic automation package with essential devices.",
    color: "from-blue-500 to-blue-600",
    icon: "🏡",
    devices: [
      {
        label: "Motion Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 2700,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 1, dressingRoom: 1, outdoorArea: 0,
        },
      },
      {
        label: "Wardrobe Sensor",
        description: "Auto on/off wardrobe light when open/close",
        costPerUnit: 1700,
        quantityMultiplier: {
          tvArea: 0, hall: 2, poojaRoom: 0, diningArea: 0, bedrooms: 1,
          dressingRoom: 2, washrooms: 0, outdoorArea: 0,
        },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 850,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 3, dressingRoom: 0,
        },
      },
      {
        label: "4M Inwall Module",
        description: "Controls power outlet devices.",
        costPerUnit: 9100,
        quantityMultiplier: {
          tvArea: 1, hall: 1, poojaRoom: 0, diningArea: 0, bedrooms: 1,
          washrooms: 1, outdoorArea: 0, dressingRoom: 1,
        },
      },
      {
        label: "8M Inwall Module",
        description: "Controls power outlet devices.",
        costPerUnit: 12700,
        quantityMultiplier: {
          tvArea: 1, hall: 2, poojaRoom: 1, diningArea: 1, bedrooms: 2,
          washrooms: 0, outdoorArea: 0, dressingRoom: 1,
        },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device",
        costPerUnit: 20500,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 0, dressingRoom: 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Video Door Bell",
        description: "Analog camera integrated door bell system",
        costPerUnit: 21000,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 0, dressingRoom: 0,
        },
        defaultQuantity: 1,
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description: "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
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
    color: "from-green-500 to-green-600",
    icon: "⭐",
    devices: [
      {
        label: "Motion Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 2700,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 1, outdoorArea: 0, dressingRoom: 2,
        },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 850,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 3, dressingRoom: 0,
        },
      },
      {
        label: "Touch Panel - 4M",
        description: "Controls power outlet devices.",
        costPerUnit: 9800,
        quantityMultiplier: {
          tvArea: 1, hall: 1, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 1, outdoorArea: 0, dressingRoom: 1,
        },
      },
      {
        label: "Touch Panel - 8M",
        description: "Controls power outlet devices.",
        costPerUnit: 14400,
        quantityMultiplier: {
          tvArea: 2, hall: 2, poojaRoom: 1, diningArea: 2, bedrooms: 3,
          washrooms: 0, outdoorArea: 0, dressingRoom: 2,
        },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device",
        costPerUnit: 26500,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 0, dressingRoom: 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Video Door Phone",
        description: "Analog camera integrated door bell system and display",
        costPerUnit: 19999,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 0, dressingRoom: 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Voice Assistant",
        description: "Control your smart home with voice command",
        costPerUnit: 6000,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 0, dressingRoom: 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Wardrobe Sensor",
        description: "Auto on/off wardrobe light when open/close",
        costPerUnit: 1700,
        quantityMultiplier: {
          tvArea: 0, hall: 2, poojaRoom: 0, diningArea: 0, bedrooms: 2,
          washrooms: 0, outdoorArea: 0, dressingRoom: 2,
        },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description: "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
        costPerUnit: 2000,
      },
      {
        label: "Curtain Open/Close System",
        description: "Automatically open/close curtain blinds",
        costPerUnit: 32000,
      },
    ],
  },
  advance: {
    label: "Advanced",
    description: "Full-featured advanced automation package.",
    color: "from-purple-500 to-purple-600",
    icon: "👑",
    devices: [
      {
        label: "Motion Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 2700,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 1, outdoorArea: 0, dressingRoom: 2,
        },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 850,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 4, dressingRoom: 0,
        },
      },
      {
        label: "Wardrobe Sensor",
        description: "Auto on/off wardrobe light when open/close",
        costPerUnit: 1700,
        quantityMultiplier: {
          tvArea: 0, hall: 2, poojaRoom: 0, diningArea: 0, bedrooms: 2,
          washrooms: 0, outdoorArea: 0, dressingRoom: 4,
        },
      },
      {
        label: "Touch Panel - 4M",
        description: "Controls power outlet devices.",
        costPerUnit: 12000,
        quantityMultiplier: {
          tvArea: 1, hall: 0, poojaRoom: 0, diningArea: 1, bedrooms: 1,
          washrooms: 1, outdoorArea: 0, dressingRoom: 2,
        },
      },
      {
        label: "Touch Panel - 8M",
        description: "Controls power outlet devices.",
        costPerUnit: 16300,
        quantityMultiplier: {
          tvArea: 2, hall: 3, poojaRoom: 1, diningArea: 1, bedrooms: 3,
          washrooms: 0, outdoorArea: 0, dressingRoom: 2,
        },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device",
        costPerUnit: 43500,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 0, dressingRoom: 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Video Door Phone",
        description: "Analog camera integrated door bell system and display",
        costPerUnit: 21000,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 0, dressingRoom: 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Voice Assistant",
        description: "Control your smart home with voice command",
        costPerUnit: 6000,
        quantityMultiplier: {
          tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0, bedrooms: 0,
          washrooms: 0, outdoorArea: 0, dressingRoom: 0,
        },
        defaultQuantity: 1,
      },
      {
        label: "Curtain Motor",
        description: "Automatically open/close curtain blinds",
        costPerUnit: 22000,
        quantityMultiplier: {
          tvArea: 0, hall: 2, poojaRoom: 0, diningArea: 0, bedrooms: 1,
          washrooms: 0, outdoorArea: 0, dressingRoom: 0,
        },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description: "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
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
  { key: "bedrooms", label: "Bedrooms" },
  { key: "washrooms", label: "Washrooms" },
  { key: "outdoorArea", label: "Outdoor Area" },
  { key: "dressingRoom", label: "Dressing Room" },
];

const EstimateVillaAutomation = () => {
  const [automationPackage, setAutomationPackage] = useState("");
  const [areas, setAreas] = useState({
    tvArea: 0, hall: 0, poojaRoom: 0, diningArea: 0,
    bedrooms: 0, washrooms: 0, outdoorArea: 0, dressingRoom: 0,
  });
  const [deviceQuantities, setDeviceQuantities] = useState({});

  const handleIncrement = (key) => {
    setAreas((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const handleDecrement = (key) => {
    setAreas((prev) => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }));
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
      Object.entries(areas).forEach(([areaKey, count]) => {
        if (device.quantityMultiplier[areaKey] !== undefined) {
          qty += count * device.quantityMultiplier[areaKey];
        }
      });
      quantities[device.label] = device.defaultQuantity && qty === 0 ? 1 : qty;
    });
    
    setDeviceQuantities(quantities);
  }, [automationPackage, areas]);

  const calculateEstimate = () => {
    if (!automationPackage) return 0;
    const pkg = automationPackages[automationPackage];
    let deviceCost = 0;
    pkg.devices.forEach((device) => {
      deviceCost += (deviceQuantities[device.label] || 0) * device.costPerUnit;
    });
    return deviceCost;
  };

  const hasAreas = Object.values(areas).some(val => val > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-6">
      <motion.section
        className="max-w-4xl mx-auto flex flex-col gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Building2 className="w-10 h-10 text-green-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Villa Automation
          </h1>
          <p className="text-lg text-gray-600 mx-auto max-w-xl">
            Select your package and specify villa areas to see what devices are included.
          </p>
        </div>

        {/* Package Selection */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Package</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {Object.entries(automationPackages).map(([key, pkg]) => (
              <motion.button
                key={key}
                onClick={() => setAutomationPackage(key)}
                className={`p-6 rounded-xl font-semibold transition-all text-center ${
                  automationPackage === key
                    ? `bg-gradient-to-r ${pkg.color} text-white shadow-lg scale-105`
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-4xl mb-2">{pkg.icon}</div>
                <div className="font-bold text-lg">{pkg.label}</div>
                <div className="text-xs opacity-90 mt-1">{pkg.description}</div>
              </motion.button>
            ))}
          </div>

          {/* Villa Areas - Always show when package is selected */}
          {automationPackage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t pt-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Villa Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {villaAreas.map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {label}
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(key)}
                        className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition"
                        aria-label={`Decrease ${label}`}
                      >
                        <Minus size={18} />
                      </button>
                      <span className="flex-1 text-center text-lg font-bold text-gray-900 bg-gray-100 rounded-lg py-2">
                        {areas[key]}
                      </span>
                      <button
                        onClick={() => handleIncrement(key)}
                        className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition"
                        aria-label={`Increase ${label}`}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Devices Section - Show only after package is selected */}
        {automationPackage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Included Devices */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Package className="w-6 h-6 text-green-600" />
                Included Devices
              </h3>
              <div className="space-y-4">
                {automationPackages[automationPackage].devices.map((device, idx) => (
                  <motion.div
                    key={device.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md border-l-4 border-green-600 transition"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        {device.label}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {device.description}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-green-600">
                        {deviceQuantities[device.label] || 0}
                      </div>
                      <div className="text-xs text-gray-600">units</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Optional Devices */}
            {automationPackages[automationPackage].optionalDevices.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Package className="w-5 h-5 text-purple-600" />
                  Optional Add-ons
                </h4>
                <div className="space-y-3">
                  {automationPackages[automationPackage].optionalDevices.map((device, idx) => (
                    <motion.div
                      key={device.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-600"
                    >
                      <div className="font-semibold text-gray-900 flex items-center gap-2">
                        <Package className="w-4 h-4 text-purple-600" />
                        {device.label}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {device.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-6 p-4 bg-gray-50 rounded-lg">
                  ℹ️ Contact us to add any of these optional devices to your package.
                </p>
              </div>
            )}

            {/* Total Estimated Cost */}
            {hasAreas ? (
              <motion.div
                className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-white"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <IndianRupee className="w-6 h-6" />
                    Total Estimated Cost
                  </h3>
                </div>
                <div className="text-5xl font-extrabold mb-4">
                  ₹{calculateEstimate().toLocaleString("en-IN")}
                </div>
                <p className="text-green-100 text-sm mb-6">
                  For your villa with {automationPackages[automationPackage].label} package including all selected areas. This is an estimated cost. Contact us for a personalized quotation and installation details.
                </p>
                <Link
                  href="/quotation"
                  className="inline-block w-full sm:w-auto bg-white text-green-600 font-bold py-3 px-8 rounded-xl text-center hover:bg-green-50 transition shadow-lg"
                >
                  Get Detailed Quotation
                </Link>
              </motion.div>
            ) : (
              <motion.div
                className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-white text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-lg font-semibold">
                  Add villa areas to see the estimated cost
                </p>
              </motion.div>
            )}

            {/* CTA Button */}
            <Link
              href="/quotation"
              className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl text-center hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition"
            >
              Get Quotation
            </Link>
          </motion.div>
        )}

        {/* Empty State */}
        {!automationPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">
              Select a package to see included devices
            </p>
          </motion.div>
        )}

        {/* Navigation Links */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/estimate-cost-calculator/estimated-cost-home"
            className="group block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition border-l-4 border-blue-600"
          >
            <div className="flex items-center gap-3 text-blue-600 font-bold group-hover:gap-4 transition-all">
              <ArrowBigRight className="w-6 h-6" />
              Smart Home
            </div>
            <p className="text-gray-600 text-sm mt-2">View smart home packages</p>
          </Link>

          <Link
            href="/estimate-cost-calculator/estimated-cost-hotel-room"
            className="group block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition border-l-4 border-purple-600"
          >
            <div className="flex items-center gap-3 text-purple-600 font-bold group-hover:gap-4 transition-all">
              <ArrowBigRight className="w-6 h-6" />
              Hotel Room
            </div>
            <p className="text-gray-600 text-sm mt-2">View hotel room packages</p>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default EstimateVillaAutomation;
