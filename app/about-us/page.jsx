'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function About() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen flex flex-col items-center px-6 py-16 bg-white text-gray-800"
        aria-label="About Automensor"
      >
        <h1 className="text-4xl font-bold mb-6">About Us</h1>

        <p className="max-w-3xl text-lg mb-6 leading-relaxed text-center">
          Welcome to Automensor, your trusted partner in smart home and building automation. We deliver cutting-edge Wi-Fi based solutions that require no special wiring and provide seamless integration across devices.
        </p>

        <div className="max-w-4xl space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To revolutionize the way people interact with their living and working spaces via innovative, secure, and user-friendly automation technologies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
              <li>Customer-Centric Design</li>
              <li>Reliability and Security</li>
              <li>Scalable and Modular Hardware and Software</li>
              <li>Continuous Innovation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Team</h2>
            <p className="text-gray-700 leading-relaxed">
              Our passionate team of engineers, designers, and support staff work tirelessly to create seamless solutions for smart environments.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
