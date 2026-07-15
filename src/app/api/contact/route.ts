import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, typology } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and Phone are required" }, { status: 400 });
    }

    // Nodemailer configuration
    // Uses environment variables SMTP_USER and SMTP_PASS configured in Vercel
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER || '"Supreme Villagio Website" <noreply@supremevillagio.com>',
      to: 'propsmartrealty@gmail.com', // Sending lead to this address
      subject: `New Lead: ${name} - Supreme Villagio`,
      text: `You have received a new inquiry from the Supreme Villagio website:
      
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Typology Interested: ${typology || 'Not Specified'}

Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Lead successfully sent via email" 
    });
  } catch (error) {
    console.error("Error sending email:", error);
    // Even if email fails (e.g. missing SMTP credentials locally), we return a 500
    // so the frontend knows it failed.
    return NextResponse.json({ error: "Failed to send lead email. Check SMTP credentials." }, { status: 500 });
  }
}
