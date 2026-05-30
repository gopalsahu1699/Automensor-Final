"use client";

import React, { useState } from "react";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch {
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-28">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden py-stack-xl">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <img
            src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/contact-hero.jpg"
            alt="Smart Home Control"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20 mb-stack-sm">
            <span className="material-symbols-outlined text-electric-blue text-[18px]">verified</span>
            <span className="text-label-sm font-label-sm text-electric-blue uppercase tracking-widest">Home Automation Chhattisgarh</span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-surface mb-6 max-w-4xl mx-auto">
            Get in Touch with Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-glow-cyan">Smart Home Experts</span>
          </h1>
          <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-md">
            Ready to transform your living space into a futuristic sanctuary? Our team in Bilaspur and Raipur is ready to design your perfect automated ecosystem.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-gutter">
            <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-xl">
              <span className="material-symbols-outlined text-success-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <span className="font-label-md text-label-md">Free Site Visits in Bilaspur &amp; Raipur</span>
            </div>
            <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-xl">
              <span className="material-symbols-outlined text-electric-blue" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
              <span className="font-label-md text-label-md">24/7 Local Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-stack-lg bg-surface-container-lowest/50">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Contact Form */}
            <div className="lg:col-span-7 glass-card p-8 md:p-12 rounded-[2rem]">
              <h2 className="font-headline-md text-base md:text-headline-md text-on-surface mb-8">Send a Message</h2>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-success-emerald/10 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-success-emerald text-[20px] md:text-[32px]">check_circle</span>
                  </div>
                  <h3 className="font-headline-sm text-lg md:text-headline-sm text-on-surface mb-2">Message Sent!</h3>
                  <p className="text-on-surface-variant font-body-md">Thank you for reaching out. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant ml-1">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe"
                      className="w-full bg-midnight-slate border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-on-surface placeholder:text-on-surface-variant/40" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant ml-1">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com"
                      className="w-full bg-midnight-slate border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-on-surface placeholder:text-on-surface-variant/40" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant ml-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 00000 00000"
                      className="w-full bg-midnight-slate border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-on-surface placeholder:text-on-surface-variant/40" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant ml-1">Service Interested In</label>
                    <select name="service" value={formData.service} onChange={handleChange}
                      className="w-full bg-midnight-slate border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-on-surface appearance-none">
                      <option value="">Select a service</option>
                      <option value="lighting">Lighting Automation</option>
                      <option value="security">Security Systems</option>
                      <option value="full">Full Home Automation</option>
                      <option value="climate">Climate Control</option>
                      <option value="theater">Home Theater</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-label-md text-label-md text-on-surface-variant ml-1">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder="How can we help you?"
                      className="w-full bg-midnight-slate border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all text-on-surface placeholder:text-on-surface-variant/40 resize-none" />
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <button type="submit"
                      className="w-full bg-gradient-to-r from-primary-container to-electric-blue text-on-primary-container py-4 rounded-xl font-headline-sm text-lg md:text-headline-sm font-bold shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all active:scale-[0.98]">
                      Send Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Showroom Card */}
              <div className="glass-card p-5 rounded-2xl md:p-8 md:rounded-[2rem] group hover:border-electric-blue/50 transition-colors">
                <div className="flex items-start gap-5">
                  <div className="bg-electric-blue/10 p-4 rounded-2xl flex-shrink-0">
                    <span className="material-symbols-outlined text-electric-blue text-[20px] md:text-[32px]">storefront</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-lg md:text-headline-sm text-on-surface mb-2">Visit Our Showroom</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Seepat, Bilaspur, Chhattisgarh, India - 495559</p>
                    <a href="https://maps.google.com/?q=Seepat+Bilaspur+Chhattisgarh" target="_blank" rel="noopener noreferrer"
                      className="mt-4 text-electric-blue font-label-md text-label-md flex items-center gap-2 group-hover:gap-3 transition-all inline-flex">
                      Get Directions <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Call/WhatsApp Card */}
              <div className="glass-card p-5 rounded-2xl md:p-8 md:rounded-[2rem] group hover:border-electric-blue/50 transition-colors">
                <div className="flex items-start gap-5">
                  <div className="bg-success-emerald/10 p-4 rounded-2xl flex-shrink-0">
                    <span className="material-symbols-outlined text-success-emerald text-[20px] md:text-[32px]">chat_bubble</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-lg md:text-headline-sm text-on-surface mb-2">Call or WhatsApp</h3>
                    <div className="space-y-1">
                      <p className="font-body-md text-body-md text-on-surface-variant">+91-8718847083</p>
                      <p className="font-body-md text-body-md text-on-surface-variant">+91-8085782471</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="glass-card p-5 rounded-2xl md:p-8 md:rounded-[2rem] group hover:border-electric-blue/50 transition-colors">
                <div className="flex items-start gap-5">
                  <div className="bg-tertiary/10 p-4 rounded-2xl flex-shrink-0">
                    <span className="material-symbols-outlined text-tertiary text-[20px] md:text-[32px]">alternate_email</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-lg md:text-headline-sm text-on-surface mb-2">Email Us</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">autommensor@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[250px] md:h-[400px] bg-surface-container-high relative overflow-hidden">
        <div className="absolute inset-0 z-0 grayscale opacity-40 hover:opacity-60 transition-opacity duration-700">
          <img src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/map-bilaspur.jpg" alt="Bilaspur Map" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-midnight-slate/80 backdrop-blur-md px-4 py-2 md:px-8 md:py-4 rounded-full border border-electric-blue/30 shadow-2xl">
            <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-electric-blue" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              Autommensor Showroom, Seepat Bilaspur
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
