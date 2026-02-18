"use client";
import React from 'react';
import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768533127/voice_control_Img_gx1cxi.webp"
            alt="Voice controlled smart home"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        <div className="relative z-10 flex min-h-screen items-center justify-end px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md rounded-xl bg-white/10 backdrop-blur-md p-8 shadow-2xl border border-white/20"
          >
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 drop-shadow-sm">
              Manage your home with your voice
            </h2>

            <p className="mt-4 text-sm md:text-base text-gray-800 leading-relaxed font-medium">
              You can manage your smart home in many different ways – also with
              your voice. Say a few words for one of the most popular voice
              assistants.
            </p>

            <div className="mt-6 flex items-center gap-5 text-gray-900">
              <Lightbulb className="h-6 w-6" />
              <Wind className="h-6 w-6" />
              <Tv className="h-6 w-6" />
              <Flame className="h-6 w-6" />
              <Blinds className="h-6 w-6" />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Image
                  src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768548387/google_assistant_ggfpg7.png"
                  alt="Google Assistant"
                  width={120}
                  height={30}
                  className="drop-shadow-md"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Image
                  src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768548387/voice_alexa_icon_cywjt6.png"
                  alt="Amazon Alexa"
                  width={36}
                  height={36}
                  className="drop-shadow-md"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      {[
        { Component: SapphireSeriesPage, id: "sapphire" },
        { Component: DigitalDoorLock, id: "doorlock" },
        { Component: SensorsSection, id: "sensors" },
        { Component: VideoDoorPhone, id: "videophone" },
        { Component: SmartCurtain, id: "curtain" },
        { Component: SceneCreation, id: "scenes" }
      ].map(({ Component, id }, index) => (
        <motion.section
          key={id}
          className="py-20 bg-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Component />
        </motion.section>
      ))}
    </main>
  );
}
