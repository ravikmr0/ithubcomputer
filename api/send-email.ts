import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const WHATSAPP_NUMBER = '919779286917';

// Function to generate WhatsApp notification URL
function generateWhatsAppNotification(data: {
  name: string;
  email: string;
  mobile?: string;
  service?: string;
  message: string;
}) {
  const whatsappMessage = `🔔 *New Contact Form Submission*

👤 *Customer Details:*
• Name: ${data.name}
• Email: ${data.email}
${data.mobile ? `• Phone: ${data.mobile}` : ''}
${data.service ? `• Service: ${data.service}` : ''}

💬 *Message:*
${data.message}

📅 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  const encodedMessage = encodeURIComponent(whatsappMessage);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, mobile, email, service, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create transporter with Hostinger SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Email to business owner
    const businessMailOptions = {
      from: `"IT HUB Computer" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'info@ithubcomputer.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1E40AF; border-bottom: 2px solid #1E40AF; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #1F2937;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #1F2937;">Email:</strong> <a href="mailto:${email}" style="color: #1E40AF;">${email}</a></p>
            ${mobile ? `<p style="margin: 10px 0;"><strong style="color: #1F2937;">Mobile:</strong> <a href="tel:${mobile}" style="color: #1E40AF;">${mobile}</a></p>` : ''}
            ${service ? `<p style="margin: 10px 0;"><strong style="color: #1F2937;">Service:</strong> ${service}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #F9FAFB; border-radius: 6px;">
            <p style="margin: 0 0 10px 0;"><strong style="color: #1F2937;">Message:</strong></p>
            <p style="margin: 0; color: #4B5563; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #6B7280; font-size: 12px;">
            <p>This email was sent from the IT HUB Computer contact form.</p>
            <p>Submitted on: ${timestamp}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${mobile ? `Mobile: ${mobile}` : ''}
${service ? `Service: ${service}` : ''}

Message:
${message}

---
Submitted on: ${timestamp}
      `,
    };

    // Confirmation email to customer
    const customerMailOptions = {
      from: `"IT HUB Computer" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank You for Contacting IT HUB Computer`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">IT HUB Computer</h1>
            <p style="color: #BFDBFE; margin: 10px 0 0 0;">Your Trusted IT Partner</p>
          </div>
          
          <div style="padding: 30px; background-color: #ffffff; border: 1px solid #E5E7EB; border-top: none;">
            <h2 style="color: #1F2937; margin-top: 0;">Thank You, ${name}! 🎉</h2>
            
            <p style="color: #4B5563; line-height: 1.6;">
              We have received your message and appreciate you reaching out to us. 
              Our team will review your inquiry and get back to you within 24 hours.
            </p>

            <div style="background-color: #F0F9FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1E40AF;">
              <h3 style="color: #1E40AF; margin-top: 0; font-size: 16px;">Your Message Summary:</h3>
              <p style="margin: 5px 0; color: #4B5563;"><strong>Name:</strong> ${name}</p>
              ${mobile ? `<p style="margin: 5px 0; color: #4B5563;"><strong>Phone:</strong> ${mobile}</p>` : ''}
              ${service ? `<p style="margin: 5px 0; color: #4B5563;"><strong>Service:</strong> ${service}</p>` : ''}
              <p style="margin: 5px 0; color: #4B5563;"><strong>Your Message:</strong></p>
              <p style="margin: 5px 0; color: #4B5563; white-space: pre-wrap;">${message}</p>
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
              Message submitted on: ${timestamp}
            </p>
          </div>
        </div>
      `,
      text: `
Thank You for Contacting IT HUB Computer

Dear ${name},

We have received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you within 24 hours.

Your Message Summary:
- Name: ${name}
${mobile ? `- Phone: ${mobile}` : ''}
${service ? `- Service: ${service}` : ''}
- Your Message: ${message}

If you have any urgent queries, feel free to contact us directly:
- Phone: +91 9779286917
- WhatsApp: +91 9779286917
- Email: info@ithubcomputer.com

Thank you for choosing IT HUB Computer. We look forward to serving you!

Best Regards,
IT HUB Computer Team

Message submitted on: ${timestamp}
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    // Generate WhatsApp notification URL
    const whatsappUrl = generateWhatsAppNotification({
      name,
      email,
      mobile,
      service,
      message
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
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
