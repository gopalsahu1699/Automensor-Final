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
        quantityLogic: (areas) => areas.washrooms * 1,
      },
      {
        label: "wardrobe sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 1900,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "4m Inwall Module",
        description: "Controls power outlet devices.",
        costPerUnit: 9100,
        quantityLogic: (areas) => areas.rooms * 1 + areas.washrooms,
      },
      {
        label: "8m Inwall Module",
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
        label: " Video Door Phone",
        description: "Analog camera integrated door bell system and display.",
        costPerUnit: 21000,
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
        quantityLogic: (areas) => areas.washrooms * 1,
      },
      {
        label: "wardrobe sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 1900,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "4m touch panel",
        description: "Controls power outlet devices.",
        costPerUnit: 9800,
        quantityLogic: (areas) => areas.rooms * 1 + areas.washrooms,
      },
      {
        label: "8m touch panel",
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
        label: " Video Door Phone",
        description: "Analog camera integrated door bell system and display.",
        costPerUnit: 21000,
        quantityLogic: (areas) => areas.rooms,
      },
    ],
    optionalDevices: [
      {
        label: " RFID card holder",
        description: "Room authentication device.",
        costPerUnit: 12200,
        quantityLogic: (areas) => areas.rooms,
      },
      {
        label: " 2M Door bell + DND touch panel",
        description: "Door bell + DND system",
        costPerUnit: 6000,
        quantityLogic: (areas) => areas.rooms,
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
        quantityLogic: (areas) => areas.washrooms * 1,
      },
      {
        label: "wardrobe sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 1900,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "4m touch panel",
        description: "Controls power outlet devices.",
        costPerUnit: 12000,
        quantityLogic: (areas) => areas.rooms * 1 + areas.washrooms,
      },
      {
        label: "8m touch panel",
        description: "Controls power outlet devices.",
        costPerUnit: 16300,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: "8m -  AC temperature + service + DND + ligts ",
        description: "Controls power outlet devices.",
        costPerUnit: 17000,
        quantityLogic: (areas) => areas.rooms * 1,
      },
      {
        label: " RFID card holder",
        description: "Room authentication device.",
        costPerUnit: 12200,
        quantityLogic: (areas) => areas.rooms,
      },
      {
        label: " 2M Door bell + DND",
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
        label: " Video Door Phone",
        description: "Analog camera integrated door bell system and display.",
        costPerUnit: 21000,
        quantityLogic: (areas) => areas.rooms,
      },
    ],
    optionalDevices: [
      {
        label: "Curtain control system",
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
    const calculatedQuantities = {};
    pkg.devices.forEach((device) => {
      calculatedQuantities[device.label] = device.quantityLogic
        ? device.quantityLogic(areas)
        : 0;
    });
    setDeviceQuantities(calculatedQuantities);
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
      <main className="max-w-3xl w-full bg-white rounded-xl shadow-xl p-8 sm:p-12">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Hotel Room Automation Cost Calculator
        </h1>

        <section className="mb-8">
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
            <h2 className="text-2xl font-semibold mb-4">Specify Room Details</h2>
            <div className="grid grid-cols-1 gap-6">
              {hotelRoomAreas.map(({ key, label }) => (
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
              href="/estimate-cost-calculator/estimated-cost-villa"
              className="inline-flex items-center gap-2 text-blue-600 px-4 py-2 rounded-md border-2 border-transparent hover:bg-blue-100 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <ArrowBigRight />
              Get Estimated cost for Smart Villa
            </Link>
          </div>
        </section>
      </main>
    </section>
  );
};

export default HotelRoomAutomation;
