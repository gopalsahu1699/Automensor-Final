"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/918985602913"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50
                 flex items-center gap-2
                 px-2 py-2 rounded-full
                 bg-green-500 text-white
                 shadow-lg hover:bg-green-600 transition-all"
    >
      <MessageCircle size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs
                       transition-all duration-300 text-sm font-medium">
        Chat with us
      </span>
    </a>
  );
}
