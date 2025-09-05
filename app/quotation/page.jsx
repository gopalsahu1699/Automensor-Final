"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Client, Databases, ID } from "appwrite";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Your project ID

const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID; // Your database ID
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID; // Your collection ID for quotations

const QuotationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    homeSize: "",
    roomCount: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    if (!formData.name || !formData.email) {
      setError("Please fill in your name and email.");
      setSubmitting(false);
      return;
    }

    try {
      // Create a new document in Appwrite database collection
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        name: formData.name,
        email: formData.email,
        homeSize: formData.homeSize,
        roomCount: formData.roomCount,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        homeSize: "",
        roomCount: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12"
      >
        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-900">
          Get Your Personalized Home Automation Quote
        </h1>
        <p className="text-center text-lg text-gray-700 mb-10">
          Unlock the true potential of your smart home with a customized quote
          based on your home size, number of rooms, and preferred smart devices.
          Start transforming your living space today!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-800 font-semibold mb-1"
            >
              Full Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-800 font-semibold mb-1"
            >
              Email Address <span className="text-orange-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="Phone Number"
              className="block text-gray-800 font-semibold mb-1"
            >Phone Number
               <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="homeSize"
                className="block text-gray-800 font-semibold mb-1"
              >
                Which Best Describes Your Home
              </label>
              <select
                id="homeSize"
                name="homeSize"
                value={formData.homeSize}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select type</option>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
                <option value="villa">Villa</option>
                <option value="villa">Hotel</option>
                <option value="villa">other</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-800 font-semibold mb-1"
            >
              Additional Details (optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Describe your requirements or questions"
            />
          </div>

          {error && <p className="text-red-600 font-semibold">{error}</p>}
          {success && (
            <p className="text-green-600 font-semibold">
              Your request has been saved successfully!
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-orange-600 text-white py-3 rounded-md font-semibold text-lg transition-colors duration-300 hover:bg-orange-700 disabled:opacity-50`}
          >
            {submitting ? "Saving..." : "Request Quote"}
          </button>
        </form>
      </motion.main>
      <Footer />
    </>
  );
};

export default QuotationPage;
