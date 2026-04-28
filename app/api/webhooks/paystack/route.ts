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

    if (!signature) {
      return NextResponse.json({ message: 'No signature' }, { status: 400 });
    }

    // Verify signature
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Handle the charge.success event
    if (event.event === 'charge.success') {
      const data = event.data;
      
      // Extract metadata
      let cart = [];
      let customerName = 'Customer';
      
      if (data.metadata) {
        if (data.metadata.cart) {
          try {
            cart = JSON.parse(data.metadata.cart);
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
        amount: data.amount / 100, // Convert from kobo/pesewas back to standard unit
        cart,
        date: data.paid_at || new Date().toISOString(),
      };

      // 1. Save order to Firestore as paid
      const orderRef = doc(collection(db, 'orders'), data.reference);
      await setDoc(orderRef, {
        ...orderData,
        status: 'paid',
        paystackResponse: data, // Keep the full payload for debugging/records
      });

      // 2. Send emails
      await sendOrderConfirmationEmails(orderData);
      
      return NextResponse.json({ status: 'success' });
    }

    return NextResponse.json({ status: 'ignored' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
