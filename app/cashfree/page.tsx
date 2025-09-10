/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
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
  FaGlobe,
  FaHeart,
  FaCoffee,
  FaRocket,
  FaGem,
  FaFlask,
  FaChartLine,
  FaCogs,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';
import { 
  SiCashapp 
} from 'react-icons/si';
import Link from 'next/link';

// Types
interface PaymentSessionData {
  order_id: string;
  payment_session_id: string;
  order_amount: number;
  order_currency: string;
  order_status: string;
}

interface CashfreeCheckout {
  checkout: (options: any) => Promise<any>;
}

declare global {
  interface Window {
    Cashfree: any;
  }
}

// Enhanced products with author support theme - Cashfree flavor
const sampleProducts = [
  {
    id: 1,
    name: "Code Fuel Station ⛽",
    price: 120,
    originalPrice: 200,
    image: "⛽",
    description: "Keep the development engine running smooth! Because even the most efficient code needs regular refueling breaks.",
    features: ["Priority Support Queue", "Early Beta Invites", "Developer's Coffee Fund"],
    supportType: "Fuel Basic"
  },
  {
    id: 2,
    name: "Feature Factory Worker 🏭",
    price: 350,
    originalPrice: 600,
    image: "🏭",
    description: "Help scale the feature production line! Your investment directly translates to faster shipping cycles and fewer production bugs.",
    features: ["Feature Request Pipeline", "QA Beta Access", "Monthly Progress Reports", "Contributor Badge"],
    supportType: "Pro Builder"
  },
  {
    id: 3,
    name: "Enterprise Architect 🏗️",
    price: 850,
    originalPrice: 1500,
    image: "🏗️",
    description: "Shape the blueprint of tomorrow's features! Help us build enterprise-grade solutions that scale like a unicorn startup.",
    features: ["Architecture Review Calls", "Custom Integration Support", "Roadmap Strategy Input", "Enterprise Champion Status"],
    supportType: "Scale Master"
  },
  {
    id: 0,
    name: "Payment Gateway Test 🔧",
    price: 1,
    originalPrice: 1,
    image: "🔧",
    description: "Testing the payment infrastructure? Smart move! Every great system starts with a solid foundation test.",
    features: ["System Health Check", "Integration Confidence", "Developer Peace of Mind"],
    supportType: "QA Approved"
  }
];

const paymentMethods = [
  { icon: FaCreditCard, name: 'Cards', desc: 'All major credit/debit cards' },
  { icon: FaMobile, name: 'UPI', desc: 'GPay, PhonePe, BHIM' },
  { icon: FaUniversity, name: 'Net Banking', desc: '100+ banks supported' },
  { icon: FaWallet, name: 'Wallets', desc: 'Popular digital wallets' }
];

const features = [
  {
    icon: FaShieldAlt,
    title: 'Enterprise Security',
    description: 'PCI DSS Level 1 compliance with advanced fraud detection'
  },
  {
    icon: FaChartLine,
    title: 'Smart Analytics',
    description: 'Real-time dashboards and comprehensive payment insights'
  },
  {
    icon: FaCogs,
    title: 'Developer First',
    description: 'RESTful APIs, SDKs, and extensive documentation'
  },
  {
    icon: FaGlobe,
    title: 'Global Reach',
    description: 'Accept payments from 100+ countries worldwide'
  }
];

