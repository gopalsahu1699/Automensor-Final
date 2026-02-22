"use client";

import React from "react";
import Link from "next/link";
import { motion } from 'framer-motion';
import {
    FaArrowRight as ArrowRight,
    FaCircleCheck as CheckCircle2,
    FaStar as Star
} from 'react-icons/fa6';
import dynamic from 'next/dynamic';

// Dynamically import AnimeHeroScene with ssr: false to prevent hydration errors from anime.js
const AnimeHeroScene = dynamic(() => import('./AnimeHeroScene'), { ssr: false });

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
            {/* Background Visual Elements */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-100 to-indigo-100 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* LEFT COLUMN: Text Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-blue-600 shadow-sm backdrop-blur-sm">
                                <Star className="h-4 w-4 fill-blue-600" />
                                <span>Rated #1 in Chhattisgarh | 200+ Projects Completed</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            Upgrade Your Home to
                            <span className="relative ml-2 inline-block text-blue-600">
                                Smart Living
                            </span>
                            <br />
                            <span className="text-slate-800">In Just 24 Hours</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-8 text-base leading-relaxed text-slate-600 sm:text-lg lg:text-xl max-w-xl"
                        >
                            Join 200+ happy families in Chhattisgarh. Control lighting, security, and AC/Fan with a single touch—<strong>No Rewiring Required.</strong>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                        >
                            <Link
                                href="/contact-us"
                                className="group inline-flex h-12 sm:h-14 w-full items-center justify-center rounded-full bg-blue-600 px-6 sm:px-8 text-base sm:text-lg font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95 sm:w-auto"
                            >
                                Book Free Site Visit
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/estimate-cost-calculator"
                                className="group inline-flex h-12 sm:h-14 w-full items-center justify-center rounded-full border-2 border-slate-200 bg-white px-6 sm:px-8 text-base sm:text-lg font-semibold text-slate-700 transition-all hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:scale-105 active:scale-95 sm:w-auto"
                            >
                                Calculate Cost
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-8 sm:mt-10 grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 text-xs sm:text-sm text-slate-500 font-medium"
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>10-Year Warranty</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>Free Consultation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>No Rewiring Needed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>24/7 Local Support</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Anime.js 3D Scene */}
                    <div className="w-full lg:h-[600px] flex items-center justify-center relative mt-12 lg:mt-0">
                        {/* Dynamic Glow Orbs for the right side */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px] -z-10 animate-pulse transition-all duration-1000"></div>

                        <AnimeHeroScene />
                    </div>

                </div>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
            </div>
        </section>
    );
}
