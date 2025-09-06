"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Client, Databases, ID, Account } from "appwrite";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_REQUEST_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_REQUEST_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // ✅ replace with your endpoint if different
  .setProject(PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch logged-in user
  useEffect(() => {
    account.get().then(
      (user) => setUserId(user.$id),
      (error) => {
        console.warn("User not logged in:", error.message);
      }
    );
  }, []);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Auto-hide status message
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        userId: userId || "anonymous",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        status: "new", // ✅ fixed comma
      });

      setStatus("✅ Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br from-blue-50 to-white text-gray-900"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl font-extrabold mb-8 text-center text-blue-700 max-w-xl"
        >
          Get in Touch With Automensor
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="max-w-xl text-center mb-12 text-lg text-gray-700"
        >
          Have questions or want a personalized solution? Fill out the form below
          and our expert team will respond promptly to help you build your smart home future.
        </motion.p>

        {/* ✅ Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-10 rounded-xl shadow-lg ring-1 ring-blue-200"
        >
          {/* Name */}
          <label htmlFor="name" className="block mb-6">
            <span className="block text-gray-800 mb-2 font-semibold">Name</span>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition shadow-sm"
              placeholder="Your full name"
              disabled={loading}
              autoComplete="name"
            />
          </label>

          {/* Email */}
          <label htmlFor="email" className="block mb-6">
            <span className="block text-gray-800 mb-2 font-semibold">Email</span>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition shadow-sm"
              placeholder="you@example.com"
              disabled={loading}
              autoComplete="email"
            />
          </label>

          {/* Phone */}
          <label htmlFor="phone" className="block mb-6">
            <span className="block text-gray-800 mb-2 font-semibold">Phone Number</span>
            <input
              id="phone"
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition shadow-sm"
              placeholder="Your phone number"
              disabled={loading}
              autoComplete="tel"
            />
          </label>

          {/* Message */}
          <label htmlFor="message" className="block mb-8">
            <span className="block text-gray-800 mb-2 font-semibold">Message</span>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition shadow-sm resize-none"
              placeholder="Write your message here..."
              disabled={loading}
            />
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-800"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`mt-6 text-center text-sm ${
                status.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </motion.p>
          )}
        </form>
      </motion.main>
      <Footer />
    </>
  );
}
