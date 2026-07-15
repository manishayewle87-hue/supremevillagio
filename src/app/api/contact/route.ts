import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, typology } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and Phone are required" }, { status: 400 });
    }

    const googleScriptUrl = "https://script.google.com/macros/s/AKfycby5pHie-zIp_l_M6XFu33Bow6UIu6WlaARW5AE8FHprHHf1VeRFn7okcXuUc2hx0oiXGg/exec";

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        email,
        typology
      })
    });

    if (!response.ok) {
      throw new Error(`Google Script returned ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lead successfully sent via Google Apps Script" 
    });
  } catch (error) {
    console.error("Error sending lead to Google Script:", error);
    return NextResponse.json({ error: "Failed to send lead email. Please try again." }, { status: 500 });
  }
}
