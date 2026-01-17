"use client";

import Image from "next/image";
import {
  Lightbulb,
  Wind,
  Tv,
  Flame,
  Blinds
} from "lucide-react";

// ✅ Make sure these imports exist

import SapphireSeriesPage from "@/components/SapphireSeriesPage";
import DigitalDoorLock from "@/components/DigitalDoorLock";
import SensorsSection from "@/components/SensorsSection";
import VideoDoorPhone from "@/components/VideoDoorPhone";
import SmartCurtain from "@/components/SmartCurtain";
import SceneCreation from "@/components/SceneCreation";

export default function AllProductsClient() {
  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768533127/voice_control_Img_gx1cxi.webp"
          alt="Voice controlled smart home"
          fill
          priority
          className="object-cover"
        />

        <div className="relative z-10 flex min-h-screen items-center justify-end px-6 md:px-16">
          <div className="max-w-md rounded-xl  p-6  shadow-xl  ">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
              Manage your home with your voice
            </h2>

            <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
              You can manage your smart home in many different ways – also with
              your voice. Say a few words for one of the most popular voice
              assistants.
            </p>

            <div className="mt-6 flex items-center gap-5 text-gray-800">
              <Lightbulb className="h-6 w-6" />
              <Wind className="h-6 w-6" />
              <Tv className="h-6 w-6" />
              <Flame className="h-6 w-6" />
              <Blinds className="h-6 w-6" />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Image
                src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768548387/google_assistant_ggfpg7.png"
                alt="Google Assistant"
                width={120}
                height={30}
              />
              <Image
                src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768548387/voice_alexa_icon_cywjt6.png"
                alt="Amazon Alexa"
                width={36}
                height={36}
              />
            </div>
          </div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <section className="py-20 bg-white">
        <SapphireSeriesPage />
      </section>

      <section className="py-20 bg-white">
        <DigitalDoorLock />
      </section>

      <section className="py-20 bg-white">
        <SensorsSection />
      </section>

      <section className="py-20 bg-white">
        <VideoDoorPhone />
      </section>

      <section className="py-20 bg-white">
        <SmartCurtain />
      </section>
      <section className="py-20 bg-white">
        <SceneCreation />
      </section>
    </main>
  );
}
