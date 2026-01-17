"use client";

import Image from "next/image";
import {
  Lightbulb,
  Fan,
  Blinds,
  Bell,
  Tv,
  AirVent,
  Hand,
  Smartphone,
  Mic,
  Radio,
} from "lucide-react";

/* WHAT YOU CAN CONTROL */
const whatYouCanControl = [
  { label: "Light", icon: Lightbulb },
  { label: "Fan", icon: Fan },
  { label: "Curtain", icon: Blinds },
  { label: "Bell", icon: Bell },
  { label: "TV", icon: Tv },
  { label: "AC", icon: AirVent },
];

/* HOW YOU CAN CONTROL */
const howYouCanControl = [
  { title: "Touch", icon: Hand },
  { title: "App", icon: Smartphone },
  { title: "Voice", icon: Mic },
  { title: "Remote", icon: Radio },
];

export default function ControlSection() {
  return (
    <section className="bg-white py-0 px-6">
      <div className="max-w-7xl mx-auto">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

          {/* Left Image */}
          <div>
            <Image
              src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768529052/Panel_2_hqdj14.webp"
              alt="Smart Touch Panel"
              width={520}
              height={320}
              className="rounded-lg"
            />
          </div>

          {/* WHAT YOU CAN CONTROL */}
          <div>
            <h3 className="text-blue-600 text-2xl font-bold mb-1">WHAT</h3>
            <p className="text-gray-600 uppercase tracking-wide mb-6">
              You can control
            </p>

            <div className="grid grid-cols-3 gap-6">
              {whatYouCanControl.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 flex items-center justify-center border rounded-lg mb-2">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="px-4 py-8 md:py-12">
          <h3 className="text-blue-600 text-xl md:text-2xl font-bold text-center mb-1">
            HOW
          </h3>
          <p className="text-gray-600 uppercase tracking-wide text-center mb-6 text-sm md:text-base">
            You can control
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {howYouCanControl.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                  <p className="text-sm font-medium text-gray-700">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
