"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  HelpCircle,
  Rocket,
  Wifi,
  Smartphone,
  Settings,
  Wrench,
  RefreshCw,
  Download,
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
  Clock,
  X,
} from "lucide-react";

interface HelpItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  solution: string;
  color: string;
  bgColor: string;
}

interface ContactMethod {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  details: string[];
  link?: string;
  color: string;
  bgColor: string;
}

const gettingStarted: HelpItem[] = [
  {
    icon: Rocket,
    title: "How to set up your autommensor home automation system",
    description: "Complete setup guide from unboxing to full control",
    solution: `**Step-by-Step Setup Guide:**

1. **Unbox & Power On**: Connect hub to power outlet near router
2. **Wi-Fi Setup**: Download autommensor app → Scan QR code on hub
3. **Add Devices**: Press 'Add Device' → Follow device-specific pairing
4. **Room Mapping**: Assign devices to rooms via app
5. **Test Controls**: Verify all lights/switches respond

**Pro Tip**: Keep hub within 10m of router for best signal. Takes ~15 mins total.`,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Wifi,
    title: "Connecting devices to Wi-Fi and configuring controls",
    description: "Pair any smart device with your autommensor network",
    solution: `**Wi-Fi Connection Steps:**

1. **Open App** → Devices → Add Device
2. **Device Mode**: Put device in pairing mode (usually hold reset 5s)
3. **Select Network**: Choose your 2.4GHz Wi-Fi (not 5GHz)
4. **Enter Password**: App auto-configures device
5. **Signal Test**: App shows signal strength (aim for 80%+)

**Troubleshooting**:
- Use 2.4GHz network only
- Router should be WPA2 security
- Restart router if connection fails
- Max 15 devices per hub`,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Smartphone,
    title: "Using the mobile app for remote access",
    description: "Control your home from anywhere with our app",
    solution: `**Mobile App Setup:**

**iOS/Android Download**:
• App Store / Play Store → "autommensor"
• Requires iOS 14+ / Android 9+

**Remote Access**:
1. Enable "Remote Control" in Settings
2. Login with same account on all devices
3. Add family members via "Share Access"

**Key Features**:
• Live camera feeds • Voice control (Alexa/Google)
• Schedule automation • Energy usage tracking
• Guest access codes • Motion sensor alerts

**Security**: End-to-end encryption + biometric login`,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const troubleshooting: HelpItem[] = [
  {
    icon: Settings,
    title: "Resolving connectivity issues",
    description: "Fix Wi-Fi drops, offline devices, and network problems",
    solution: `**Connectivity Troubleshooting:**

**Quick Fixes**:
1. **Restart Everything**: Hub → Router → Devices (30s power cycle each)
2. **Check Signal**: App → Network Status (Red = <50% signal)
3. **Reboot Hub**: Settings → Advanced → Restart Hub
4. **Wi-Fi Channel**: Router admin → Set Channel 1, 6, or 11

**Common Issues**:
• **Device Offline**: Move closer to hub (<15m range)
• **Hub Offline**: Check internet + restart router
• **Slow Response**: Reduce 5GHz interference

**When to Call**: 3+ devices offline > 30 mins`,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: RefreshCw,
    title: "Resetting devices securely",
    description: "Safe reset procedures for hub and smart devices",
    solution: `**Safe Reset Procedures:**

**Hub Reset** (keeps your settings):
1. App → Settings → Hub → Restart
2. Wait 2 mins for full reboot

**Factory Reset Hub** (wipes everything):
1. Hold hub reset button 10s (LED flashes red)
2. Re-setup from scratch

**Device Reset**:
• **Lights/Switches**: Hold power button 5s
• **Sensors**: Remove battery 30s, reinsert
• **Cameras**: Settings → Device → Reset

**⚠️ Backup First**: Export settings before factory reset`,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Download,
    title: "Firmware updates and installation tips",
    description: "Keep your system updated and running smoothly",
    solution: `**Firmware Update Guide:**

**Auto Updates** (Recommended):
• App → Settings → Auto Update → ON
• Updates during 2-4 AM (low usage)

**Manual Updates**:
1. App → Hub → Firmware → Check for Updates
2. Download → Install (5-10 mins, devices offline)
3. Hub LED pulses blue during update

**Update Tips**:
• ✅ Stable Wi-Fi required (80%+ signal)
• ✅ Keep hub powered (use UPS)
• ✅ Update 1 device type at a time
• ❌ Don't interrupt (wait 15 mins post-update)

**Latest Version**: v2.3.1 (Dec 2025) - Security + performance`,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
];

const contactMethods: ContactMethod[] = [
  {
    icon: Phone,
    title: "Phone Support",
    details: ["+91-8718847083", "+91-8085782471"],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    details: ["Chat with our team"],
    link: "https://wa.me/918985602913",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Mail,
    title: "Email Support",
    details: ["autommensor@gmail.com"],
    link: "mailto:autommensor@gmail.com",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const HelpClient = () => {
  const [selectedItem, setSelectedItem] = useState<HelpItem | null>(null);

  const closePopup = () => {
    setSelectedItem(null);
  };

  const PopupModal = ({ item }: { item: HelpItem }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md animate-in fade-in zoom-in duration-300">
      <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute -top-4 -right-4 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all duration-300 border-4 border-white/80 hover:border-red-200 z-20"
        >
          <X className="w-7 h-7 text-red-500" />
        </button>

        {/* Modal Content */}
        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-2xl border border-blue-100 p-10 relative overflow-hidden">
          {/* Gradient Header Bar */}
          <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${item.color.replace('text-', 'from-')} via-blue-500 to-blue-600 rounded-t-3xl`}></div>
          
          {/* Icon Header */}
          <div className="flex items-center justify-center mb-8">
          <div className={`w-24 h-24 ${item.bgColor} rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/50`}>
  <item.icon className={`${item.color.replace('text-', '')} drop-shadow-2xl w-10 h-10`} strokeWidth={1.5} />
</div>

          </div>

          <h3 className="text-3xl font-black text-center bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 px-4 leading-tight">
            {item.title}
          </h3>

          <div className="text-xl text-gray-700 leading-relaxed mb-10 text-center max-w-2xl mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: item.solution.replace(/\n/g, '<br/>') }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 mix-blend-multiply filter blur-3xl opacity-20 w-[600px] h-[600px] -top-20 -left-24 animate-floatSlow" />
        <div className="absolute rounded-full bg-gradient-to-br from-orange-100 to-rose-200 mix-blend-multiply filter blur-3xl opacity-15 w-[500px] h-[500px] -bottom-28 -right-24 animate-floatSlow animation-delay-2000" />
        <div className="absolute inset-0 bg-grid-pattern opacity-3" />
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 px-6 border-b border-purple-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <HelpCircle className="w-10 h-10" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Help & Support
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Welcome to the autommensor Help Center. Find answers to common
            questions, troubleshooting guides, and contact details for further
            assistance.
          </motion.p>
        </div>
      </motion.div>

      <div className="relative px-6 py-16">
        <motion.main
          className="max-w-6xl mx-auto space-y-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >

          {/* Contact Support Section */}
          <motion.section
            className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-3xl p-8 md:p-12 shadow-xl border border-blue-200"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-center">
              Contact Support
            </h2>
            <p className="text-slate-700 text-lg mb-12 text-center max-w-2xl mx-auto font-light">
              If you can&apos;t find what you need here, please reach out to our
              support team. We&apos;re here to help!
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl ${method.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${method.color}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900">
                      {method.title}
                    </h3>
                    <div className="space-y-2">
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-slate-700 font-medium">
                          {method.link ? (
                            <a
                              href={method.link}
                              className={`${method.color} hover:underline inline-flex items-center gap-2 group/link`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {detail}
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Quick Response Card */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-orange-600" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-slate-900">
                Quick Response
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4 font-light">
              We typically respond to all inquiries within 2 hours during
              business hours. For urgent matters, please call us directly.
            </p>
            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
              <p className="text-sm font-semibold text-orange-800 mb-1">
                Emergency Support
              </p>
              <p className="text-orange-600 font-bold">+91-7987814261</p>
            </div>
          </motion.div>

          {/* Getting Started Section - Clickable */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-3">
              <Rocket className="w-8 h-8 text-blue-600" />
              Getting Started
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {gettingStarted.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 hover:border-blue-300 cursor-pointer relative overflow-hidden"
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-2xl ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent
                          className={`w-8 h-8 ${item.color}`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    {/* Click Indicator */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Troubleshooting Section - Clickable */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-3">
              <Wrench className="w-8 h-8 text-orange-600" />
              Troubleshooting
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {troubleshooting.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 hover:border-blue-300 cursor-pointer relative overflow-hidden"
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-2xl ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent
                          className={`w-8 h-8 ${item.color}`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    {/* Click Indicator */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </motion.main>
      </div>

      {/* Popup Modal */}
      {selectedItem && <PopupModal item={selectedItem} />}

      <style jsx>{`
        @keyframes floatSlow {
         0%,
         100% {
           transform: translateY(0) translateX(0);
         }
         50% {
           transform: translateY(-20px) translateX(15px);
         }
        }
        .animate-floatSlow {
         animation: floatSlow 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
         animation-delay: 2s;
        }
        .bg-grid-pattern {
         background-image: radial-gradient(
           circle,
           rgba(59, 130, 246, 0.08) 1px,
           transparent 1px
         );
         background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default HelpClient;
