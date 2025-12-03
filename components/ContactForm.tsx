"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Client, Databases, ID, Account } from "appwrite";
import { Loader, Mail } from "lucide-react";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_REQUEST_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_REQUEST_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
}

type StatusType = string | null;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "",
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusType>(null);
  const [loading, setLoading] = useState(false);

  // Fetch logged-in user ID
  useEffect(() => {
    account
      .get()
      .then((user) => setUserId(user.$id))
      .catch(() => setUserId(null));
  }, []);

  // Handle form input changes including select type
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-hide status message after 10 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Submit form data including type attribute
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    try {
      if (!DATABASE_ID || !COLLECTION_ID) {
        throw new Error("Database configuration missing");
      }

      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          userId: userId || "anonymous",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          type: formData.type,
          status: "new",
          submittedAt: new Date().toISOString(),
        }
      );

      setStatus("✅ Request received, Our team will get back soon!");
      setFormData({ name: "", email: "", phone: "", message: "", type: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus(
        "❌ Failed to send message. Please try again or call us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-gray-800 mb-2 font-semibold">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border bg-white text-black  border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm"
          placeholder="Your full name"
          disabled={loading}
          autoComplete="name"
        /> 
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-gray-800 mb-2 font-semibold">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border bg-white text-black border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm"
          placeholder="you@example.com"
          disabled={loading}
          autoComplete="email"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-gray-800 mb-2 font-semibold">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full border bg-white text-black border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm"
          placeholder="+91-XXXXXXXXXX"
          disabled={loading}
          autoComplete="tel"
        />
      </div>

      {/* Type Dropdown */}
      <div>
        <label htmlFor="type" className="block text-gray-800 mb-2 font-semibold">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          required
          value={formData.type}
          onChange={handleChange}
          className="w-full border bg-white text-black border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm bg-white"
          disabled={loading}
        >
          <option value="">Select property type</option>
          <option value="1bhk">1 BHK</option>
          <option value="2bhk">2 BHK</option>
          <option value="3bhk">3 BHK</option>
          <option value="villa">Villa</option>
          <option value="hotel">Hotel</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-gray-800 mb-2 font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full border bg-white text-black border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm resize-none"
          placeholder="Tell us about your requirement..."
          disabled={loading}
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className={`w-full py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed opacity-70"
            : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg"
        }`}
      >
        {loading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Mail className="w-5 h-5" />
            <span>Send Message</span>
          </>
        )}
      </motion.button>

      {/* Status Message */}
      {status && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`p-4 rounded-lg text-center font-medium ${
            status.includes("✅")
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {status}
        </motion.div>
      )}
    </form>
  );
}
