"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  User,
  Smartphone,
  CheckCircle2
} from "lucide-react";

/* ------------------ Types ------------------ */
interface ContactInfo {
  icon: React.ElementType;
  title: string;
  details: string[];
  links?: string[];
  color: string;
}

/* ------------------ Contact Data ------------------ */
const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 8718847083", "+91 8085782471"],
    links: ["tel:+918718847083", "tel:+918085782471"],
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["autommensor@gmail.com"],
    links: ["mailto:autommensor@gmail.com"],
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: ["Chat with us"],
    links: ["https://wa.me/918718847083"],
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MapPin,
    title: "Bilaspur Office",
    details: ["Vyapar Vihar Rd, Talapara,", "Bilaspur, Chhattisgarh 495001"],
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: MapPin,
    title: "Raipur Office",
    details: ["Centre Mall, Orange Eye Resort,", "Mandi Rd, Piche, Devendra Nagar,", "Raipur, Chhattisgarh 492004"],
    color: "bg-red-100 text-red-600",
  },
];

/* ------------------ Component ------------------ */
export default function ContactClient() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/autommensor@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          phone: formState.phone,
          email: formState.email,
          message: formState.message,
          _subject: "New Lead from Autommensor Website!",
          _template: "table"
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Something went wrong. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ------------------ Hero Section ------------------ */}
      <section className="relative bg-white pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100 to-purple-100 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-100 to-blue-50 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-medium text-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for New Projects in Chhattisgarh
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
          >
            Let's Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Smart Home Dream
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Get a free consultation and quote for your home automation needs in Bilaspur and Raipur.
          </motion.p>
        </div>
      </section>

      {/* ------------------ Content Section ------------------ */}
      <section className="container mx-auto px-6 pb-24 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid lg:grid-cols-5 h-full">

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 bg-slate-900 text-white p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-600 opacity-10 pattern-grid-lg"></div>

              <h3 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h3>
              <p className="text-slate-300 mb-10 relative z-10">Fill up the form and our team will get back to you within 24 hours.</p>

              <div className="space-y-8 relative z-10">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className={`p-3 rounded-lg bg-white/10 backdrop-blur-sm`}>
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">{item.title}</h4>
                        <div className="text-slate-300 text-sm space-y-1">
                          {item.details.map((detail, i) => (
                            <div key={i}>{detail}</div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-20 relative z-10">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="font-semibold">Business Hours</span>
                  </div>
                  <p className="text-slate-400 text-sm pl-8">Monday – Saturday</p>
                  <p className="text-slate-400 text-sm pl-8">9:00 AM – 6:00 PM</p>
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 p-10 md:p-14 bg-white">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h4>
                  <p className="text-slate-600 max-w-md">Thank you for reaching out. Our team will contact you shortly to discuss your smart home requirements.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-blue-600 font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Message</label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                        placeholder="Tell us about your home and what automation you are looking for..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ------------------ Map / Location Section ------------------ */}
      <section className="container mx-auto px-6 pb-20">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">We Serve All of Chhattisgarh</h3>
          <p className="text-slate-600 mb-6">Our team is  ready to visit your site.</p>

          {/* Map Placeholder or IFrame could go here */}
          {/* <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center relative group cursor-pointer">
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=22.0797,82.1409&zoom=7&size=1200x400&maptype=roadmap&key=YOUR_API_KEY_HERE')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />

            <div className="relative z-10 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg flex items-center gap-3">
              <MapPin className="w-6 h-6 text-red-500 animate-bounce" />
              <span className="font-semibold text-slate-800">Bilaspur  Headquarters</span>
            </div>
          </div> */}
        </div>
      </section>


    </div>
  );
}
