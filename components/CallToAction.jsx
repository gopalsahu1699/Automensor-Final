import React from 'react'
import Link from 'next/link';

function CallToAction() {
  return (
    <>  <section id="cta" className="bg-[#003366] text-white py-20 text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build the Future Together</h2>
            <p className="text-lg text-gray-300 mb-8">
              Join hundreds of innovators who trust Automensor to power smart homes and buildings.
            </p>

            <Link
              href="/contact-us"
              className="inline-block bg-white text-[#003366] px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transform hover:scale-105 transition"
            >
              Contact Us
            </Link>
          </div>
        </section>
        </>
  )
}

export default CallToAction