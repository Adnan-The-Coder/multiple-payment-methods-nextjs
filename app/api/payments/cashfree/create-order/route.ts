/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

// Initialize Cashfree with environment variables
const cashfree = new Cashfree(
  process.env.CASHFREE_ENV === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID  || "TEST430329ae80e0f32e41a393d78b923034",
  process.env.CASHFREE_SECRET_KEY || "TESTaf195616268bd6202eeb3bf8dc458956e7192a85"
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { amount, productName, customerDetails } = body;
    
    if (!amount || !productName) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, productName' },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount < 1 || amount > 100000) {
      return NextResponse.json(
        { error: 'Amount must be between ₹1 and ₹100,000' },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Prepare customer details with defaults
    const customer = {
      customer_id: customerDetails?.customer_id || `customer_${Date.now()}`,
      customer_phone: customerDetails?.customer_phone || "8290393487",
      customer_email: customerDetails?.customer_email || "adnanali23189@gmail.com",
      customer_name: customerDetails?.customer_name || "Adnan Customer"
    };

    // Create order request
    const orderRequest = {
      order_amount: parseFloat(amount.toString()),
      order_currency: "INR",
      order_id: orderId,
      customer_details: customer,
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nex--pay.vercel.app'}/payments/success?order_id={order_id}`,
        notify_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nex--pay.vercel.app'}/api/payments/cashfree/webhook`,
        payment_methods: "cc,dc,nb,upi,paylater,emi"
      },
      order_note: `Payment for ${productName}`
    };

    // Create order with Cashfree
    const response = await cashfree.PGCreateOrder(orderRequest);
    
    if (!response.data) {
      throw new Error('Failed to create order - no response data');
    }

    const orderData = response.data;

    // Log for debugging (remove in production)
    console.log('Order created successfully:', {
      order_id: orderData.order_id,
      payment_session_id: orderData.payment_session_id,
      amount: orderData.order_amount
    });

    // Return successful response
    return NextResponse.json({
      success: true,
      data: {
        order_id: orderData.order_id,
        payment_session_id: orderData.payment_session_id,
        order_amount: orderData.order_amount,
        order_currency: orderData.order_currency,
        order_status: orderData.order_status,
        customer_details: orderData.customer_details
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Cashfree order creation error:', error);
    
    // Handle Cashfree specific errors
    if (error.response?.data) {
      const errorData = error.response.data;
      return NextResponse.json({
        success: false,
        error: errorData.message || 'Payment gateway error',
        code: errorData.code,
        type: errorData.type
      }, { status: error.response.status || 500 });
    }

    // Handle general errors
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error',
      type: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}