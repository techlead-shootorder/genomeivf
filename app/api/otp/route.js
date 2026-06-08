import { NextResponse } from 'next/server';

// Exotel Configuration
const EXOTEL_API_KEY = process.env.EXOTEL_API_KEY;
const EXOTEL_API_TOKEN = process.env.EXOTEL_API_TOKEN;
const EXOTEL_SUBDOMAIN = 'api.in.exotel.com';
const EXOTEL_SID = 'oasisindia1m';
const EXOTEL_SENDER_ID = 'OASIST';

export async function POST(request) {
  try {
    const body = await request.json();
    const { mobile, otp_val } = body;

    console.log(`[OTP] Sending OTP to ${mobile}`);

    // Validate inputs
    if (!mobile || !otp_val) {
      return NextResponse.json(
        { error: 'Missing mobile or OTP value' },
        { status: 400 }
      );
    }

    // Remove +91 if present to get 10-digit number
    const cleanMobile = mobile.replace(/^\+91/, '');

    if (cleanMobile.length !== 10) {
      return NextResponse.json(
        { error: 'Invalid mobile number' },
        { status: 400 }
      );
    }

    // Send OTP via Exotel
    const exotelUrl = `https://${EXOTEL_SUBDOMAIN}/v1/Accounts/${EXOTEL_SID}/Sms/send`;

    const auth = Buffer.from(`${EXOTEL_API_KEY}:${EXOTEL_API_TOKEN}`).toString('base64');

    
    const smsMessage = `OTP for enquiry with Oasis Fertility is ${otp_val} and valid for 2 minutes. Do not share this OTP with anyone for security reasons.`;

    const exotelResponse = await fetch(exotelUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: EXOTEL_SENDER_ID,
        To: cleanMobile,
        Body: smsMessage,
      }).toString(),
    });

    const responseText = await exotelResponse.text();
    console.log(`[OTP] Exotel Raw Response:`, responseText.substring(0, 200));

    let exotelData;
    const contentType = exotelResponse.headers.get('content-type');

    // Handle both JSON and XML responses
    if (contentType?.includes('application/json')) {
      exotelData = JSON.parse(responseText);
    } else {
      // Parse XML response
      exotelData = { rawResponse: responseText };
    }

    console.log(`[OTP] Exotel Response:`, exotelData);

    if (!exotelResponse.ok) {
      console.error(`[OTP Error] Exotel API Error:`, exotelData);
      return NextResponse.json(
        { error: 'Failed to send OTP', details: exotelData },
        { status: exotelResponse.status }
      );
    }

    // Check for success in XML response
    // Exotel returns Status: queued, sent, or failed
    const successStatuses = ['queued', 'sent', 'delivered'];
    const hasSuccessStatus = successStatuses.some(status => responseText.includes(`<Status>${status}</Status>`));

    if (!hasSuccessStatus) {
      console.error(`[OTP Error] Exotel returned error status:`, responseText);
      return NextResponse.json(
        { error: 'Failed to send OTP', details: responseText },
        { status: 400 }
      );
    }

    console.log(`[OTP] OTP sent successfully to ${mobile}`);

    return NextResponse.json(
      { success: true, message: 'OTP sent successfully', requestId: exotelData?.Sid },
      { status: 200 }
    );
  } catch (error) {
    console.error('[OTP Error]:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP', details: error.message },
      { status: 500 }
    );
  }
}
