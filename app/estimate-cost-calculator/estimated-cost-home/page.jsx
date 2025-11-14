"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBigRight, Calculator, Home, Package, Check, IndianRupee } from "lucide-react";

const automationPackages = {
  basic: {
    label: "Basic",
    description: "Basic automation package with essential devices.",
    color: "from-blue-500 to-blue-600",
    icon: "🏠",
    devices: [
      {
        label: "Motion Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 2700,
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 850,
        quantityMultiplier: { "1bhk": 2, "2bhk": 2, "3bhk": 3 },
      },
      {
        label: "Wardrobe Sensor",
        description: "Controls power outlet devices",
        costPerUnit: 1900,
        quantityMultiplier: { "1bhk": 1, "2bhk": 2, "3bhk": 3 },
      },
      {
        label: "4M Inwall Module",
        description: "Controls power outlet devices.",
        costPerUnit: 9100,
        quantityMultiplier: { "1bhk": 3, "2bhk": 5, "3bhk": 6 },
      },
      {
        label: "8M Inwall Module",
        description: "Controls power outlet devices.",
        costPerUnit: 12700,
        quantityMultiplier: { "1bhk": 4, "2bhk": 6, "3bhk": 8 },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device",
        costPerUnit: 20500,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Ring Video Door Bell",
        description: "Analog camera integrated door bell system",
        costPerUnit: 21000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description: "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
        costPerUnit: 3000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "WiFi: Jio/Airtel",
        description: "Wireless network system",
        costPerUnit: 0,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
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
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 850,
        quantityMultiplier: { "1bhk": 2, "2bhk": 2, "3bhk": 3 },
      },
      {
        label: "Wardrobe Sensor",
        description: "Controls power outlet devices",
        costPerUnit: 1900,
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "Touch Panel - 4M",
        description: "Controls power outlet devices.",
        costPerUnit: 9800,
        quantityMultiplier: { "1bhk": 3, "2bhk": 5, "3bhk": 6 },
      },
      {
        label: "Touch Panel - 8M",
        description: "Controls power outlet devices.",
        costPerUnit: 14400,
        quantityMultiplier: { "1bhk": 4, "2bhk": 6, "3bhk": 8 },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device",
        costPerUnit: 26500,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Video Door Phone",
        description: "Analog camera integrated door bell system and display",
        costPerUnit: 19999,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description: "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
        costPerUnit: 2000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Voice Assistant",
        description: "Control your smart home with voice command",
        costPerUnit: 6000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
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
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 850,
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 3 },
      },
      {
        label: "Wardrobe Sensor",
        description: "Controls power outlet devices",
        costPerUnit: 1900,
        quantityMultiplier: { "1bhk": 3, "2bhk": 5, "3bhk": 7 },
      },
      {
        label: "Touch Panel - 4M",
        description: "Controls power outlet devices.",
        costPerUnit: 12000,
        quantityMultiplier: { "1bhk": 3, "2bhk": 5, "3bhk": 6 },
      },
      {
        label: "Touch Panel - 8M",
        description: "Controls power outlet devices.",
        costPerUnit: 16300,
        quantityMultiplier: { "1bhk": 4, "2bhk": 6, "3bhk": 8 },
      },
      {
        label: "Curtain Touch Panel - 2M + Remote",
        description: "Controls curtain devices.",
        costPerUnit: 12000,
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "Curtain Track + Motor",
        description: "Automated curtain system.",
        costPerUnit: 22000,
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device",
        costPerUnit: 43500,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Video Door Phone",
        description: "Analog camera integrated door bell system and display",
        costPerUnit: 21000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Voice Assistant",
        description: "Control your smart home with voice command",
        costPerUnit: 6000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description: "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
        costPerUnit: 2000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Smart Lighting Control",
        description: "Smart lighting control with scene creation",
        costPerUnit: 0,
        quantityMultiplier: { "1bhk": 0, "2bhk": 0, "3bhk": 0 },
      },
    ],
  },
};

const homeTypes = [
  { value: "1bhk", label: "1 BHK" },
  { value: "2bhk", label: "2 BHK" },
  { value: "3bhk", label: "3 BHK" },
];

