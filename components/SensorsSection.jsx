import Image from "next/image";
import Link from "next/link";

import {
  Radar,
  Eye,
  Flame,
  Droplets,
  Thermometer,
  Wind,
  Bell,
  ShieldCheck,
  Wifi,
  Cpu,
  Home,
  Activity,
} from "lucide-react";

export default function SensorsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Sensor Image */}
        <div className="relative">
          <div className="bg-white rounded-xl shadow-lg ">
            <Image
              src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768534870/sensor_1_evipbq.webp" // replace with your image
              alt="Smart Home Sensors"
              width={500}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Smart Sensors
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">
            Our intelligent sensor ecosystem constantly monitors your home for
            motion, temperature, smoke, gas, water leaks, and air quality.
            Designed for accuracy and reliability, these sensors enhance safety,
            automation, and energy efficiency—working silently in the background.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap gap-5 text-gray-700 mb-8">
            <Radar size={22} />
            <Eye size={22} />
            <Flame size={22} />
            <Droplets size={22} />
            <Thermometer size={22} />
            <Wind size={22} />
            <Bell size={22} />
            <Wifi size={22} />
            <Cpu size={22} />
            <ShieldCheck size={22} />
            <Activity size={22} />
            <Home size={22} />
          </div>

          {/* CTA */}
          <Link href="/all-products/sensor">
  <button className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition">
    More
    <span className="text-lg">→</span>
  </button>
</Link>
        </div>

      </div>
    </section>
  );
}
