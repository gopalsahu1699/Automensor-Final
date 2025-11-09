"use client";

import React, { useState, useEffect } from "react";
import { databases } from "@/lib/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

function WhyAutomensor() {
  const [sectionData, setSectionData] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch all documents
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        
        // Find the why_automensor section
        const doc = response.documents.find(d => d.section === "why_automensor");
        
        if (doc) {
          setSectionData({
            title: doc.head_title,
            description: doc.head_description,
          });
          
          // Parse row_data JSON string
          if (doc.row_data) {
            const parsedBenefits = JSON.parse(doc.row_data);
            setBenefits(parsedBenefits);
          }
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching benefits:", err);
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="benefits" className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-xl text-gray-600 animate-pulse">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="benefits" className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="benefits" className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 border-b-4 border-blue-400 pb-2 max-w-md mx-auto drop-shadow-sm">
          {sectionData?.title || "Why Choose Automensor?"}
        </h2>
        <p className="max-w-4xl mx-auto text-center text-black mb-16 text-lg leading-relaxed">
          {sectionData?.description || "Discover the smart home solutions designed for convenience, security, and energy efficiency."}
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition duration-300 ease-in-out"
              tabIndex={0}
              aria-label={benefit.title}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-700">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyAutomensor;
