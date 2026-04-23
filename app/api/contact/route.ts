import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Configure the transporter
    // Note: If using Gmail, you MUST use an "App Password"
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Define the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'macbancy123@gmail.com', // Destination email
      subject: `Mac Bancy Inquiry: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 40px; background: #fafafa; color: #111;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #eee; border-radius: 20px; overflow: hidden;">
            <div style="background: black; padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Mac Bancy Atelier</h1>
            </div>
            <div style="padding: 40px;">
              <h2 style="font-size: 18px; margin-bottom: 20px;">New Inquiry Received</h2>
              <div style="margin-bottom: 30px;">
                <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">From</p>
                <p style="margin: 5px 0; font-size: 16px;"><strong>${name}</strong> (${email})</p>
              </div>
              <div style="margin-bottom: 30px;">
                <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Subject</p>
                <p style="margin: 5px 0; font-size: 16px;">${subject}</p>
              </div>
              <div style="margin-bottom: 30px;">
                <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Message</p>
                <p style="margin: 5px 0; font-size: 16px; line-height: 1.6; color: #333;">${message}</p>
              </div>
            </div>
            <div style="background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee;">
              This inquiry was sent from the Mac Bancy Storefront.
            </div>
          </div>
        </div>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('Nodemailer error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send message' }, { status: 500 });
  }
}
