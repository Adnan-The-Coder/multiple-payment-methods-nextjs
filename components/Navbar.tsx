import React from 'react';
import Link from 'next/link';
import { 
  FaCreditCard, 
  FaGithub,
  FaStar
} from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <FaCreditCard className="text-white text-sm" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-200">
            PayGate Hub
          </span>
        </Link>
        
        <Link 
          href="https://github.com/Adnan-The-Coder/multiple-payment-methods-nextjs" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 border border-gray-700 hover:border-gray-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group"
        >
          <FaGithub className="text-lg group-hover:text-purple-400 transition-colors duration-200" />
          <FaStar className="text-sm group-hover:text-yellow-400 transition-colors duration-200" />
          <span className="hidden sm:inline font-medium">Star it on GitHub</span>
          <span className="sm:hidden font-medium">Star</span>
        </Link>
      </div>
    </nav>
  );
}