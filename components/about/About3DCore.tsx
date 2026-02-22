"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaMicrochip as Microchip, FaScrewdriverWrench as Wrench, FaIndianRupeeSign as Rupee, FaHeadset as Headset } from "react-icons/fa6";

export default function About3DCore() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 100, mass: 1 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], [20, -20]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-20, 20]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        };
        const handleMouseLeave = () => {
            mouseX.set(0);
            mouseY.set(0);
        };
        const el = containerRef.current;
        if (el) {
            el.addEventListener('mousemove', handleMouseMove);
            el.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                el.removeEventListener('mousemove', handleMouseMove);
                el.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="relative w-full h-[500px] md:h-[650px] bg-transparent rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-4 group border border-white/10" style={{ perspective: '1200px' }}>
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Glowing Grid */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(147,197,253,0.15) 2px, transparent 2px), linear-gradient(90deg, rgba(147,197,253,0.15) 2px, transparent 2px)',
                    backgroundSize: '40px 40px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
                }}
            />

            <motion.div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
            >
                {/* 1. The Core Brain (PCB Monolith) */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                    }}
                    className="absolute flex items-center justify-center"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="relative w-36 h-48 md:w-48 md:h-64 bg-slate-800/80 backdrop-blur-xl border border-blue-500/40 rounded-3xl shadow-[0_0_80px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center overflow-hidden">
                        {/* Core lines */}
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
                        <div className="absolute rounded-full w-24 h-24 bg-blue-500/20 blur-xl" />

                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                className="absolute -inset-4 border border-dashed border-blue-400/50 rounded-full"
                            />
                            <Microchip className="w-16 h-16 md:w-20 md:h-20 text-blue-400 z-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]" />
                        </div>

                        <div className="mt-6 text-white font-bold tracking-widest uppercase text-[10px] md:text-xs z-10 border border-blue-400/30 px-4 py-1.5 bg-black/40 rounded-full">
                            Custom PCB Core
                        </div>
                    </div>
                </motion.div>

                {/* 2. Orbiting Elements */}

                {/* Orbit 1: Engineering */}
                <motion.div
                    animate={{ rotateZ: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] border border-dashed border-blue-400/20 rounded-full pointer-events-none"
                    style={{ transformStyle: "preserve-3d", transform: "rotateX(75deg)" }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transform: "rotateX(-75deg)" }}>
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg">
                            <Wrench className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                        </div>
                    </div>
                </motion.div>

                {/* Orbit 2: Affordability */}
                <motion.div
                    animate={{ rotateZ: -360 }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="absolute w-[360px] h-[360px] md:w-[500px] md:h-[500px] border border-blue-400/10 rounded-full pointer-events-none"
                    style={{ transformStyle: "preserve-3d", transform: "rotateX(75deg)" }}
                >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" style={{ transform: "rotateX(-75deg)" }}>
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg rotate-12">
                            <Rupee className="w-5 h-5 md:w-7 md:h-7 text-yellow-400" />
                        </div>
                    </div>
                </motion.div>

                {/* Orbit 3: Local Support */}
                <motion.div
                    animate={{ rotateZ: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] border border-blue-400/20 rounded-full pointer-events-none"
                    style={{ transformStyle: "preserve-3d", transform: "rotateY(75deg) rotateX(20deg)" }}
                >
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2" style={{ transform: "rotateY(-75deg) rotateX(-20deg)" }}>
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600/20 backdrop-blur-md border border-blue-400/50 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                            <Headset className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                    </div>
                </motion.div>

                {/* Floating Data Nodes */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, y: [-5, 5, -5] }}
                    transition={{ opacity: { duration: 1 }, scale: { duration: 1 }, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                    className="absolute top-[10%] left-[5%] md:top-[20%] md:left-[10%] bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-xl hover:bg-white/20 transition-colors pointer-events-auto cursor-default"
                    style={{ transform: "translateZ(100px)" }}
                >
                    <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest mb-1 shadow-emerald-400/50">Engineering</div>
                    <div className="text-base md:text-lg text-white font-bold">In-House Design</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, y: [5, -5, 5] }}
                    transition={{ opacity: { duration: 1 }, scale: { duration: 1, delay: 0.2 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.2 } }}
                    className="absolute bottom-[10%] right-[5%] md:bottom-[20%] md:right-[10%] bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-xl hover:bg-white/20 transition-colors pointer-events-auto cursor-default"
                    style={{ transform: "translateZ(150px)" }}
                >
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-widest mb-1 line-clamp-1">Service</div>
                    <div className="text-base md:text-lg text-white font-bold">2-Hour <span className="text-blue-400 font-medium">Response</span></div>
                </motion.div>

            </motion.div>
        </div>
    );
}
