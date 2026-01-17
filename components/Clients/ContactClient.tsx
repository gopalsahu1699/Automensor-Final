"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

/* ------------------ Types ------------------ */
interface ContactInfo {
  icon: React.ElementType;
  title: string;
  details: string[];
  links?: string[];
}

/* ------------------ Contact Data ------------------ */
const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 8718847083", "+91 8085782471"],
    links: ["tel:+918718847083", "tel:+918085782471"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["autommensor@gmail.com"],
    links: ["mailto:autommensor@gmail.com"],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Chat",
    details: ["Chat with us on WhatsApp"],
    links: ["https://wa.me/918718847083"],
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["Chhattisgarh, India"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday – Saturday | 9:00 AM – 6:00 PM"],
  },
];

/* ------------------ Component ------------------ */
export default function ContactClient() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ------------------ Hero Section ------------------ */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Get in Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Connect with Autommensor for smart home automation solutions,
            expert guidance, and local support across Chhattisgarh.
          </motion.p>
        </div>
      </section>

      {/* ------------------ Contact Cards ------------------ */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white border rounded-2xl p-6 hover:shadow-sm"
              >
                <Icon className="w-7 h-7 text-blue-600 mb-4" />

                <h3 className="font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>

                {item.details.map((text, i) =>
                  item.links ? (
                    <a
                      key={i}
                      href={item.links[i]}
                      target={
                        item.links[i]?.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel="noopener noreferrer"
                      className="block text-sm font-medium text-blue-600 hover:underline"
                    >
                      {text}
                    </a>
                  ) : (
                    <p key={i} className="text-sm text-slate-600">
                      {text}
                    </p>
                  )
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      
    </div>
  );
}
