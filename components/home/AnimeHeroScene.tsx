"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaLightbulb as Lightbulb, FaFan as Fan, FaLock as Lock, FaShieldHalved as ShieldCheck, FaTemperatureHalf as Thermometer, FaBatteryFull as BatteryCharging, FaChevronUp as ChevronUp } from "react-icons/fa6";

export default function AnimeHeroScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 100, mass: 1 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Parallax tilts for the whole container
    const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

    // Track mouse move for parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
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

    // Animated temperature gauge
    const [temp, setTemp] = useState(22);
    useEffect(() => {
        const interval = setInterval(() => {
            setTemp(prev => prev === 22 ? 24 : prev === 24 ? 20 : 22);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[500px] md:h-[650px] bg-[#020817] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center p-4 group" style={{ perspective: '1200px' }}>

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <motion.div
                className="relative w-full h-full flex items-center justify-center mt-10"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
            >
                {/* 1. Base Isometric Grid Floor */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transform: "translateZ(-100px) rotateX(60deg) rotateZ(45deg)", transformStyle: "preserve-3d" }}
                >
                    <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-blue-900/30 flex items-center justify-center relative shadow-[0_0_100px_rgba(59,130,246,0.1)]">
                        {/* Concentric rings */}
                        <div className="absolute w-[70%] h-[70%] rounded-full border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]" />
                        <div className="absolute w-[40%] h-[40%] rounded-full border border-blue-400/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-[spin_15s_linear_infinite]" />

                        {/* Crosshairs */}
                        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
                    </div>
                </motion.div>

                {/* 2. Center Hub */}
                <div className="absolute" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
                        className="relative"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="relative w-28 h-28 md:w-36 md:h-36 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:shadow-[0_0_80px_rgba(59,130,246,0.6)] cursor-pointer transition-shadow"
                        >
                            {/* Pulse rings */}
                            <div className="absolute inset-0 rounded-full border border-blue-400 opacity-30 animate-ping" style={{ animationDuration: '3s' }} />
                            <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-blue-400 mb-2" />
                            <div className="text-white text-[10px] md:text-sm font-bold tracking-widest uppercase">Safe Home</div>
                            <div className="absolute -bottom-3 bg-gradient-to-r from-emerald-400 to-green-500 px-3 py-1 rounded-full text-[10px] md:text-xs text-white font-bold shadow-lg shadow-emerald-500/20">Secured</div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* 3. Glass Cards in 3D Space */}

                {/* Card 1: Climate Control */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                    className="absolute top-[5%] left-[5%] md:top-[15%] md:left-[10%] w-40 md:w-48 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/10 transition-colors"
                    style={{ transform: "translateZ(80px)" }}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Thermometer className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Climate</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl text-white font-light tracking-tighter">{temp}°</span>
                        <span className="text-sm text-blue-400 mb-1 font-medium">Auto</span>
                    </div>
                    <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            animate={{ width: temp === 22 ? '50%' : temp === 24 ? '70%' : '30%' }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                </motion.div>

                {/* Card 2: Smart Lighting */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
                    className="absolute bottom-[5%] left-[5%] md:bottom-[15%] md:left-[10%] w-40 md:w-48 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/10 transition-colors"
                    style={{ transform: "translateZ(60px)" }}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lights</span>
                    </div>
                    <div className="text-white font-medium text-sm mb-1">Living Room</div>
                    <div className="text-xs text-slate-400 mb-3">75% Brightness</div>
                    <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`h-6 w-full rounded-sm ${i <= 4 ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]' : 'bg-slate-800'}`} />
                        ))}
                    </div>
                </motion.div>

                {/* Card 3: Security / Lock */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
                    className="absolute top-[5%] right-[5%] md:top-[15%] md:right-[10%] w-36 md:w-44 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/10 transition-colors"
                    style={{ transform: "translateZ(100px)" }}
                >
                    <div className="flex flex-col items-center justify-center py-2">
                        <div className="relative mb-3">
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30"
                            >
                                <Lock className="w-5 h-5 text-white" />
                            </motion.div>
                        </div>
                        <div className="text-white font-bold tracking-wide">Front Door</div>
                        <div className="text-[10px] text-indigo-300 mt-1 uppercase font-bold tracking-widest bg-indigo-500/20 px-3 py-1 rounded-full">Locked</div>
                    </div>
                </motion.div>

                {/* Card 4: Energy Stats */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100 }}
                    className="absolute bottom-[5%] right-[5%] md:bottom-[15%] md:right-[10%] w-44 md:w-52 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/10 transition-colors"
                    style={{ transform: "translateZ(120px)" }}
                >
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <BatteryCharging className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                            <ChevronUp className="w-3 h-3" /> 12%
                        </div>
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Energy Saved</div>
                    <div className="text-3xl text-white font-bold tracking-tighter">142<span className="text-sm text-slate-400 font-medium tracking-normal ml-1">kWh</span></div>

                    {/* Mini chart */}
                    <div className="flex items-end gap-1 mt-3 h-8 w-full">
                        {[40, 60, 30, 80, 50, 90, 100].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                                className="w-full bg-gradient-to-t from-emerald-600/50 to-emerald-400 rounded-t-sm"
                            />
                        ))}
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
