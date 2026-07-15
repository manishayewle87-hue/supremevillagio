import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation can be added here
    const { name, phone, email, typology } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and Phone are required" }, { status: 400 });
    }

    // --- CRM INTEGRATION STUB ---
    // This payload is structured for immediate POST requests to CRMs like Salesforce (Web-to-Lead), 
    // Zoho, or HubSpot.
    const crmPayload = {
      lead_source: "Supreme Villagio Website",
      campaign_id: "CAMP_SV_2026",
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' ') || "N/A",
      mobile_number: phone,
      email_address: email || "",
      interested_typology: typology || "Not Specified",
      submission_timestamp: new Date().toISOString(),
    };

    // TODO: Replace this log with an actual fetch() call to your CRM endpoint
    console.log("=== NEW LEAD CAPTURED ===");
    console.log(JSON.stringify(crmPayload, null, 2));
    console.log("=========================");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: "Lead successfully recorded in CRM" 
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
