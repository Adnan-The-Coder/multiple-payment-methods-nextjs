/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { load } from '@cashfreepayments/cashfree-js';

export default function CashfreePage() {
  const [loading, setLoading] = useState(false);
  const [cashfree, setCashfree] = useState<any>(null);

  // Load Cashfree SDK once on mount
  useEffect(() => {
    async function initCashfree() {
      const cf = await load({ mode: 'sandbox' }); // change to 'production' later
      setCashfree(cf);
    }
    initCashfree();
  }, []);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Generate unique order
      const orderId = `order_${Date.now()}`;
      const orderAmount = 49.99;

      // Call your API to create order
      const response = await fetch('/api/payments/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          amount: orderAmount,
          productName: "test product",
          return_url: `${window.location.origin}/payment/success?order_id=${orderId}`,
          customerDetails: {   // ✅ camelCase
            customer_id: 'cust_123',
            customer_email: 'testuser@example.com',
            customer_phone: '9999999999',
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Cashfree order creation failed');
      }

      if (!cashfree) {
        throw new Error('Cashfree SDK not initialized');
      }

      // Open Cashfree Checkout
      await cashfree
        .checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: '_modal', // "_self", "_blank", or "_modal"
        })
        .then((result: any) => {
          if (result.error) {
            console.warn('Payment error:', result.error);
          } else if (result.redirect) {
            console.log('Redirecting to Cashfree...');
          } else if (result.paymentDetails) {
            console.log('Payment successful:', result.paymentDetails);
          }
        });
    } catch (err: any) {
      console.error('Payment error:', err.message || err);
      alert(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-900 text-white">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Cashfree Payment</h1>
        <p className="text-gray-400 mb-6">
          Click the button below to initiate a test payment using Cashfree.
        </p>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Pay ₹49.99'}
        </button>
      </div>
    </div>
  );
}
