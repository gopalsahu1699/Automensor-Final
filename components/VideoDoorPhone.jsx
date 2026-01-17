import Image from "next/image";
import Link from "next/link";
import {
  Video,
  Camera,
  Mic,
  Volume2,
  Smartphone,
  Bell,
  ShieldCheck,
  Wifi,
  UserCheck,
  Lock,
  DoorOpen,
  Clock,
} from "lucide-react";

export default function VideoDoorPhone() {
  return (
    <section className="bg-[#f5f6f7] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Video Door Phone
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">
            Stay connected and secure with a smart Video Door Phone system.
            See, hear, and speak to visitors in real-time from anywhere using
            your smartphone. Designed for modern homes, it enhances safety,
            convenience, and controlled access with crystal-clear video
            monitoring.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap gap-5 text-gray-700 mb-8">
            <Video size={22} />
            <Camera size={22} />
            <Mic size={22} />
            <Volume2 size={22} />
            <Smartphone size={22} />
            <Wifi size={22} />
            <Bell size={22} />
            <UserCheck size={22} />
            <Lock size={22} />
            <ShieldCheck size={22} />
            <Clock size={22} />
            <DoorOpen size={22} />
          </div>

          {/* CTA */}
         <Link href="/all-products/video-door-phone">
  <button className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition">
    More
    <span className="text-lg">→</span>
  </button>
</Link>
        </div>

        {/* Right: Product Image */}
        <div className="relative">
          <div className=" rounded-xl shadow-lg ">
            <Image
              src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768536019/vdp_1_yihhhg.webp" // replace with your image
              alt="Video Door Phone"
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
