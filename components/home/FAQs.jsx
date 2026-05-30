"use client";
import React from "react";
import Link from "next/link";

const faqItems = [
  {
    question: "Is wireless home automation reliable for large homes?",
    answer: "Absolutely. Our systems use advanced mesh networking technology designed for maximum reliability across multiple floors. We ensure consistent connectivity for every smart light and security sensor in your Chhattisgarh home.",
  },
  {
    question: "Does retrofit home automation require breaking walls?",
    answer: "No, that's the beauty of our system. It is designed to fit directly into your existing electrical switch boxes. There is zero wall-breaking, zero dust, and zero structural changes required for installation.",
  },
  {
    question: "How long is the warranty and where is support located?",
    answer: "We provide a market-leading 10-year warranty on our premium hardware. Our local support teams are stationed in Raipur and Bilaspur, ensuring we can reach any project in Chhattisgarh for maintenance within 24 hours.",
  },
  {
    question: "How much does home automation cost in Bilaspur?",
    answer: "Autommensor offers flexible packages starting from ₹15,000 for basic smart lighting setups. Our standard and advanced packages range from ₹40,000 to ₹1,00,000+ depending on the number of rooms and devices. We offer a free site visit in Bilaspur to give you an exact quote tailored to your home.",
  },
  {
    question: "Do I need to rewire my house for smart home automation?",
    answer: "No, Autommensor specializes in wireless home automation that requires zero rewiring. Our systems are retrofitted directly into your existing switch boxes without any wall-breaking or structural changes. This makes installation quick, clean, and affordable for homeowners across Chhattisgarh.",
  },
  {
    question: "Can I control my smart home with Alexa in India?",
    answer: "Yes! Autommensor systems are fully compatible with Alexa and Google Home. You can use voice commands in English or Hindi to control lights, fans, ACs, curtains, and security devices. Our setup works seamlessly across Bilaspur, Raipur, and all of Chhattisgarh.",
  },
  {
    question: "What is the price of a video door phone in Bilaspur?",
    answer: "Autommensor offers video door phones starting from ₹8,000 in Bilaspur. Prices vary based on screen size, camera quality, and features like night vision and two-way audio. Contact us for a free consultation and site visit to find the best solution for your home.",
  },
  {
    question: "What areas do you serve in Chhattisgarh?",
    answer: "Autommensor serves all major cities in Chhattisgarh including Bilaspur, Raipur, Durg, Bhilai, Korba, Raigarh, and Jagdalpur. Our local teams provide installation, support, and maintenance across the state. We also offer free site visits in Bilaspur and Raipur.",
  },
  {
    question: "Do you offer warranty on home automation systems?",
    answer: "Yes, Autommensor provides an industry-leading 10-year warranty on all premium hardware. This covers smart switches, controllers, and sensors. Our warranty includes free replacement and maintenance support through our local teams in Bilaspur and Raipur, Chhattisgarh.",
  },
];

export default function FAQs() {
  return (
    <section className="py-10 md:py-stack-xl bg-surface-container-lowest/20">
      <div className="max-w-[900px] mx-auto px-margin-mobile">
        {/* Heading */}
        <div className="text-center mb-stack-md">
          <span className="text-electric-blue font-label-md tracking-[0.3em] uppercase mb-4 block">Help Center</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">Common Questions</h2>
          <p className="font-body-lg text-on-surface-variant">Learn more about wireless home automation in Chhattisgarh.</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>

        {/* More FAQs Link */}
        <div className="mt-6 md:mt-12 text-center">
          <Link href="/faq" className="inline-flex items-center gap-3 text-electric-blue font-label-md hover:gap-5 transition-all group">
            More Technical FAQs
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={`glass border-white/5 rounded-xl md:rounded-3xl overflow-hidden transition-all ${isOpen ? "bg-white/5" : "hover:bg-white/5"}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 md:p-8 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg md:font-headline-sm text-sm md:text-[20px] group-hover:text-electric-blue transition-colors pr-4">
          {question}
        </span>
        <span
          className="material-symbols-outlined text-electric-blue transition-transform duration-300 flex-shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          expand_more
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? "500px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <p className="px-4 pb-4 md:px-8 md:pb-8 text-on-surface-variant text-sm md:font-body-md leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
