import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaCreditCard, 
  FaPaypal, 
  FaMobile, 
  FaShieldAlt, 
  FaRocket, 
  FaGithub,
  FaArrowRight,
  FaCheckCircle,
  FaGlobe,
  FaBolt
} from 'react-icons/fa';
import { 
  SiRazorpay, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript 
} from 'react-icons/si';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const paymentGateways = [
  {
    name: 'Razorpay',
    description: 'Complete payment solution for Indian businesses',
    icon: SiRazorpay,
    route: '/razorpay',
    color: 'from-blue-500 to-purple-600',
    bgColor: 'bg-blue-500/10 hover:bg-blue-500/20',
    features: ['UPI', 'Cards', 'Wallets', 'Net Banking']
  },
  {
    name: 'PhonePe',
    description: 'Digital payments platform for seamless transactions',
    icon: FaMobile,
    route: '/phonepe',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-500/10 hover:bg-purple-500/20',
    features: ['UPI', 'QR Code', 'Wallet', 'POS']
  },
  {
    name: 'PayPal',
    description: 'Global payment platform trusted worldwide',
    icon: FaPaypal,
    route: '/paypal',
    color: 'from-blue-600 to-cyan-500',
    bgColor: 'bg-blue-600/10 hover:bg-blue-600/20',
    features: ['Credit Cards', 'PayPal Balance', 'Bank Transfer']
  },
  {
    name: 'Cashfree',
    description: 'Modern payment gateway for businesses',
    icon: FaCreditCard,
    route: '/cashfree',
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-500/10 hover:bg-green-500/20',
    features: ['Payment Links', 'Subscriptions', 'Marketplace']
  }
];

const features = [
  {
    icon: FaShieldAlt,
    title: 'Secure Payments',
    description: 'Enterprise-grade security with PCI DSS compliance'
  },
  {
    icon: FaRocket,
    title: 'Fast Integration',
    description: 'Quick setup with comprehensive documentation'
  },
  {
    icon: FaGlobe,
    title: 'Multi-Gateway Support',
    description: 'Support for multiple payment providers in one app'
  },
  {
    icon: FaBolt,
    title: 'Real-time Processing',
    description: 'Instant payment processing and status updates'
  }
];

const techStack = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
];

export default function HomePage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        {/* ````<div className=`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40`>
        </div>```` */}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
                <FaBolt className="mr-2 text-yellow-400" />
                <span className="text-sm font-medium">Multiple Payment Gateways Integration</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Payment Gateway
                </span>
                <br />
                <span className="text-white">Integration Demo</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                A comprehensive Next.js application demonstrating seamless integration with multiple payment gateways. 
                Perfect starter template for modern web applications.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex justify-center items-center space-x-8 mb-16">
              {techStack.map((tech, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-200 border border-gray-700">
                    <tech.icon className="text-2xl text-gray-300 group-hover:text-white" />
                  </div>
                  <span className="text-sm text-gray-400 mt-2">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Gateways Grid */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Supported Payment Gateways
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience seamless integration with leading payment providers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentGateways.map((gateway, index) => (
                <Link
                  key={index}
                  href={gateway.route}
                  className="group block"
                >
                  <div className={`
                    relative p-6 rounded-2xl border border-gray-700 
                    ${gateway.bgColor} 
                    backdrop-blur-sm transition-all duration-300 
                    hover:scale-105 hover:border-gray-600 
                    hover:shadow-2xl hover:shadow-purple-500/20
                  `}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gateway.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-800 rounded-xl group-hover:bg-gray-700 transition-colors duration-200">
                        <gateway.icon className="text-3xl text-gray-300 group-hover:text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                        {gateway.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors">
                        {gateway.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        {gateway.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-400">
                            <FaCheckCircle className="text-green-400 mr-2 text-xs" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                          Try Demo
                        </span>
                        <FaArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 bg-gray-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Why Choose Our Integration?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Built with modern technologies and best practices for production-ready applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-12 border border-purple-500/20 backdrop-blur-sm">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Explore our payment gateway integrations and see how easy it is to implement secure payments in your application.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/razorpay"
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                >
                  Start with Razorpay
                </Link>
                <Link 
                  href="https://github.com"
                  className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl font-semibold hover:bg-gray-700 hover:border-gray-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <FaGithub />
                  <span>View Source Code</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Footer/>
  </>
  );
}