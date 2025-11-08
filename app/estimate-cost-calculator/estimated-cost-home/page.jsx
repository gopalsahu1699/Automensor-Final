"use client";

import React from "react";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";

const automationPackages = {
  basic: {
    label: "Basic",
    description: "Basic automation package with essential devices.",
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
        label: "wardrobe sensor",
        description: "controls power outlet devices",
        costPerUnit: 1900,
        quantityMultiplier: { "1bhk": 1, "2bhk": 2, "3bhk": 3 },
      },
      {
        label: "4m Inwall Module",
        description: "controls power outlet devices.",
        costPerUnit: 9100,
        quantityMultiplier: { "1bhk": 3, "2bhk": 5, "3bhk": 6 },
      },
      {
        label: "8m Inwall Module",
        description: "controls power outlet devices.",
        costPerUnit: 12700,
        quantityMultiplier: { "1bhk": 4, "2bhk": 6, "3bhk": 8 },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device ",
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
        description:
          "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
        costPerUnit: 3000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: " wifi : jio/airtel ",
        description: "wireless network system",
        costPerUnit: 0,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
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
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 850,
        quantityMultiplier: { "1bhk": 2, "2bhk": 2, "3bhk": 3 },
      },
        {
        label: "wardrobe sensor",
        description: "controls power outlet devices",
        costPerUnit: 1900,
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "touch panel - 4M",
        description: "controls power outlet devices.",
        costPerUnit: 9800,
        quantityMultiplier: { "1bhk": 3, "2bhk": 5, "3bhk": 6 },
      },
      {
        label: "touch panel - 8M",
        description: "controls power outlet devices.",
        costPerUnit: 14400,
        quantityMultiplier: { "1bhk": 4, "2bhk": 6, "3bhk": 8 },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device ",
        costPerUnit: 26500,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: " Video Door phone",
        description: "Analog camera integrated door bell system and display",
        costPerUnit:21000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description:
          "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
        costPerUnit: 3000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "voice assistant ",
        description: "control your smart home with voice command",
        costPerUnit: 6000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
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
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "Outdoor Sensor",
        description: "Detect motion for security and automation.",
        costPerUnit: 850,
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 3 },
      },
       {
        label: "wardrobe sensor",
        description: "controls power outlet devices",
        costPerUnit: 1900,
        quantityMultiplier: { "1bhk": 3, "2bhk": 5, "3bhk": 7 },
      },
      {
        label: "touch panel - 4M",
        description: "controls power outlet devices.",
        costPerUnit:12000,
        quantityMultiplier: { "1bhk": 3, "2bhk": 5, "3bhk": 6 },
      },
      {
        label: "touch panel - 8M",
        description: "controls power outlet devices.",
        costPerUnit: 16300,
        quantityMultiplier: { "1bhk": 4, "2bhk": 6, "3bhk": 8 },
      },
      {
        label: "curtain touch panel - 2M + remote ",
        description: "controls power outlet devices.",
        costPerUnit: 12000,
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "curtain track + moter  ",
        description: "controls power outlet devices.",
        costPerUnit: 22000,
        quantityMultiplier: { "1bhk": 2, "2bhk": 3, "3bhk": 4 },
      },
      {
        label: "Smart Digital Door Lock",
        description: "Door authentication device ",
        costPerUnit: 43500,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: " Video Door phone",
        description: "Analog camera integrated door bell system and display",
        costPerUnit: 21000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
      {
        label: "voice assistant ",
        description: "control your smart home with voice command",
        costPerUnit: 6000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
    ],
    optionalDevices: [
      {
        label: "Automatic Water Pump Controller",
        description:
          "Wireless Smart Water Tank Monitoring System (app controlled with motor on/off)",
        costPerUnit: 3000,
        quantityMultiplier: { "1bhk": 1, "2bhk": 1, "3bhk": 1 },
      },
   
      {
        label: "Smart lighting controll",
        description: "smart lighting controll with scene creation",
        costPerUnit: 0,
        quantityMultiplier: { "1bhk": 0, "2bhk": 0, "3bhk": 0 },
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

  const calculateEstimate = () => {
    if (!automationPackage) return 0;
    const pkg = automationPackages[automationPackage];
    const deviceCost = pkg.devices.reduce(
      (sum, device) =>
        sum + (deviceQuantities[device.label] || 0) * device.costPerUnit,
      0
    );
    const optionalCost = pkg.optionalDevices.reduce(
      (sum, device) =>
        sum + (optionalQuantities[device.label] || 0) * device.costPerUnit,
      0
    );
    return deviceCost + optionalCost;
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl w-full bg-white p-10 rounded-xl shadow-lg space-y-10">
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
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">
                          Qty: {deviceQuantities[label] || 0}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>

            {automationPackages[automationPackage].optionalDevices.length >
              0 && (
              <section className="mt-10">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Optional Devices
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
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">
                            Qty: {optionalQuantities[label] || 0}
                          </span>
                        </div>
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

        <section className="bg-gray-50 rounded-lg max-w-md mx-auto p-6 font-sans border-t-4 border-black mt-16">
          <div className="mb-3">
            <Link
              href="/estimate-cost-calculator/estimated-cost-hotel-room"
              className="inline-flex items-center gap-2 text-blue-600 px-4 py-2 rounded-md border-2 border-transparent hover:bg-blue-100 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <ArrowBigRight />
              Get Estimated cost for Smart Hotel Room
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
      </div>
    </section>
  );
};

export default EstimateCostCalculator;