function Page() {
  const [selectedProduct, setSelectedProduct] = useState(sampleProducts[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cashfreeLoaded, setCashfreeLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cashfree, setCashfree] = useState<CashfreeCheckout | null>(null);

  // Load Cashfree SDK
  useEffect(() => {
    const loadCashfreeSDK = async () => {
      try {
        // Check if Cashfree is already loaded
        if (window.Cashfree) {
          const cfInstance = await window.Cashfree({
            mode: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
          });
          setCashfree(cfInstance);
          setCashfreeLoaded(true);
          return;
        }

        // Load the SDK script
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.async = true;
        script.onload = async () => {
          try {
            const cfInstance = await window.Cashfree({
              mode: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
            });
            setCashfree(cfInstance);
            setCashfreeLoaded(true);
          } catch (error) {
            console.error('Error initializing Cashfree:', error);
            setError('Failed to initialize payment system');
          }
        };
        script.onerror = () => {
          setError('Failed to load payment system');
        };
        document.head.appendChild(script);

        // Cleanup function
        return () => {
          const existingScript = document.querySelector('script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]');
          if (existingScript) {
            document.head.removeChild(existingScript);
          }
        };
      } catch (error) {
        console.error('Error loading Cashfree SDK:', error);
        setError('Failed to initialize payment system');
      }
    };

    loadCashfreeSDK();
  }, []);

  const getHumorousMessage = (product: typeof sampleProducts[number]) => {
    const messages: Record<number, string> = {
      0: "Every great payment system starts with a ₹1 test. You're following best practices! 🔧",
      1: "This fuel injection might just power the next breakthrough feature! ⛽",
      2: "You're not just supporting code, you're investing in the future of fintech! 🏭",
      3: "Enterprise-level support = enterprise-level results. Welcome to the big leagues! 🏗️"
    };
    return messages[product.id] || "Building the future of payments, one contribution at a time! 💰";
  };

  const getSupportIcon = (supportType: string) => {
    const icons: Record<string, typeof FaFlask> = {
      "QA Approved": FaFlask,
      "Fuel Basic": FaCoffee,
      "Pro Builder": FaRocket,
      "Scale Master": FaGem
    };
    return icons[supportType] || FaHeart;
  };

  const createOrder = async (amount: number, productName: string): Promise<PaymentSessionData> => {
    const response = await fetch('/api/payments/cashfree/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        productName,
        customerDetails: {
          customer_name: "Test Customer",
          customer_email: "test@example.com",
          customer_phone: "9999999999"
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    if (!data.success) {
      throw new Error(data.error || 'Failed to create order');
    }

    return data.data;
  };

  const handlePayment = async (amount: number, productName: string) => {
    if (!cashfreeLoaded || !cashfree) {
      setError('Payment system is not ready. Please refresh and try again.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create order on server
      const orderData = await createOrder(amount, productName);

      // Configure checkout options
      const checkoutOptions = {
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_modal", // This will open in a modal
        appearance: {
          width: "500px",
          height: "700px",
        },
      };

      // Open Cashfree checkout
      const result = await cashfree.checkout(checkoutOptions);

      // Handle checkout result
      if (result.error) {
        console.error('Payment error:', result.error);
        setError(`Payment failed: ${result.error.message || 'Unknown error occurred'}`);
        return;
      }

      if (result.redirect) {
        console.log('Payment redirect required');
        // Handle redirect case (usually for mobile browsers)
        window.location.href = result.redirect.url;
        return;
      }

      if (result.paymentDetails) {
        console.log('Payment completed:', result.paymentDetails);
        
        const isSuccess = result.paymentDetails.paymentStatus === 'SUCCESS';
        const message = isSuccess 
          ? `🎉 Payment Successful!\n\nOrder ID: ${orderData.order_id}\nAmount: ₹${amount}\nProduct: ${productName}\n\nThank you for supporting development!`
          : `❌ Payment Failed\n\nReason: ${result.paymentDetails.paymentMessage}\nOrder ID: ${orderData.order_id}\n\nPlease try again or contact support.`;
        
        alert(message);
        
        if (isSuccess && amount === 1) {
          // Special handling for test payments
          setTimeout(() => {
            alert('🔧 Integration Test Complete!\n\nCashfree payment flow is working perfectly. Your integration is ready for production!');
          }, 1000);
        }
      }

    } catch (error: any) {
      console.error('Payment processing error:', error);
      setError(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-emerald-900/20 to-teal-900/20">
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
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4">
                  <SiCashapp className="text-3xl text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Cashfree
                    </span>
                  </h1>
                  <p className="text-gray-400">Integration Demo</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                Power your business with India`s most developer-friendly payment gateway. 
                Built for scale, designed for simplicity.
              </p>
              
              <p className="text-sm text-emerald-400 max-w-2xl mx-auto mb-4">
                💡 Pro developer tip: Start with the ₹1 test to validate your integration setup!
              </p>

              {/* SDK Status Indicator */}
              <div className="max-w-md mx-auto mb-8">
                {cashfreeLoaded ? (
                  <div className="flex items-center justify-center space-x-2 text-green-400 bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <FaCheckCircle />
                    <span className="text-sm font-medium">Payment System Ready</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-yellow-400 bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                    <FaSpinner className="animate-spin" />
                    <span className="text-sm font-medium">Loading Payment System...</span>
                  </div>
                )}
                
                {error && (
                  <div className="flex items-center justify-center space-x-2 text-red-400 bg-red-500/10 rounded-lg p-3 border border-red-500/20 mt-2">
                    <FaExclamationTriangle />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <method.icon className="text-2xl text-emerald-400 mx-auto mb-2" />
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
                <h2 className="text-3xl font-bold mb-4">Fuel the Development 🚀</h2>
                <p className="text-gray-400 mb-2">Support the engineering that powers seamless payment experiences</p>
                <p className="text-sm text-emerald-400">Every contribution helps us build better, faster, and more reliable systems! ⚡</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Selection */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <FaHeart className="text-red-500 mr-2" />
                    Select Your Support Package
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
                              ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/25' 
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
                                    ${product.id === 0 ? 'bg-blue-500/20 text-blue-400' :
                                      product.id === 1 ? 'bg-green-500/20 text-green-400' :
                                      product.id === 2 ? 'bg-emerald-500/20 text-emerald-400' :
                                      'bg-amber-500/20 text-amber-400'}
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
                      Enterprise Checkout
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
                              <span className="text-gray-400">Savings:</span>
                              <span className="text-green-400">-₹{selectedProduct.originalPrice - selectedProduct.price}</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-700">
                          <span>Total:</span>
                          <span className="text-emerald-400">₹{selectedProduct.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Humorous Message */}
                    <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg p-3 mb-4 border border-emerald-500/20">
                      <p className="text-sm text-center text-emerald-300">
                        {getHumorousMessage(selectedProduct)}
                      </p>
                    </div>

                    {/* Payment Button */}
                    <button
                      onClick={() => handlePayment(selectedProduct.price, selectedProduct.name)}
                      disabled={isProcessing || !cashfreeLoaded || !!error}
                      className={`
                        w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform
                        ${isProcessing || !cashfreeLoaded || !!error
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : selectedProduct.id === 0 
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25'
                            : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25'
                        }
                        flex items-center justify-center space-x-2
                      `}
                    >
                      {isProcessing ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Processing Payment...</span>
                        </>
                      ) : !cashfreeLoaded ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Loading...</span>
                        </>
                      ) : error ? (
                        <>
                          <FaExclamationTriangle />
                          <span>System Error</span>
                        </>
                      ) : (
                        <>
                          <FaRupeeSign />
                          <span>
                            {selectedProduct.id === 0 ? 'Test Integration' : 'Pay with Cashfree'}
                          </span>
                        </>
                      )}
                    </button>

                    {/* Error Display */}
                    {error && (
                      <div className="mt-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="flex items-center space-x-2 text-red-400 text-sm">
                          <FaExclamationTriangle />
                          <span className="font-medium">Payment Error</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{error}</p>
                        <button
                          onClick={() => {
                            setError(null);
                            window.location.reload();
                          }}
                          className="text-xs text-red-400 hover:text-red-300 mt-2 underline"
                        >
                          Retry
                        </button>
                      </div>
                    )}

                    {/* Security Info */}
                    <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center space-x-2 text-green-400 text-sm">
                        <FaShieldAlt />
                        <span className="font-medium">Enterprise Grade Security</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        PCI DSS certified with advanced fraud protection
                      </p>
                    </div>
                    
                    {selectedProduct.id === 0 && (
                      <div className="mt-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-xs text-blue-400 text-center">
                          🔧 Perfect for integration testing and validation!
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
                <h2 className="text-3xl font-bold mb-4">Why Choose Cashfree?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Trusted by 500,000+ businesses for reliable, scalable payment solutions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
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
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl p-8 border border-emerald-500/20 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-4">Cashfree Integration Architecture</h2>
                <p className="text-gray-300 mb-6">
                  This demo showcases a complete production-ready implementation with:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-emerald-400 flex items-center">
                      <FaCheckCircle className="mr-2" />
                      Server Architecture
                    </h3>
                    <ul className="text-sm text-gray-400 space-y-1 pl-6">
                      <li>• Secure API routes with validation</li>
                      <li>• Order creation with proper error handling</li>
                      <li>• Webhook verification with HMAC signatures</li>
                      <li>• Environment-based configuration</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-teal-400 flex items-center">
                      <FaCheckCircle className="mr-2" />
                      Client Integration
                    </h3>
                    <ul className="text-sm text-gray-400 space-y-1 pl-6">
                      <li>• Dynamic SDK loading with error handling</li>
                      <li>• Real-time payment status updates</li>
                      <li>• Modal-based checkout experience</li>
                      <li>• Comprehensive error management</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <p className="text-sm text-gray-400">
                    💻 <strong>Production Ready:</strong> This implementation includes proper error handling, 
                    webhook verification, security best practices, and a complete payment flow. 
                    The ₹1 test validates your entire integration pipeline from order creation to payment completion!
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                    <h4 className="font-semibold text-green-400 mb-2">✅ Implemented</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Order Creation API</li>
                      <li>• Payment Processing</li>
                      <li>• Webhook Handler</li>
                      <li>• Error Management</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                    <h4 className="font-semibold text-yellow-400 mb-2">🔧 Customizable</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Customer Details Form</li>
                      <li>• Payment Methods Filter</li>
                      <li>• Custom Success Pages</li>
                      <li>• Database Integration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                    <h4 className="font-semibold text-blue-400 mb-2">🚀 Production Ready</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Environment Variables</li>
                      <li>• Security Headers</li>
                      <li>• Input Validation</li>
                      <li>• Rate Limiting Ready</li>
                    </ul>
                  </div>
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