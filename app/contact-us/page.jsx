// app/contact/page.jsx
'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can add API call to send form data to your backend/email service
    setStatus('Sending...');
    try {
      // Mock delay
      await new Promise(res => setTimeout(res, 1500));
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
     <>
     <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-lg bg-gray-50 p-8 rounded shadow"
      >
        <label className="block mb-4">
          <span className="block text-gray-700 mb-2">Name</span>
          <input 
            type="text" 
            name="name" 
            required 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Your name"
          />
        </label>

        <label className="block mb-4">
          <span className="block text-gray-700 mb-2">Email</span>
          <input 
            type="email" 
            name="email" 
            required 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Your email"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-gray-700 mb-2">Message</span>
          <textarea
            name="message"
            required
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Write your message"
          />
        </label>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>

        {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
      </form>
    </div>
   
    <Footer />
    </>
  );
}
