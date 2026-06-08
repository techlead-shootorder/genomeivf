import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Missing reCAPTCHA token' },
        { status: 400 }
      );
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.NEXT_GOOGLE_RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    console.log('[reCAPTCHA] Verification result:', data);

    if (data.success) {
      return NextResponse.json({ success: true, score: data.score });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid reCAPTCHA', details: data['error-codes'] },
      { status: 400 }
    );
  } catch (error) {
    console.error('[reCAPTCHA] Verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}