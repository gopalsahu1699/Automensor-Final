"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";

const automationPackages = {
  basic: {
    label: "Basic Automation",
    description:
      "Essential smart devices for everyday convenience and security.",
    devices: [
      {
        label: "Smart sensor",
        costPerUnit: 2700,
        description: "Detects motion, opening/closing of doors and windows.",
        quantityMultiplier: { "1bhk": 4, "2bhk": 5, "3bhk": 6 },
      },
      {
        label: "Digital Doorlock",
        costPerUnit: 16500,
        description: "Keyless entry with PIN, card, or biometric.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Smart Inwall Switch",
        costPerUnit: 9000,
        description: "Control lights and appliances remotely.",
        quantityMultiplier: { "1bhk": 4, "2bhk": 5, "3bhk": 7 },
      },
      {
        label: "Video Door bell",
        costPerUnit: 6700,
        description: "See and talk to visitors from anywhere.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic water tank cut off system",
        costPerUnit: 1500,
        description: "Prevents water overflow by automatic cutoff.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Automated Blinds & Curtains",
        costPerUnit: 25000,
        description: "Remotely control window coverings.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 2 },
      },
      {
        label: "Voice Assistant device",
        costPerUnit: 6000,
        description: "Hands-free voice control for home devices.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
    ],
  },
  standard: {
    label: "Standard Automation",
    description: "Advanced integration with comfort and safety enhancements.",
    devices: [
      {
        label: "Smart sensor",
        costPerUnit: 2700,
        description: "Motion and environmental sensing.",
        quantityMultiplier: { "1bhk": 4, "2bhk": 5, "3bhk": 6 },
      },
      {
        label: "Digital Doorlock",
        costPerUnit: 20000,
        description: "Enhanced security door locking.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Video Door Phone",
        costPerUnit: 22000,
        description: "Two-way video calling at your door.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Smart panel  module",
        costPerUnit: 11000,
        description: "Central control for smart devices.",
        quantityMultiplier: { "1bhk": 6, "2bhk": 9, "3bhk": 12 },
      },
      {
        label: "Smart Thermostats",
        costPerUnit: 12000,
        description: "Optimize home temperature settings.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Voice Assistant device",
        costPerUnit: 6000,
        description: "Control with voice commands.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic water tank cut off system",
        costPerUnit: 1500,
        description: "Prevent water overflow",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Automated Blinds & Curtains",
        costPerUnit: 25000,
        description: "Control curtains remotely",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 2 },
      },
      {
        label: "Smart irrigation system for garden",
        costPerUnit: 25000,
        description: "Automate garden watering",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
    ],
  },
  advanced: {
    label: "Advanced Automation",
    description: "Complete smart home integration with premium devices.",
    devices: [
      {
        label: "Smart sensor",
        costPerUnit: 2700,
        description: "Comprehensive environment sensing.",
        quantityMultiplier: { "1bhk": 4, "2bhk": 5, "3bhk": 6 },
      },
      {
        label: "Digital Doorlock",
        costPerUnit: 44000,
        description: "Top-tier security solutions.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Video Door Phone",
        costPerUnit: 25000,
        description: "Premium video intercom system.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Smart panel  module",
        costPerUnit: 16000,
        description: "Advanced device centralized control.",
        quantityMultiplier: { "1bhk": 6, "2bhk": 9, "3bhk": 12 },
      },
      {
        label: "Smart Thermostats",
        costPerUnit: 12000,
        description: "AI temperature regulation.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Voice Assistant device",
        costPerUnit: 6000,
        description: "Voice control hub.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
  
      {
        label: "Automated Blinds & Curtains",
        costPerUnit: 25000,
        description: "Motorized window treatments.",
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "Air Quality & Wellness Sensors",
        costPerUnit: 10000,
        description: "Monitor Indoor air quality and wellness.",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
        {
        label: "Smart RGB lighting",
        costPerUnit: 3000,
        description: "Color-changing ambient lighting",
        quantityMultiplier: { "1bhk": 3, "2bhk": 5, "3bhk": 6 },
      },
    ],
    optionalDevices: [
      {
        label: "Smart irrigation system for garden",
        costPerUnit: 25000,
        description: "Automated watering system",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Automatic water tank cut off system",
        costPerUnit: 1500,
        description: "Water overflow prevention",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "Automated Main gate",
        costPerUnit: 10000,
        description: "Remote controlled gate automation",
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
    
      {
        label: "Smart Security Cameras",
        costPerUnit: 20000,
        description: "High-res security surveillance.",
        quantityMultiplier: { "1bhk": 2, "2bhk": 4, "3bhk": 6 },
      },
    ],
  },
};

const homeTypes = [
  { value: "", label: "Select home type" },
  { value: "1bhk", label: "1 BHK" },
  { value: "2bhk", label: "2 BHK" },
  { value: "3bhk", label: "3 BHK" },
];

const EstimateCostCalculator = () => {
  const [automationPackage, setAutomationPackage] = React.useState("");
  const [homeType, setHomeType] = React.useState("");
  const [deviceQuantities, setDeviceQuantities] = React.useState({});
  const [optionalQuantities, setOptionalQuantities] = React.useState({});

  React.useEffect(() => {
    if (!automationPackage || !homeType) {
      setDeviceQuantities({});
      setOptionalQuantities({});
      return;
    }
    const devices = automationPackages[automationPackage].devices;
    const newDeviceQuantities = {};
    devices.forEach((device) => {
      const multiplier = device.quantityMultiplier[homeType] || 1;
      newDeviceQuantities[device.label] = multiplier;
    });
    setDeviceQuantities(newDeviceQuantities);
    setOptionalQuantities({});
  }, [automationPackage, homeType]);

  const incrementQuantity = (label, isOptional = false) => {
    if (isOptional) {
      setOptionalQuantities((prev) => ({
        ...prev,
        [label]: (prev[label] || 0) + 1,
      }));
    } else {
      setDeviceQuantities((prev) => ({
        ...prev,
        [label]: (prev[label] || 0) + 1,
      }));
    }
  };

  const decrementQuantity = (label, isOptional = false) => {
    if (isOptional) {
      setOptionalQuantities((prev) => ({
        ...prev,
        [label]: Math.max((prev[label] || 0) - 1, 0),
      }));
    } else {
      setDeviceQuantities((prev) => ({
        ...prev,
        [label]: Math.max((prev[label] || 0) - 1, 0),
      }));
    }
  };

  const calculateEstimate = () => {
    if (!automationPackage) return 0;
    const pkg = automationPackages[automationPackage];
    const deviceCost = pkg.devices.reduce((sum, device) => {
      const qty = deviceQuantities[device.label] || 0;
      return sum + qty * device.costPerUnit;
    }, 0);
    const optionalCost = pkg.optionalDevices.reduce((sum, device) => {
      const qty = optionalQuantities[device.label] || 0;
      return sum + qty * device.costPerUnit;
    }, 0);
    return deviceCost + optionalCost;
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
      <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-lg mt-16 space-y-10">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center">
          Home Automation Cost Calculator
        </h2>
        <div>
          <label
            htmlFor="automationPackage"
            className="block mb-3 font-semibold text-gray-800 text-lg"
          >
            Choose Automation Package
          </label>
          <select
            id="automationPackage"
            value={automationPackage}
            onChange={(e) => setAutomationPackage(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
            aria-label="Select automation package"
          >
            <option value="">Select a package</option>
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
        </div>
        {automationPackage && (
          <div>
            <label
              htmlFor="homeType"
              className="block mb-3 font-semibold text-gray-800 text-lg"
            >
              Choose Your Home Type
            </label>
            <select
              id="homeType"
              value={homeType}
              onChange={(e) => setHomeType(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
              aria-label="Select your home type"
            >
              {homeTypes.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}
        {automationPackage && homeType && (
          <>
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Included Devices in{" "}
                {automationPackages[automationPackage].label}
              </h3>
              <div className="space-y-6">
                {automationPackages[automationPackage].devices.map(
                  ({ label, description }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-gray-200 pb-4"
                    >
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                      <QuantityControl
                        label={label}
                        quantity={deviceQuantities[label] || 0}
                        onIncrement={() => incrementQuantity(label)}
                        onDecrement={() => decrementQuantity(label)}
                      />
                    </div>
                  )
                )}
              </div>
            </section>
            {automationPackages[automationPackage].optionalDevices.length >
              0 && (
              <section className="mt-10">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Optional Devices (Add or Remove)
                </h4>
                <div className="space-y-6">
                  {automationPackages[automationPackage].optionalDevices.map(
                    ({ label, description }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between border-b border-gray-200 pb-4"
                      >
                        <div>
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-gray-600">{description}</p>
                        </div>
                        <QuantityControl
                          label={label}
                          quantity={optionalQuantities[label] || 0}
                          onIncrement={() => incrementQuantity(label, true)}
                          onDecrement={() => decrementQuantity(label, true)}
                        />
                      </div>
                    )
                  )}
                </div>
              </section>
            )}
          </>
        )}
        <div className="text-center mt-10">
          <p className="text-3xl font-bold text-gray-900">Estimated Cost</p>
          <p className="text-5xl font-extrabold text-orange-600 mt-4 drop-shadow-lg">
            ₹{calculateEstimate().toLocaleString()}
          </p>
          <p className="mt-3 text-gray-600 max-w-md mx-auto text-sm">
            This estimate includes your package and optional devices. Contact us
            for a customized plan.
          </p>
          <div className="mt-8">
            <Link
              href="/quotation"
              className="inline-block bg-orange-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-orange-700 transition"
              aria-label="Request a personalized quotation"
            >
              Request a Quotation
            </Link>
          </div>
        </div>
       
      </div>
          <section className="bg-gray-50 rounded-lg max-w-md mx-auto p-6 font-sans border-t-4 border-black">
      <div className="mb-3">
        <Link href="/estimated-cost-hotel-room" className="inline-flex items-center gap-2  text-blue-600 px-4 py-2 rounded-md border-2 border-transparent hover:bg-blue-100 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <ArrowBigRight />
          Get Estimated cost for  Smart Hotel Room
        </Link>
      </div>
      <div>
        <Link href="/estimated-cost-villa" className="inline-flex items-center gap-2  text-blue-600 px-4 py-2 rounded-md border-2 border-transparent hover:bg-blue-100 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <ArrowBigRight />
          Get Estimated cost for  Smart Villa
        </Link>
      </div>
    </section>
      <Footer />
    </>
  );
};

export default EstimateCostCalculator;
