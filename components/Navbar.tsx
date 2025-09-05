import React from "react";
import Link from "next/link";
import {
  FaCreditCard,
  FaGithub,
  FaStar
} from "react-icons/fa";

export default function Navbar() {
  return (
    // <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/70 border-b border-gray-800 shadow-sm">
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            <FaCreditCard className="text-white text-base" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-200 group-hover:from-purple-300 group-hover:to-pink-300">
            NexPay
          </span>
        </Link>

        {/* GitHub Star Button */}
        <Link
          href="https://github.com/Adnan-The-Coder/multiple-payment-methods-nextjs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-all duration-200 border border-gray-700 hover:border-gray-600 hover:scale-105 group"
        >
          <FaGithub className="text-lg text-gray-300 group-hover:text-purple-400 transition-colors" />
          <FaStar className="text-sm text-yellow-400 group-hover:text-yellow-300 transition-colors" />
          <span className="hidden sm:inline font-medium text-sm text-gray-200 group-hover:text-white">
            Star it on GitHub
          </span>
          <span className="sm:hidden font-medium text-sm text-gray-200 group-hover:text-white">
            Star
          </span>
        </Link>
      </div>
    </nav>
  );
}
