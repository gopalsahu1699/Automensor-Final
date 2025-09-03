'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending...');
    try {
      // Simulated API call
      await new Promise((res) => setTimeout(res, 1500));
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-white text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-50 p-8 rounded shadow"
          noValidate
        >
          <label htmlFor="name" className="block mb-4">
            <span className="block text-gray-700 mb-2">Name</span>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your name"
              disabled={loading}
            />
          </label>

          <label htmlFor="email" className="block mb-4">
            <span className="block text-gray-700 mb-2">Email</span>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your email"
              disabled={loading}
            />
          </label>

          <label htmlFor="message" className="block mb-6">
            <span className="block text-gray-700 mb-2">Message</span>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Write your message"
              disabled={loading}
            />
          </label>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-3 rounded transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
}
