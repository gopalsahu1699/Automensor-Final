import Image from "next/image";
import Link from "next/link";

import {
  Fan,
  Lightbulb,
  Tv,
  Refrigerator,
  Film,
  Waves,
  Thermometer,
  Cpu,
  ShieldCheck,
  Power,
  Smartphone,
  Home,
} from "lucide-react";

export default function SapphireSeriesPage() {
  return (
    <section className="bg-[#f5f6f7] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Product Image */}
        <div className="relative">
          <div className="bg-transparent rounded-xl shadow-lg ">
            <Image
              src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768528699/panel_1_fuot6k.webp" // replace with your image
              alt="Sapphire Series Touch Panel"
              width={900}
              height={300}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Sapphire Series
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">
            Built to suit every wall. Sapphire series by OOB is the combination
            of elegance and technology, providing the sophisticated look with
            the touch panel and smart functionalities from anywhere-anytime.
            A perfect blend of Aesthetics and Performance. Available in
            multiple finishes and sizes.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap gap-5 text-gray-700 mb-8">
            <Fan size={22} />
            <Lightbulb size={22} />
            <Tv size={22} />
            <Refrigerator size={22} />
            <Film size={22} />
            <Waves size={22} />
            <Thermometer size={22} />
            <Cpu size={22} />
            <ShieldCheck size={22} />
            <Power size={22} />
            <Smartphone size={22} />
            <Home size={22} />
          </div>

          {/* CTA */}
        <Link href="/all-products/smart-panel">
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
