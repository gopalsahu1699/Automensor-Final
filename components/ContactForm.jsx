"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Client, Databases, ID, Account } from "appwrite";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_REQUEST_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_REQUEST_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "",
  });
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch logged-in user ID
  useEffect(() => {
    account.get()
      .then((user) => setUserId(user.$id))
      .catch(() => setUserId(null));
  }, []);

  // Handle form input changes including select type
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-hide status message after 5 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Submit form data including type attribute
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
        type: formData.type,
        status: "new",
      });

      setStatus("Request received, Our team will get back soon");
      setFormData({ name: "", email: "", phone: "", message: "", type: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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

      {/* Type Dropdown */}
      <label htmlFor="type" className="block mb-6">
        <span className="block text-gray-800 mb-2 font-semibold">Type</span>
        <select
          id="type"
          name="type"
          required
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition shadow-sm"
          disabled={loading}
        >
          <option value="">Select type</option>
          <option value="1bhk">1 BHK</option>
          <option value="2bhk">2 BHK</option>
          <option value="3bhk">3 BHK</option>
          <option value="villa">Villa</option>
          <option value="hotel">Hotel</option>
          <option value="other">Other</option>
        </select>
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
            status.includes("Request received") ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </motion.p>
      )}
    </form>
  );
}
