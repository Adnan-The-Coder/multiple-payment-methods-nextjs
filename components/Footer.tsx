'use client';

import React from 'react';
import Link from 'next/link';
import {
  FaCreditCard,
  FaGithub,
  FaHeart,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaGlobe
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 border-t border-gray-800 bg-gray-900/60">
      <div className="max-w-7xl mx-auto">
        {/* ── Main Footer Grid ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* ── Brand Info ── */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <FaCreditCard className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                nexpay 
              </span>
            </Link>
            <p className="text-gray-400 max-w-md mb-4">
              A robust Next.js application integrating multiple payment gateways.
              Built to simplify modern payment workflows across diverse platforms.
            </p>

            {/* ── Tech Stack Badges ── */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Built with:</span>
              <div className="flex items-center space-x-3">
                <SiNextdotjs className="text-lg text-gray-400 hover:text-white transition-colors cursor-help" title="Next.js" />
                <SiTypescript className="text-lg text-gray-400 hover:text-blue-400 transition-colors cursor-help" title="TypeScript" />
                <SiTailwindcss className="text-lg text-gray-400 hover:text-cyan-400 transition-colors cursor-help" title="Tailwind CSS" />
              </div>
            </div>
          </div>

          {/* ── Payment Gateway Links ── */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Payment Gateways</h3>
            <ul className="space-y-2 text-gray-400">
              {[
                { name: 'Razorpay', href: '/razorpay' },
                { name: 'PhonePe', href: '/phonepe' },
                { name: 'PayPal', href: '/paypal' },
                { name: 'Cashfree', href: '/cashfree' }
              ].map(({ name, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors duration-200">
                    {name} Integration
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Project Resources ── */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="https://github.com/Adnan-The-Coder/multiple-payment-methods-nextjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center space-x-2 transition-colors duration-200"
                >
                  <FaGithub className="text-sm" />
                  <span>Source Code</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://adnanthecoder.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Author Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Adnan-The-Coder/multiple-payment-methods-nextjs/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Issues & Support
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Adnan-The-Coder/multiple-payment-methods-nextjs/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Releases
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ───────────────────────────── */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copy Info */}
            <div className="flex flex-wrap items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} nexpay Hub.</span>
              <span>Crafted with</span>
              <FaHeart className="text-red-500 text-sm animate-pulse" />
              <span>by</span>
              <Link
                href="https://adnanthecoder.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline-offset-2 hover:underline"
              >
                Adnan
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/Adnan-The-Coder"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-110"
                title="GitHub"
              >
                <FaGithub className="text-lg" />
              </Link>
              <Link
                href="https://linkedin.com/in/syedadnanali99"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </Link>
              <Link
                href="mailto:contact@adnanthecoder.com"
                className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-110"
                title="Email"
              >
                <FaEnvelope className="text-lg" />
              </Link>
              <Link
                href="https://adnanthecoder.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-teal-400 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-110"
                title="Website"
              >
                <FaGlobe className="text-lg" />
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              This project is for educational/demo purposes. Ensure full compliance with each payment gateway`s TOS before deploying to production.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
