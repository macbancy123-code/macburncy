import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { sendOrderConfirmationEmails } from '@/lib/orderEmails';

const secret = process.env.PAYSTACK_SECRET_KEY || '';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    console.log('--- Paystack Webhook Received ---');
    
    if (!signature) {
      console.error('Webhook Error: No signature found in headers');
      return NextResponse.json({ message: 'No signature' }, { status: 400 });
    }

    // Verify signature
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');

    if (hash !== signature) {
      console.error('Webhook Error: Invalid signature mismatch');
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    console.log('Webhook Event Type:', event.event);

    // Handle the charge.success event
    if (event.event === 'charge.success') {
      const data = event.data;
      console.log('Payment Successful. Reference:', data.reference);
      
      // Extract metadata
      let cart = [];
      let customerName = 'Customer';
      
      if (data.metadata) {
        if (data.metadata.cart) {
          try {
            cart = JSON.parse(data.metadata.cart);
            console.log('Cart metadata parsed successfully');
          } catch (e) {
            console.error('Error parsing cart metadata:', e);
          }
        }
        if (data.metadata.customerName) {
          customerName = data.metadata.customerName;
        }
      }

      const orderData = {
        reference: data.reference,
        customerName,
        customerEmail: data.customer.email,
        amount: data.amount / 100,
        cart,
        date: data.paid_at || new Date().toISOString(),
      };

      // 1. Save order to Firestore as paid
      console.log('Saving order to Firestore...');
      const orderRef = doc(collection(db, 'orders'), data.reference);
      await setDoc(orderRef, {
        ...orderData,
        status: 'paid',
        paystackResponse: data,
      });
      console.log('Order saved to Firestore successfully');

      // 2. Send emails
      console.log('Attempting to send order confirmation emails...');
      const emailResults = await sendOrderConfirmationEmails(orderData);
      console.log('Email Results:', emailResults);
      
      return NextResponse.json({ status: 'success' });
    }

    return NextResponse.json({ status: 'ignored' });
  } catch (error) {
    console.error('Webhook System Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
