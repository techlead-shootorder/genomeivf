import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { mobile, otp_val } = body;

    console.log(`[OTP] Sending OTP to ${mobile}`);

    // In production, integrate with your SMS gateway (Exotel, Twilio, etc.)
    // For now, just log and return success
    console.log(`[OTP] OTP Value: ${otp_val}`);

    // Example: Send via Exotel
    // const exotelResponse = await fetch('https://api.exotel.com/v1/Accounts/...', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Basic ${btoa(`${process.env.EXOTEL_API_KEY}:${process.env.EXOTEL_API_TOKEN}`)}`,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: new URLSearchParams({
    //     From: process.env.EXOTEL_CALLER_ID,
    //     To: mobile,
    //     Body: `Your OTP is ${otp_val}. Please do not share this with anyone.`,
    //   }).toString(),
    // });

    return NextResponse.json(
      { success: true, message: 'OTP sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[OTP Error]:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
