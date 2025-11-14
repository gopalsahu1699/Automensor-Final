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
    icon: "🏨",
    devices: [
      {
        label: "Motion Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 2700,
        quantityLogic: (areas) => areas.washrooms * 1,
      },
      {
        label: "Wardrobe Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 1700,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "4M Inwall Module",
        description: "Controls power outlet devices.",
        costPerUnit: 9100,
        quantityLogic: (areas) => areas.rooms * 1 + areas.washrooms,
      },
      {
        label: "8M Inwall Module",
        description: "Controls power outlet devices.",
        costPerUnit: 12700,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device.",
        costPerUnit: 25900,
        quantityLogic: (areas) => areas.rooms,
      },
    ],
    optionalDevices: [
      {
        label: "Video Door Phone",
        description: "Analog camera integrated door bell system and display.",
        costPerUnit: 21000,
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
        quantityLogic: (areas) => areas.washrooms * 1,
      },
      {
        label: "Wardrobe Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 1700,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "4M Touch Panel",
        description: "Controls power outlet devices.",
        costPerUnit: 9800,
        quantityLogic: (areas) => areas.rooms * 1 + areas.washrooms,
      },
      {
        label: "8M Touch Panel",
        description: "Controls power outlet devices.",
        costPerUnit: 14400,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device.",
        costPerUnit: 25900,
        quantityLogic: (areas) => areas.rooms,
      },
      {
        label: "Video Door Phone",
        description: "Analog camera integrated door bell system and display.",
        costPerUnit: 19999,
        quantityLogic: (areas) => areas.rooms,
      },
    ],
    optionalDevices: [
      {
        label: "RFID Card Holder",
        description: "Room authentication device.",
        costPerUnit: 12200,
      },
      {
        label: "2M Door Bell + DND Touch Panel",
        description: "Door bell + DND system",
        costPerUnit: 6000,
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
        quantityLogic: (areas) => areas.washrooms * 1,
      },
      {
        label: "Wardrobe Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 1700,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "4M Touch Panel",
        description: "Controls power outlet devices.",
        costPerUnit: 12000,
        quantityLogic: (areas) => areas.rooms * 1 + areas.washrooms,
      },
      {
        label: "8M Touch Panel",
        description: "Controls power outlet devices.",
        costPerUnit: 16300,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "8M AC Temperature + Service + DND + Lights",
        description: "Advanced room control system.",
        costPerUnit: 17000,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "RFID Card Holder",
        description: "Room authentication device.",
        costPerUnit: 12200,
        quantityLogic: (areas) => areas.rooms,
      },
      {
        label: "2M Door Bell + DND",
        description: "Door bell + DND system",
        costPerUnit: 6000,
        quantityLogic: (areas) => areas.rooms,
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device.",
        costPerUnit: 25900,
        quantityLogic: (areas) => areas.rooms,
      },
      {
        label: "Video Door Phone",
        description: "Analog camera integrated door bell system and display.",
        costPerUnit: 21000,
        quantityLogic: (areas) => areas.rooms,
      },
    ],
    optionalDevices: [
      {
        label: "Curtain Control System",
        description: "Automatically open/close curtain blinds.",
        costPerUnit: 32000,
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
    const calculatedQuantities = {};
    pkg.devices.forEach((device) => {
      calculatedQuantities[device.label] = device.quantityLogic
        ? device.quantityLogic(areas)
        : 0;
    });
    setDeviceQuantities(calculatedQuantities);
  }, [automationPackage, areas]);

  const calculateEstimate = () => {
    if (!automationPackage || (areas.rooms === 0 && areas.washrooms === 0)) return 0;
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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Building2 className="w-10 h-10 text-purple-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Hotel Room Automation
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Select your package and specify room details to see what devices are included.
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

        {/* Room Details */}
        {automationPackage && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {hotelRoomAreas.map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {label}
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleDecrement(key)}
                      className="w-12 h-12 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition"
                      aria-label={`Decrease ${label}`}
                    >
                      <Minus size={24} />
                    </button>
                    <span className="flex-1 text-center text-3xl font-bold text-gray-900 bg-gray-100 rounded-lg py-3">
                      {areas[key]}
                    </span>
                    <button
                      onClick={() => handleIncrement(key)}
                      className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition"
                      aria-label={`Increase ${label}`}
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Devices List */}
        <AnimatePresence mode="wait">
          {automationPackage ? (
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
                        <div className="text-sm text-gray-600 mt-1">
                          {device.description}
                        </div>
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
              {areas.rooms > 0 || areas.washrooms > 0 ? (
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
                    ₹{calculateEstimate().toLocaleString("en-IN")}
                  </div>
                  <p className="text-blue-100 text-sm mb-6">
                    For {areas.rooms} room{areas.rooms !== 1 ? "s" : ""} and {areas.washrooms} washroom{areas.washrooms !== 1 ? "s" : ""} with {automationPackages[automationPackage].label} package. This is an estimated cost. Contact us for a personalized quotation.
                  </p>
                  <Link
                    href="/quotation"
                    className="inline-block w-full sm:w-auto bg-white text-blue-600 font-bold py-3 px-8 rounded-xl text-center hover:bg-blue-50 transition shadow-lg"
                  >
                    Get Detailed Quotation
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-lg font-semibold">
                    Add rooms or washrooms to see the estimated cost
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Building2 className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg font-medium text-center">
                Select a package to see included devices
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
            href="/estimate-cost-calculator/estimated-cost-home"
            className="group block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition border-l-4 border-blue-600"
          >
            <div className="flex items-center gap-3 text-blue-600 font-bold group-hover:gap-4 transition-all">
              <ArrowBigRight className="w-6 h-6" />
              Smart Home
            </div>
            <p className="text-gray-600 text-sm mt-2">Explore smart home automation options</p>
          </Link>

          <Link
            href="/estimate-cost-calculator/estimated-cost-villa"
            className="group block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition border-l-4 border-green-600"
          >
            <div className="flex items-center gap-3 text-green-600 font-bold group-hover:gap-4 transition-all">
              <ArrowBigRight className="w-6 h-6" />
              Smart Villa
            </div>
            <p className="text-gray-600 text-sm mt-2">Calculate villa automation costs</p>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HotelRoomAutomation;
