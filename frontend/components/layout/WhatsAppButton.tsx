'use client';

import React from 'react';

interface WhatsAppButtonProps {
  customMessage?: string;
}

export default function WhatsAppButton({ customMessage }: WhatsAppButtonProps) {
  const phoneNumber = '916304579593';
  const defaultText =
    'Hi Jade Teja, I am interested in your website or Android app development services. I would like to discuss my project.';
  const message = customMessage || defaultText;
  const encodedUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="WhatsApp Quick Contact">
      <a
        href={encodedUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (+91 6304579593)"
        className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-[#25D366]/20"
      >
        {/* WhatsApp SVG Icon */}
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.507 14.307l-.009.075c-.338-.168-1.996-.986-2.305-1.099-.309-.113-.534-.168-.76.17-.225.337-.872 1.099-1.07 1.324-.197.225-.395.253-.733.084-.338-.169-1.427-.526-2.72-1.677-1.004-.897-1.683-2.006-1.88-2.344-.197-.338-.021-.52.148-.688.152-.152.338-.395.507-.592.17-.197.225-.338.338-.563.113-.226.056-.423-.028-.592-.085-.17-.76-1.832-1.042-2.508-.275-.66-.554-.57-.76-.58l-.649-.011c-.225 0-.592.085-.902.423-.31.338-1.183 1.156-1.183 2.818 0 1.662 1.211 3.269 1.38 3.495.17.225 2.38 3.635 5.766 5.099.806.349 1.435.557 1.925.713.809.257 1.545.221 2.127.134.649-.097 1.996-.816 2.278-1.604.282-.789.282-1.464.197-1.605-.084-.14-.31-.225-.648-.394z" />
          <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.764.462 3.486 1.34 5.006L2 22l5.12-1.312a9.96 9.96 0 0 0 4.884 1.272c5.518 0 10.004-4.486 10.004-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.257a8.21 8.21 0 0 1-4.186-1.144l-.3-.178-3.109.797.834-3.029-.196-.312a8.22 8.22 0 0 1-1.261-4.387c0-4.545 3.698-8.243 8.243-8.243 4.545 0 8.243 3.698 8.243 8.243 0 4.545-3.698 8.243-8.243 8.243z" />
        </svg>

        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping -z-10" />

        {/* Hover Tooltip for Desktop */}
        <span className="hidden lg:block absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp (+91 6304579593)
        </span>
      </a>
    </aside>
  );
}
