/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Webhook signature verification
function verifyWebhookSignature(
  rawBody: string, 
  signature: string, 
  timestamp: string,
  secretKey: string
): boolean {
  try {
    const signedPayload = timestamp + rawBody;
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(signedPayload)
      .digest('base64');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);
    
    // Get headers for signature verification
    const signature = request.headers.get('x-webhook-signature');
    const timestamp = request.headers.get('x-webhook-timestamp');
    
    if (!signature || !timestamp) {
      console.error('Missing webhook signature or timestamp');
      return NextResponse.json(
        { error: 'Missing signature or timestamp' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const secretKey = process.env.CASHFREE_SECRET_KEY || "TESTaf195616268bd6202eeb3bf8dc458956e7192a85";
    const isValidSignature = verifyWebhookSignature(rawBody, signature, timestamp, secretKey);
    
    if (!isValidSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Process webhook data
    const { type, data } = body;
    
    console.log('Webhook received:', {
      type,
      order_id: data?.order?.order_id,
      payment_status: data?.payment?.payment_status,
      order_status: data?.order?.order_status
    });

    // Handle different webhook types
    switch (type) {
      case 'PAYMENT_SUCCESS_WEBHOOK':
        await handlePaymentSuccess(data);
        break;
        
      case 'PAYMENT_FAILED_WEBHOOK':
        await handlePaymentFailed(data);
        break;
        
      case 'PAYMENT_USER_DROPPED_WEBHOOK':
        await handlePaymentDropped(data);
        break;
        
      default:
        console.log('Unhandled webhook type:', type);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(data: any) {
  const { order, payment } = data;
  
  console.log('Payment successful:', {
    order_id: order.order_id,
    payment_id: payment.cf_payment_id,
    amount: payment.payment_amount,
    method: payment.payment_method
  });
  
  // Here you would typically:
  // 1. Update your database with payment details
  // 2. Send confirmation emails
  // 3. Update order status
  // 4. Trigger fulfillment processes
  
  // Example database update (implement based on your DB)
  // await updateOrderStatus(order.order_id, 'PAID', payment);
}

async function handlePaymentFailed(data: any) {
  const { order, payment } = data;
  
  console.log('Payment failed:', {
    order_id: order.order_id,
    payment_id: payment?.cf_payment_id,
    failure_reason: payment?.payment_message
  });
  
  // Handle failed payment
  // await updateOrderStatus(order.order_id, 'FAILED', payment);
}

async function handlePaymentDropped(data: any) {
  const { order } = data;
  
  console.log('Payment dropped by user:', {
    order_id: order.order_id
  });
  
  // Handle user drop-off
  // await updateOrderStatus(order.order_id, 'CANCELLED');
}

// Handle preflight requests
export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint active' }, { status: 200 });
}