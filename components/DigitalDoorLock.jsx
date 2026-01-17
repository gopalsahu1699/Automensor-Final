import Image from "next/image";
import Link from "next/link";
import {
  Fingerprint,
  Smartphone,
  KeyRound,
  ShieldCheck,
  Bell,
  Wifi,
  BatteryCharging,
  Lock,
  User,
  Clock,
  AlertTriangle,
  DoorOpen,
} from "lucide-react";

export default function DigitalDoorLock() {
  return (
    <section className="bg-[#f5f6f7] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Digital Door Lock
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">
            Experience next-level security with our advanced Digital Door Lock.
            Designed for modern homes, it offers multiple access options,
            intelligent monitoring, and seamless control—combining safety,
            convenience, and elegant design in one smart solution.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap gap-5 text-gray-700 mb-8">
            <Fingerprint size={22} />
            <Smartphone size={22} />
            <KeyRound size={22} />
            <User size={22} />
            <Clock size={22} />
            <Wifi size={22} />
            <Bell size={22} />
            <BatteryCharging size={22} />
            <ShieldCheck size={22} />
            <Lock size={22} />
            <AlertTriangle size={22} />
            <DoorOpen size={22} />
          </div>

          {/* CTA */}
       <Link href="/all-products/digital-door-lock">
  <button className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition">
    More
    <span className="text-lg">→</span>
  </button>
</Link>
        </div>

        {/* Right: Product Image */}
        <div className="relative">
          <div className="rounded-xl shadow-lg ">
            <Image
              src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768534252/b0817f6f-188e-407f-a4f9-a9bbed73453e_removalai_preview_iwbz3j.png" // replace with your image
              alt="Digital Door Lock"
              width={500}
              height={700}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
