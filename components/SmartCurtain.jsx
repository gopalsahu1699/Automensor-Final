import Image from "next/image";
import Link from "next/link";
import {
  Curtains,
  Wind,
  Smartphone,
  Clock,
  Sun,
  Moon,
  Wifi,
  Power,
  Home,
  SlidersHorizontal,
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function SmartCurtain() {
  return (
    <section className="bg-[#f5f6f7] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Curtain Image */}
        <div className="relative">
          <div className=" rounded-xl shadow-lg ">
            <Image
              src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768535109/curtain_1_e9mu73.webp" // replace with your image
              alt="Smart Curtain Automation"
              width={600}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Smart Curtain
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">
            Elevate your living experience with automated Smart Curtains.
            Control natural light and privacy effortlessly using mobile apps,
            voice commands, or scheduled routines. Designed for silent
            operation and smooth movement, they blend luxury, comfort,
            and intelligent automation into your home.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap gap-5 text-gray-700 mb-8">
            <Sun size={22} />
            <Moon size={22} />
            <Smartphone size={22} />
            <Clock size={22} />
            <Wifi size={22} />
            <Power size={22} />
            <SlidersHorizontal size={22} />
            <Home size={22} />
            <Activity size={22} />
            <ShieldCheck size={22} />
            <Wind size={22} />
          </div>

          {/* CTA */}
      <Link href="/all-products/smart-curtain">
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
