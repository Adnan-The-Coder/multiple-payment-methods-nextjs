"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const PaymentSuccess = () => {
  const [status, setStatus] = useState('');
  const searchParams = useSearchParams();
  const order_id = searchParams.get('order_id');

  useEffect(() => {
    if (order_id) {
      // Call an API or perform any operations needed to process the success
      // For example: Check the payment status or update the order in the database
      setStatus('Payment Successful! Order ID: ' + order_id);
    }
  }, [order_id]);

  return (
    <div className="payment-success">
      <h1>{status}</h1>
      {/* You can add more information or a link to the order details */}
    </div>
  );
};

// Wrap it in a Suspense boundary to handle async hooks
const PaymentSuccessPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PaymentSuccess />
  </Suspense>
);

export default PaymentSuccessPage;
