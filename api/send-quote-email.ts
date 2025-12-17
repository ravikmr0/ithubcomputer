import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const WHATSAPP_NUMBER = '919779286917';

// Function to send WhatsApp message via WhatsApp Business API
async function sendWhatsAppNotification(data: {
  fullName: string;
  email: string;
  phone: string;
  message?: string;
  productName: string;
}) {
  const whatsappMessage = `🔔 *New Quote Request*

📦 *Product/Service:* ${data.productName}

👤 *Customer Details:*
• Name: ${data.fullName}
• Email: ${data.email}
• Phone: ${data.phone}

${data.message ? `💬 *Message:*\n${data.message}` : ''}

📅 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  // Create WhatsApp click-to-chat URL for manual notification
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  return whatsappUrl;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, phone, message, productName } = req.body;

  // Validate required fields
  if (!fullName || !email || !phone || !productName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create transporter using Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Email to business owner
    const businessMailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@ithubcomputer.com',
      subject: `New Quote Request - ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1E40AF; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
            New Quote Request
          </h2>
          
          <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1F2937; margin-top: 0;">Product Details</h3>
            <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
          </div>

          <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1F2937; margin-top: 0;">Customer Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${fullName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          </div>

          ${message ? `
          <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1F2937; margin-top: 0;">Additional Message</h3>
            <p style="margin: 5px 0; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 12px;">
            <p>This email was sent from the IT Hub Computer quote request form.</p>
            <p>Timestamp: ${timestamp}</p>
          </div>
        </div>
      `,
      text: `
New Quote Request

Product: ${productName}

Customer Information:
Name: ${fullName}
Email: ${email}
Phone: ${phone}

${message ? `Message:\n${message}` : ''}

Timestamp: ${timestamp}
      `,
    };

    // Confirmation email to customer
    const customerMailOptions = {
      from: `"IT HUB Computer" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank You for Your Quote Request - IT HUB Computer`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">IT HUB Computer</h1>
            <p style="color: #BFDBFE; margin: 10px 0 0 0;">Your Trusted IT Partner</p>
          </div>
          
          <div style="padding: 30px; background-color: #ffffff; border: 1px solid #E5E7EB; border-top: none;">
            <h2 style="color: #1F2937; margin-top: 0;">Thank You, ${fullName}! 🎉</h2>
            
            <p style="color: #4B5563; line-height: 1.6;">
              We have received your quote request for <strong style="color: #1E40AF;">${productName}</strong>. 
              Our team will review your requirements and get back to you within 24 hours with the best possible quote.
            </p>

            <div style="background-color: #F0F9FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1E40AF;">
              <h3 style="color: #1E40AF; margin-top: 0; font-size: 16px;">Your Request Summary:</h3>
              <p style="margin: 5px 0; color: #4B5563;"><strong>Product/Service:</strong> ${productName}</p>
              <p style="margin: 5px 0; color: #4B5563;"><strong>Name:</strong> ${fullName}</p>
              <p style="margin: 5px 0; color: #4B5563;"><strong>Phone:</strong> ${phone}</p>
              ${message ? `<p style="margin: 5px 0; color: #4B5563;"><strong>Your Message:</strong> ${message}</p>` : ''}
            </div>

            <p style="color: #4B5563; line-height: 1.6;">
              If you have any urgent queries, feel free to contact us directly:
            </p>

            <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0; color: #4B5563;">📞 <strong>Phone:</strong> <a href="tel:+919779286917" style="color: #1E40AF;">+91 9779286917</a></p>
              <p style="margin: 5px 0; color: #4B5563;">💬 <strong>WhatsApp:</strong> <a href="https://wa.me/919779286917" style="color: #25D366;">+91 9779286917</a></p>
              <p style="margin: 5px 0; color: #4B5563;">📧 <strong>Email:</strong> <a href="mailto:info@ithubcomputer.com" style="color: #1E40AF;">info@ithubcomputer.com</a></p>
            </div>

            <p style="color: #4B5563; line-height: 1.6;">
              Thank you for choosing IT HUB Computer. We look forward to serving you!
            </p>

            <p style="color: #1F2937; margin-top: 30px;">
              Best Regards,<br>
              <strong>IT HUB Computer Team</strong>
            </p>
          </div>

          <div style="background-color: #1F2937; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #9CA3AF; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} IT HUB Computer. All rights reserved.
            </p>
            <p style="color: #9CA3AF; margin: 10px 0 0 0; font-size: 12px;">
              Request submitted on: ${timestamp}
            </p>
          </div>
        </div>
      `,
      text: `
Thank You for Your Quote Request - IT HUB Computer

Dear ${fullName},

We have received your quote request for ${productName}. Our team will review your requirements and get back to you within 24 hours with the best possible quote.

Your Request Summary:
- Product/Service: ${productName}
- Name: ${fullName}
- Phone: ${phone}
${message ? `- Your Message: ${message}` : ''}

If you have any urgent queries, feel free to contact us directly:
- Phone: +91 9779286917
- WhatsApp: +91 9779286917
- Email: info@ithubcomputer.com

Thank you for choosing IT HUB Computer. We look forward to serving you!

Best Regards,
IT HUB Computer Team

Request submitted on: ${timestamp}
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    // Generate WhatsApp notification URL
    const whatsappUrl = await sendWhatsAppNotification({
      fullName,
      email,
      phone,
      message,
      productName
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Quote request sent successfully',
      whatsappUrl // Return WhatsApp URL for optional client-side notification
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
