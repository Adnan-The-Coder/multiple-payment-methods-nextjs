'use client';

import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { 
  FaShieldAlt, 
  FaCheckCircle, 
  FaCreditCard,
  FaMobile,
  FaUniversity,
  FaArrowLeft,
  FaRupeeSign,
  FaLock,
  FaBolt,
  FaHeart,
  FaCoffee,
  FaRocket,
  FaGem,
  FaFlask,
  FaQrcode,
  FaUserFriends,
  FaStore
} from 'react-icons/fa';
import { 
  SiPhonepe 
} from 'react-icons/si';
import Link from 'next/link';

// Enhanced products with author support theme - PhonePe flavor
const sampleProducts = [
  {
    id: 1,
    name: "Chai Break Champion 🍵",
    price: 75,
    originalPrice: 125,
    image: "🍵",
    description: "Support the sacred Indian ritual of chai breaks that fuel breakthrough moments. Every great code started with a great chai!",
    features: ["Early Feature Previews", "Priority Bug Squashing", "Thankful Developer Namaste"],
    supportType: "Desi Basic"
  },
  {
    id: 2,
    name: "Innovation Instigator 🚀",
    price: 250,
    originalPrice: 400,
    image: "🎯",
    description: "Help transform those 'arre yaar, isko aise karna chahiye' moments into actual features. Your suggestions = our roadmap!",
    features: ["Feature Voting Rights", "Beta Testing Access", "WhatsApp Group Invite", "Digital High-Five"],
    supportType: "Jugaad Premium"
  },
  {
    id: 3,
    name: "Tech Maharaja 👑",
    price: 650,
    originalPrice: 1100,
    image: "👑",
    description: "Become the patron saint of this project. Help us build something that makes India proud in the digital world!",
    features: ["Monthly Video Calls", "Custom Feature Crafting", "Product Vision Input", "Hall of Fame Throne"],
    supportType: "Elite Darbar"
  },
  {
    id: 0,
    name: "UPI Experiment 🧪",
    price: 1,
    originalPrice: 1,
    image: "📱",
    description: "Testing the legendary Indian UPI system? Totally valid! Science demands verification before trust.",
    features: ["Instant Gratification", "Developer's Blessing", "UPI Success Story"],
    supportType: "Lab Tested"
  }
];

const paymentMethods = [
  { icon: FaQrcode, name: 'UPI QR Scan', desc: 'Scan & Pay instantly' },
  { icon: FaMobile, name: 'UPI ID', desc: 'Pay via UPI handle' },
  { icon: FaCreditCard, name: 'Cards', desc: 'Credit/Debit cards' },
  { icon: FaUniversity, name: 'Net Banking', desc: 'Direct bank transfer' }
];

const features = [
  {
    icon: FaShieldAlt,
    title: 'Bank-Grade Security',
    description: 'NPCI certified with multi-layer security protocols'
  },
  {
    icon: FaBolt,
    title: 'Lightning Fast',
    description: 'Instant UPI transfers with real-time confirmations'
  },
  {
    icon: FaUserFriends,
    title: 'Social Payments',
    description: 'Split bills, send money to friends seamlessly'
  },
  {
    icon: FaStore,
    title: 'Merchant Network',
    description: 'Accepted at 30+ million merchants across India'
  }
];

