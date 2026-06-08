import { NextResponse } from 'next/server';

export async function POST(request) {
  const startTime = Date.now();
  const requestId = `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  try {
    const body = await request.json();
    const { firstName, mobileNo, age, gender, consent } = body;

    console.log(`[${requestId}] Form submission received`);
    console.log(`[${requestId}] Name: ${firstName}, Mobile: ${mobileNo.substring(0, 6)}****`);

    // Validate required fields
    if (!firstName || !mobileNo || !age || !gender) {
      console.warn(`[${requestId}] Missing required fields`);
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log submission for analytics
    console.log(`[${requestId}] Form validation passed`);

    // Optional: Store in database, send confirmation email, etc.
    // Example: await saveToCRM(body);
    // Example: await sendConfirmationEmail(body);

    const responseTime = Date.now() - startTime;
    console.log(`[${requestId}] Form processed successfully (${responseTime}ms)`);

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully',
        requestId,
      },
      { status: 200 }
    );
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`[${requestId}] Error (${responseTime}ms):`, error);

    return NextResponse.json(
      {
        error: 'Failed to process form',
        requestId,
      },
      { status: 500 }
    );
  }
}
