"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm"; // import the form component
import { account } from "@/lib/appwrite"; // Update the import path as per your project structure

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

export default function Contact() {
  const [userId, setUserId] = useState(null);

  // Fetch logged-in user ID for passing to ContactForm if needed
  useEffect(() => {
    account.get()
      .then((user) => setUserId(user.$id))
      .catch(() => setUserId(null));
  }, []);

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

        {/* Use ContactForm component here */}
        <ContactForm userId={userId} />
      </motion.main>
      <Footer />
    </>
  );
}
