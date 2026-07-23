import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, typology, website } = body;

    // Honeypot check: If the hidden 'website' field is filled out, it's a bot.
    if (website) {
      console.log(`[SPAM BLOCKED] Bot detected via honeypot field. Name: ${name}`);
      // Return 200 OK to trick the bot into thinking it succeeded, but do NOT send the email.
      return NextResponse.json({ success: true, message: "Lead successfully sent" });
    }

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and Phone are required" }, { status: 400 });
    }

    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbwKPSo6EIza30iuD-nMQfcRMLKUDbolQaQkZWk6VCR0KHYXQ54YWCJC2ZcnYX0kCzcJyg/exec";

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
