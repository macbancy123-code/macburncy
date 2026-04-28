import { sendEmail } from './email';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface OrderData {
  reference: string;
  customerName: string;
  customerEmail: string;
  amount: number; // in GHS
  cart: CartItem[];
  date: string;
}

export const sendOrderConfirmationEmails = async (order: OrderData) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'macbancy123@gmail.com';

  const cartItemsHtml = order.cart.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div>
            <p style="margin: 0; font-weight: bold; font-size: 14px;">${item.name}</p>
            ${item.variant ? `<p style="margin: 0; font-size: 12px; color: #666;">Variant: ${item.variant}</p>` : ''}
          </div>
        </div>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₵${item.price.toLocaleString()}</td>
    </tr>
  `).join('');

  // 1. Customer Email
  const customerHtml = `
    <div style="font-family: sans-serif; padding: 40px; background: #fafafa; color: #111;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #eee; border-radius: 20px; overflow: hidden;">
        <div style="background: black; padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Mac Bancy Atelier</h1>
        </div>
        <div style="padding: 40px;">
          <h2 style="font-size: 20px; margin-bottom: 20px;">Thank you for your order, ${order.customerName}!</h2>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">We've received your payment and your order is now being processed. Here are your order details:</p>
          
          <div style="margin: 30px 0; background: #f9f9f9; padding: 20px; border-radius: 10px;">
            <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Order Reference:</strong> ${order.reference}</p>
            <p style="margin: 0; font-size: 14px;"><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr>
                <th style="padding: 10px; border-bottom: 2px solid #eee; text-align: left; font-size: 12px; text-transform: uppercase; color: #999;">Item</th>
                <th style="padding: 10px; border-bottom: 2px solid #eee; text-align: center; font-size: 12px; text-transform: uppercase; color: #999;">Qty</th>
                <th style="padding: 10px; border-bottom: 2px solid #eee; text-align: right; font-size: 12px; text-transform: uppercase; color: #999;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${cartItemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 15px 10px; text-align: right; font-weight: bold;">Total Paid</td>
                <td style="padding: 15px 10px; text-align: right; font-weight: bold; font-size: 18px;">₵${order.amount.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>

          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 30px;">If you have any questions about your order, please reply to this email or contact us via our website.</p>
        </div>
      </div>
    </div>
  `;

  // 2. Admin Email
  const adminHtml = `
    <div style="font-family: sans-serif; padding: 40px; background: #fafafa; color: #111;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #eee; border-radius: 20px; overflow: hidden;">
        <div style="background: black; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 18px; letter-spacing: 2px; text-transform: uppercase;">New Order Received</h1>
        </div>
        <div style="padding: 40px;">
          <h2 style="font-size: 18px; margin-bottom: 20px;">Payment Confirmed</h2>
          
          <div style="margin-bottom: 30px;">
            <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Customer Details</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Name:</strong> ${order.customerName}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${order.customerEmail}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Order Details</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Reference:</strong> ${order.reference}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Total Amount:</strong> ₵${order.amount.toLocaleString()}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr>
                <th style="padding: 10px; border-bottom: 2px solid #eee; text-align: left; font-size: 12px; text-transform: uppercase; color: #999;">Item</th>
                <th style="padding: 10px; border-bottom: 2px solid #eee; text-align: center; font-size: 12px; text-transform: uppercase; color: #999;">Qty</th>
                <th style="padding: 10px; border-bottom: 2px solid #eee; text-align: right; font-size: 12px; text-transform: uppercase; color: #999;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${cartItemsHtml}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Send to Customer
  const customerResult = await sendEmail({
    to: order.customerEmail,
    subject: `Your Mac Bancy Order Confirmation (#${order.reference})`,
    html: customerHtml,
  });

  // Send to Admin
  const adminResult = await sendEmail({
    to: adminEmail,
    subject: `New Order Alert! ₵${order.amount.toLocaleString()} - ${order.customerName}`,
    html: adminHtml,
  });

  return { customerResult, adminResult };
};
