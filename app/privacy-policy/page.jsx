import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function PrivacyPolicy() {
  return (
    <>
    <Navbar />
    <main className="max-w-4xl mx-auto px-6 py-16 bg-white text-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      <section className="space-y-6 text-lg leading-relaxed">
        <p>
          At AUTOMENSOR, your privacy is paramount. This Privacy Policy explains how we collect, use, protect, and disclose your personal information when you use our home automation products and services.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as your name, email address, and usage data from your devices to deliver personalized smart home experiences.
        </p>
        <h2 className="text-2xl font-semibold mt-8">How We Use Your Information</h2>
        <p>
          Your information helps us provide and improve our services, manage your account, communicate important updates, and ensure security.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Data Protection</h2>
        <p>
          We implement strict security measures to safeguard your data from unauthorized access and ensure compliance with applicable privacy laws.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. For any privacy-related requests, please contact our support team.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or how your data is handled, please reach out at{" "}
          <a href="mailto:privacy@automensor.com" className="text-blue-600 hover:underline">
            privacy@automensor.com
          </a>.
        </p>
      </section>
    </main>
    <Footer />
    </>
  );
}

export default PrivacyPolicy;
