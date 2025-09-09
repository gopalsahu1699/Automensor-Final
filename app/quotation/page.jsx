"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm"; // import the new form component
import { account } from "@/lib/appwrite";


const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

export default function QuotationPage() {
  const [userId, setUserId] = useState(null);

  // Fetch logged-in user ID to pass down if needed
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
          Request Your Personalized Smart Home Quote
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="max-w-xl text-center mb-12 text-lg text-gray-700"
        >
          Fill out the form below with your details and requirements. Our expert team will provide a customized quote tailored to your home.
        </motion.p>

        {/* Use QuotationForm component here */}
             <ContactForm userId={userId} />
      </motion.main>
      <Footer />
    </>
  );
}
