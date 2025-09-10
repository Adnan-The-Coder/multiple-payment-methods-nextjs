import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  const [status, setStatus] = useState('');
  const router = useRouter();
  const { order_id } = router.query;

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

export default PaymentSuccess;