const EstimateCostCalculatorHome = () => {
  const [automationPackage, setAutomationPackage] = React.useState("");
  const [homeType, setHomeType] = React.useState("");
  const [deviceQuantities, setDeviceQuantities] = React.useState({});

  React.useEffect(() => {
    if (!automationPackage || !homeType) {
      setDeviceQuantities({});
      return;
    }
    const devices = automationPackages[automationPackage].devices;
    const newDeviceQuantities = {};
    devices.forEach((device) => {
      const multiplier = device.quantityMultiplier[homeType] || 1;
      newDeviceQuantities[device.label] = multiplier;
    });
    setDeviceQuantities(newDeviceQuantities);
  }, [automationPackage, homeType]);

  const calculateEstimate = () => {
    if (!automationPackage || !homeType) return 0;
    const pkg = automationPackages[automationPackage];
    let deviceCost = 0;
    pkg.devices.forEach((device) => {
      deviceCost += (deviceQuantities[device.label] || 0) * device.costPerUnit;
    });
    return deviceCost;
  };

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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Calculator className="w-10 h-10 text-blue-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Home Automation Packages
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Choose your package and home type to see what devices are included.
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        </motion.div>

        {/* Home Type Selection */}
        {automationPackage && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Home Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {homeTypes.map(({ value, label }) => (
                <motion.button
                  key={value}
                  onClick={() => setHomeType(value)}
                  className={`p-4 rounded-xl font-bold transition-all text-center ${
                    homeType === value
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl mb-2">
                    {value === "1bhk" && "🏠"}
                    {value === "2bhk" && "🏡"}
                    {value === "3bhk" && "🏘️"}
                  </div>
                  <div>{label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Devices List */}
        <AnimatePresence mode="wait">
          {automationPackage && homeType ? (
            <motion.div
              key="devices"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6"
            >
              {/* Included Devices */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Package className="w-6 h-6 text-blue-600" />
                  Included Devices
                </h3>
                <div className="space-y-4">
                  {automationPackages[automationPackage].devices.map((device, idx) => (
                    <motion.div
                      key={device.label}
                      className="flex items-start justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition border-l-4 border-blue-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          {device.label}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{device.description}</div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-blue-600">
                          {deviceQuantities[device.label] || 0}
                        </div>
                        <div className="text-xs text-gray-600">units</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Optional Devices - Display Only */}
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
                        className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-600"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          <Package className="w-4 h-4 text-purple-600" />
                          {device.label}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{device.description}</div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-6 p-4 bg-gray-50 rounded-lg">
                    ℹ️ Contact us to add any of these optional devices to your package.
                  </p>
                </div>
              )}

              {/* Total Estimated Cost */}
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white"
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
                  ₹{calculateEstimate().toLocaleString('en-IN')}
                </div>
                <p className="text-blue-100 text-sm mb-6">
                  This estimate includes all devices for the {automationPackages[automationPackage].label} package in your {homeType.toUpperCase()} home. Contact us for a personalized quotation and installation details.
                </p>
                <Link
                  href="/quotation"
                  className="inline-block w-full sm:w-auto bg-white text-blue-600 font-bold py-3 px-8 rounded-xl text-center hover:bg-blue-50 transition shadow-lg"
                >
                  Get Detailed Quotation
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Home className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg font-medium text-center">
                Select a package and home type to see included devices and estimated cost
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Links */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/estimate-cost-calculator/estimated-cost-hotel-room"
            className="group block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition border-l-4 border-purple-600"
          >
            <div className="flex items-center gap-3 text-purple-600 font-bold group-hover:gap-4 transition-all">
              <ArrowBigRight className="w-6 h-6" />
              Hotel Room
            </div>
            <p className="text-gray-600 text-sm mt-2">View smart hotel room automation options</p>
          </Link>

          <Link
            href="/estimate-cost-calculator/estimated-cost-villa"
            className="group block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition border-l-4 border-green-600"
          >
            <div className="flex items-center gap-3 text-green-600 font-bold group-hover:gap-4 transition-all">
              <ArrowBigRight className="w-6 h-6" />
              Villa
            </div>
            <p className="text-gray-600 text-sm mt-2">Explore smart villa automation solutions</p>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default EstimateCostCalculatorHome;
