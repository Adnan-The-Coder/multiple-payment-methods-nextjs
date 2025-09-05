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
  FaWallet,
  FaArrowLeft,
  FaRupeeSign,
  FaLock,
  FaBolt,
  FaGlobe,
  FaHeadset,
  FaHeart,
  FaCoffee,
  FaRocket,
  FaGem,
  FaFlask
} from 'react-icons/fa';
import { 
  SiRazorpay 
} from 'react-icons/si';
import Link from 'next/link';

// Enhanced products with author support theme
const sampleProducts = [
  {
    id: 1,
    name: "Caffeine Catalyst ☕",
    price: 99,
    originalPrice: 149,
    image: "☕️",
    description: "Fuel the late-night coding sessions that bring you awesome features. Because bugs don't fix themselves at 3 AM!",
    features: ["Early Access Updates", "Bug Reports Priority", "Grateful Developer Heart"],
    supportType: "Basic Support"
  },
  {
    id: 2,
    name: "Feature Fairy 🧚‍♂️",
    price: 299,
    originalPrice: 499,
    image: "🚀",
    description: "Help manifest those 'it would be cool if...' ideas into reality. Your wish is literally our command!",
    features: ["Feature Request Priority", "Beta Access", "Direct Developer Chat", "Name in Hall of Fame"],
    supportType: "Premium Support"
  },
  {
    id: 3,
    name: "Code Wizard Sponsor 🧙‍♂️",
    price: 799,
    originalPrice: 1299,
    image: "💎",
    description: "Become the Gandalf to our Frodo. Help us build something magical that the world desperately needs!",
    features: ["Quarterly Video Calls", "Custom Feature Development", "Product Roadmap Input", "Legendary Status"],
    supportType: "VIP Support"
  },
  {
    id: 0,
    name: "Curiosity Payment 🔬",
    price: 1,
    originalPrice: 1,
    image: "🧪",
    description: "Just testing if this payment thing actually works? We respect the scientific method!",
    features: ["Dopamine Rush", "Developer Smile", "Test Success Badge"],
    supportType: "Experimental"
  }
];

const paymentMethods = [
  { icon: FaCreditCard, name: 'Credit/Debit Cards', desc: 'Visa, MasterCard, RuPay' },
  { icon: FaMobile, name: 'UPI', desc: 'GPay, PhonePe, Paytm' },
  { icon: FaUniversity, name: 'Net Banking', desc: 'All major banks' },
  { icon: FaWallet, name: 'Wallets', desc: 'Paytm, Mobikwik, Amazon Pay' }
];

const features = [
  {
    icon: FaShieldAlt,
    title: 'Secure Payments',
    description: 'PCI DSS Level 1 compliant with 256-bit SSL encryption'
  },
  {
    icon: FaBolt,
    title: 'Instant Processing',
    description: 'Real-time payment processing with instant confirmations'
  },
  {
    icon: FaGlobe,
    title: 'Multi-Currency',
    description: 'Support for 100+ currencies and international cards'
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    description: 'Round-the-clock customer support and dispute resolution'
  }
];

