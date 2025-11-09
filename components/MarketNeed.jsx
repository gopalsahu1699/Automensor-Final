"use client";

import React, { useState, useEffect } from "react";
import { getMarketNeeds } from "@/lib/appwrite";

function MarketNeed() {
  const [marketNeedData, setMarketNeedData] = useState(null);
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNeeds() {
      try {
        setLoading(true);
        const documents = await getMarketNeeds();
        
        // Find the market_need section
        const marketNeedDoc = documents.find(doc => doc.section === "market_need");
        
        if (marketNeedDoc) {
          setMarketNeedData({
            title: marketNeedDoc.head_title,
            description: marketNeedDoc.head_description
          });
          
          // Parse the row_data JSON string
          if (marketNeedDoc.row_data) {
            const parsedNeeds = JSON.parse(marketNeedDoc.row_data);
            setNeeds(parsedNeeds);
          }
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching market needs:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchNeeds();
  }, []);

  if (loading) {
    return (
      <section id="needs" className="bg-gradient-to-b from-blue-50 to-white py-20">
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
      <section id="needs" className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="needs" className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-900 border-b-4 border-blue-400 pb-2 max-w-md mx-auto drop-shadow-sm">
          {marketNeedData?.title || "Why Smart Homes Are the Future"}
        </h2>
        <p className="max-w-4xl mx-auto text-center text-gray-700 mb-16 text-lg leading-relaxed">
          {marketNeedData?.description || "Upgrade your lifestyle with smart technology."}
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {needs.map((item, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition duration-300 ease-in-out"
              tabIndex={0}
              aria-label={item.title}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-700">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketNeed;
