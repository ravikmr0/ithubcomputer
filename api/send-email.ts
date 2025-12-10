import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

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

    // Email content
    const mailOptions = {
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
            <p>Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
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
Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
