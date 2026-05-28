export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received static form submission:', body);

    // Mock API response
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Form submission received successfully',
      timestamp: new Date().toISOString()
    }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error processing static form submission:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process form submission. Please try again.'
    }), { status: 500 });
  }
}
