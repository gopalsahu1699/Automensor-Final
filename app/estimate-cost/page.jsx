"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const deviceOptions = [
  { label: "Smart Lights", costPerUnit: 50 },
  { label: "Smart Thermostats", costPerUnit: 200 },
  { label: "Smart Security Cameras", costPerUnit: 150 },
  { label: "Smart Locks", costPerUnit: 100 },
  { label: "Voice Assistants", costPerUnit: 75 },
];

const EstimateCostCalculator = () => {
  const [homeSize, setHomeSize] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [devices, setDevices] = useState(
    deviceOptions.reduce((acc, device) => {
      acc[device.label] = 0;
      return acc;
    }, {})
  );

  // Rates for calculation
  const costPerSqFt = 2; // Base cost per sq ft for infrastructure
  const costPerRoom = 150; // Additional cost per room

  const handleDeviceCountChange = (label, count) => {
    // Sanitize input to non-negative integers
    const val = Math.max(0, parseInt(count) || 0);
    setDevices((prev) => ({ ...prev, [label]: val }));
  };

  const calculateEstimate = () => {
    const baseCost = (parseFloat(homeSize) || 0) * costPerSqFt;
    const roomCost = (parseInt(roomCount) || 0) * costPerRoom;
    const devicesCost = deviceOptions.reduce((sum, device) => {
      const count = parseInt(devices[device.label]) || 0;
      return sum + count * device.costPerUnit;
    }, 0);

    return baseCost + roomCost + devicesCost;
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-lg mt-16">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
          Home Automation Cost Calculator
        </h2>

        <label className="block mb-7">
          <span className="font-semibold text-gray-800 text-lg">Home Size (sq ft):</span>
          <input
            type="number"
            className="mt-3 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
            value={homeSize}
            onChange={(e) => setHomeSize(e.target.value)}
            placeholder="e.g., 2000"
            min="0"
            aria-label="Enter the size of your home in square feet"
          />
        </label>

        <label className="block mb-10">
          <span className="font-semibold text-gray-800 text-lg">Number of Rooms:</span>
          <input
            type="number"
            className="mt-3 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
            value={roomCount}
            onChange={(e) => setRoomCount(e.target.value)}
            placeholder="e.g., 5"
            min="0"
            aria-label="Enter the number of rooms in your home"
          />
        </label>

        <div className="mb-10">
          <p className="font-semibold mb-5 text-gray-800 text-lg">Smart Devices (Enter quantity for each):</p>
          {deviceOptions.map(({ label }) => (
            <label
              key={label}
              className="flex items-center justify-between border-b border-gray-200 py-4"
            >
              <span className="text-gray-700 text-base">{label}:</span>
              <input
                type="number"
                className="w-20 border border-gray-300 rounded-md p-2 text-center focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
                value={devices[label]}
                min="0"
                onChange={(e) => handleDeviceCountChange(label, e.target.value)}
                placeholder="0"
                aria-label={`Enter quantity of ${label}`}
              />
            </label>
          ))}
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">Estimated Cost</p>
          <p className="text-5xl font-extrabold text-orange-600 mt-4 drop-shadow-lg">
            ₹{calculateEstimate().toLocaleString()}
          </p>
          <p className="mt-3 text-gray-600 max-w-md mx-auto text-sm">
            This estimate includes installation infrastructure and your device choices. Contact us for a detailed personalized plan!
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

      <Footer />
    </>
  );
};

export default EstimateCostCalculator;