function Page() {
  const [selectedProduct, setSelectedProduct] = useState(sampleProducts[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const getHumorousMessage = (product: typeof sampleProducts[number]) => {
    const messages: Record<number, string> = {
      0: "Even ₹1 can test the power of Indian UPI innovation! 🇮🇳",
      1: "This chai fund might just prevent that 4 PM energy crash coding session! 🍵",
      2: "You're not just funding features, you're investing in the Indian startup dream! 🚀",
      3: "Maharaja level support = VIP treatment in our digital kingdom! 👑"
    };
    return messages[product.id] || "Powered by Indian innovation, fueled by your support! 💪";
  };

  const getSupportIcon = (supportType: string) => {
    const icons: Record<string, typeof FaFlask> = {
      "Lab Tested": FaFlask,
      "Desi Basic": FaCoffee,
      "Jugaad Premium": FaRocket,
      "Elite Darbar": FaGem
    };
    return icons[supportType] || FaHeart;
  };

  const handlePayment = async (amount: number, productName: string) => {
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      
      const isTestPayment = amount === 1;
      const successMessage = isTestPayment 
        ? `📱 UPI Test Payment Successful!\n\n` +
          `Waah! You've successfully tested the PhonePe integration.\n` +
          `Amount: ₹${amount}\n` +
          `Product: ${productName}\n\n` +
          `🎉 Made a developer's day with this ₹1!\n` +
          `This will go towards buying vada pav for the team.`
        : `🚀 PhonePe Payment Initiated!\n\n` +
          `Product: ${productName}\n` +
          `Amount: ₹${amount}\n` +
          `Gateway: PhonePe\n\n` +
          `🙏 Dhanyawad for supporting Indian tech!\n\n` +
          `Note: This is a demo. In production, this would:\n` +
          `1. Create payment request via PhonePe API\n` +
          `2. Redirect to PhonePe app/web checkout\n` +
          `3. Handle callback responses\n` +
          `4. Verify payment status via webhooks`;
      
      alert(successMessage);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900/20">
        </div>

        <div className="relative z-10">
          {/* Back Navigation */}
          <div className="px-6 pt-6">
            <div className="max-w-7xl mx-auto">
              <Link 
                href="/" 
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>

          {/* Hero Section */}
          <section className="px-6 py-16">
            <div className="max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                  <SiPhonepe className="text-3xl text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                      PhonePe
                    </span>
                  </h1>
                  <p className="text-gray-400">Integration Demo</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                Experience the power of India`s favorite payment app. 
                UPI, QR codes, and seamless digital transactions made simple.
              </p>
              
              <p className="text-sm text-purple-400 max-w-2xl mx-auto mb-8">
                💡 Desi tip: Try the ₹1 UPI test to see how fast Indian payments really are!
              </p>

              {/* Payment Methods */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <method.icon className="text-2xl text-purple-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-sm mb-1">{method.name}</h3>
                    <p className="text-xs text-gray-400">{method.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Demo Products Section */}
          <section className="px-6 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Support the Developer 🙏</h2>
                <p className="text-gray-400 mb-2">Help build something that makes Digital India proud</p>
                <p className="text-sm text-purple-400">Every rupee helps fuel innovation and keeps the chai flowing! 🍵</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Selection */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <FaHeart className="text-red-500 mr-2" />
                    Choose Your Support Style
                  </h3>
                  <div className="grid gap-4">
                    {sampleProducts.map((product) => {
                      const SupportIcon = getSupportIcon(product.supportType);
                      return (
                        <div
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className={`
                            p-6 rounded-2xl border cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
                            ${selectedProduct.id === product.id 
                              ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/25' 
                              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                            }
                          `}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="text-4xl">{product.image}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <h4 className="text-lg font-semibold">{product.name}</h4>
                                  <span className={`
                                    px-2 py-1 rounded-full text-xs font-medium
                                    ${product.id === 0 ? 'bg-orange-500/20 text-orange-400' :
                                      product.id === 1 ? 'bg-green-500/20 text-green-400' :
                                      product.id === 2 ? 'bg-purple-500/20 text-purple-400' :
                                      'bg-yellow-500/20 text-yellow-400'}
                                  `}>
                                    <SupportIcon className="inline mr-1" />
                                    {product.supportType}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-green-400">₹{product.price}</div>
                                  {product.originalPrice !== product.price && (
                                    <div className="text-sm text-gray-400 line-through">₹{product.originalPrice}</div>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-400 text-sm mb-3">{product.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {product.features.map((feature, index) => (
                                  <span 
                                    key={index}
                                    className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Panel */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 sticky top-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <FaLock className="mr-2 text-green-400" />
                      Secure UPI Checkout
                    </h3>
                    
                    {/* Selected Product Summary */}
                    <div className="bg-gray-900/50 rounded-xl p-4 mb-4 border border-gray-700">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{selectedProduct.image}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{selectedProduct.name}</h4>
                          <p className="text-xs text-gray-400">{selectedProduct.supportType}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        {selectedProduct.originalPrice !== selectedProduct.price && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-400">MRP:</span>
                              <span className="line-through text-gray-500">₹{selectedProduct.originalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Discount:</span>
                              <span className="text-green-400">-₹{selectedProduct.originalPrice - selectedProduct.price}</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-700">
                          <span>Amount:</span>
                          <span className="text-purple-400">₹{selectedProduct.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Humorous Message */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-3 mb-4 border border-purple-500/20">
                      <p className="text-sm text-center text-purple-300">
                        {getHumorousMessage(selectedProduct)}
                      </p>
                    </div>

                    {/* Payment Button */}
                    <button
                      onClick={() => handlePayment(selectedProduct.price, selectedProduct.name)}
                      disabled={isProcessing}
                      className={`
                        w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform
                        ${isProcessing 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : selectedProduct.id === 0 
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25'
                            : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25'
                        }
                        flex items-center justify-center space-x-2
                      `}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <FaRupeeSign />
                          <span>
                            {selectedProduct.id === 0 ? 'Test UPI Payment' : 'Pay via PhonePe'}
                          </span>
                        </>
                      )}
                    </button>

                    {/* Security Info */}
                    <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center space-x-2 text-green-400 text-sm">
                        <FaShieldAlt />
                        <span className="font-medium">NPCI Secured Payment</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Bank-grade security with PIN + biometric authentication
                      </p>
                    </div>
                    
                    {selectedProduct.id === 0 && (
                      <div className="mt-3 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                        <p className="text-xs text-orange-400 text-center">
                          🧪 Perfect for testing UPI integration!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6 py-16 bg-gray-800/30">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Choose PhonePe?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  India`s most trusted digital payments platform with 450+ million registered users
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="text-2xl text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Integration Info */}
          <section className="px-6 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-3xl p-8 border border-purple-500/20 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-4">PhonePe Integration Flow</h2>
                <p className="text-gray-300 mb-6">
                  This demo showcases the frontend experience. In production, the PhonePe integration would handle:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-purple-400 flex items-center">
                      <FaCheckCircle className="mr-2" />
                      Backend Integration
                    </h3>
                    <ul className="text-sm text-gray-400 space-y-1 pl-6">
                      <li>• Merchant authentication with PhonePe</li>
                      <li>• Payment request creation & encryption</li>
                      <li>• Webhook handling for status updates</li>
                      <li>• Transaction verification & reconciliation</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-indigo-400 flex items-center">
                      <FaCheckCircle className="mr-2" />
                      User Experience
                    </h3>
                    <ul className="text-sm text-gray-400 space-y-1 pl-6">
                      <li>• Seamless PhonePe app redirect</li>
                      <li>• UPI PIN/biometric authentication</li>
                      <li>• Real-time payment status updates</li>
                      <li>• Automatic return to merchant app</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <p className="text-sm text-gray-400">
                    🇮🇳 <strong>Made in India:</strong> PhonePe processes over 12 billion UPI transactions annually, making it the backbone of India`s digital payment revolution. The ₹1 test celebrates this incredible achievement! 
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Page;