function Page() {
  const [selectedProduct, setSelectedProduct] = useState(sampleProducts[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const getHumorousMessage = (product) => {
    const messages = {
      0: "Even ₹1 can make a developer's day! 😊",
      1: "This coffee might just prevent a bug that would've haunted you at 2 AM! ☕",
      2: "You're not just buying features, you're buying developer sanity! 🧠",
      3: "Legend says every sponsor gets their feature request reviewed within 24 hours... okay, we just made that up, but we'll try! 🏆"
    };
    return messages[product.id] || "Supporting indie developers, one payment at a time! 💝";
  };

  const getSupportIcon = (supportType) => {
    const icons = {
      "Experimental": FaFlask,
      "Basic Support": FaCoffee,
      "Premium Support": FaRocket,
      "VIP Support": FaGem
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
        ? `🧪 Test Payment Successful!\n\n` +
          `Congratulations! You've successfully tested the payment system.\n` +
          `Amount: ₹${amount}\n` +
          `Product: ${productName}\n\n` +
          `🎉 You've made a developer smile today!\n` +
          `The ₹1 will go towards buying a samosa for the dev team.`
        : `🚀 Payment Trigger Initiated!\n\n` +
          `Product: ${productName}\n` +
          `Amount: ₹${amount}\n` +
          `Gateway: Razorpay\n\n` +
          `💝 Thank you for supporting indie development!\n\n` +
          `Note: This is a demo. In production, this would:\n` +
          `1. Create order via /api/razorpay/create-order\n` +
          `2. Open Razorpay checkout widget\n` +
          `3. Handle success/failure callbacks\n` +
          `4. Verify payment via /api/razorpay/verify`;
      
      alert(successMessage);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                  <SiRazorpay className="text-3xl text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Razorpay
                    </span>
                  </h1>
                  <p className="text-gray-400">Integration Demo</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                Experience seamless payments with India`s leading payment gateway. 
                Support for UPI, cards, net banking, and digital wallets.
              </p>
              
              <p className="text-sm text-blue-400 max-w-2xl mx-auto mb-8">
                💡 Pro tip: Try the ₹1 test payment if you`re just curious about how this works!
              </p>

              {/* Payment Methods */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <method.icon className="text-2xl text-blue-400 mx-auto mb-2" />
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
                <h2 className="text-3xl font-bold mb-4">Support the Author 💝</h2>
                <p className="text-gray-400 mb-2">Choose how you`d like to support this project and its development</p>
                <p className="text-sm text-purple-400">Every contribution helps keep the servers running and the coffee flowing! ☕</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Selection */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <FaHeart className="text-red-500 mr-2" />
                    Choose Your Support Level
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
                              ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25' 
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
                                    ${product.id === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                      product.id === 1 ? 'bg-green-500/20 text-green-400' :
                                      product.id === 2 ? 'bg-blue-500/20 text-blue-400' :
                                      'bg-purple-500/20 text-purple-400'}
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
                      Secure Checkout
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
                              <span className="text-gray-400">Original Price:</span>
                              <span className="line-through text-gray-500">₹{selectedProduct.originalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Discount:</span>
                              <span className="text-green-400">-₹{selectedProduct.originalPrice - selectedProduct.price}</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-700">
                          <span>Total:</span>
                          <span className="text-blue-400">₹{selectedProduct.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Humorous Message */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-3 mb-4 border border-purple-500/20">
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
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25'
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
                            {selectedProduct.id === 0 ? 'Test Payment' : 'Support with Razorpay'}
                          </span>
                        </>
                      )}
                    </button>

                    {/* Security Info */}
                    <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center space-x-2 text-green-400 text-sm">
                        <FaShieldAlt />
                        <span className="font-medium">100% Secure Payment</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                    
                    {selectedProduct.id === 0 && (
                      <div className="mt-3 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                        <p className="text-xs text-yellow-400 text-center">
                          🧪 This is just for testing the payment flow!
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
                <h2 className="text-3xl font-bold mb-4">Why Choose Razorpay?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Trusted by millions of businesses across India for secure and reliable payments
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
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
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-blue-500/20 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-4">Implementation Details</h2>
                <p className="text-gray-300 mb-6">
                  This demo shows the frontend integration. In a production environment, the payment flow would include:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-blue-400 flex items-center">
                      <FaCheckCircle className="mr-2" />
                      Server-side Implementation
                    </h3>
                    <ul className="text-sm text-gray-400 space-y-1 pl-6">
                      <li>• Create order via Razorpay API</li>
                      <li>• Generate secure order signature</li>
                      <li>• Handle webhook notifications</li>
                      <li>• Payment verification & database updates</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-purple-400 flex items-center">
                      <FaCheckCircle className="mr-2" />
                      Client-side Integration
                    </h3>
                    <ul className="text-sm text-gray-400 space-y-1 pl-6">
                      <li>• Razorpay checkout widget</li>
                      <li>• Success/failure callbacks</li>
                      <li>• Payment status handling</li>
                      <li>• User experience optimization</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <p className="text-sm text-gray-400">
                    💡 <strong>Fun Fact:</strong> The ₹1 test payment was inspired by developers who just want to see if things actually work before committing to larger amounts. We've all been there! 😄
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