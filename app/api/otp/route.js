import { NextResponse } from "next/server";
import { APILogger } from "@/lib/loggingUtil";

const otpLogger = new APILogger("otp_requests");

export async function POST(request) {
  const startTime = Date.now();
  const requestId = `otp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  try {
    const userRequestJson = await request.json();
    const { mobile, otp_val } = userRequestJson;

    console.log(`[${requestId}] OTP request received for mobile: ${mobile?.substring(0, 4)}****`);
    console.log(`[${requestId}] Generated 4-digit OTP is: ${otp_val}`);

    // Input validation
    if (!mobile || !otp_val) {
      const errorLog = {
        requestId,
        mobile: mobile?.substring(0, 4) + "****",
        status: "VALIDATION_ERROR",
        errorCode: "MISSING_PARAMS",
        errorMessage: "Mobile number and OTP value are required",
        responseTime_ms: Date.now() - startTime,
      };
      await otpLogger.log(errorLog);

      return NextResponse.json(
        { error: "Mobile number and OTP value are required" },
        { status: 400 }
      );
    }

    const API_KEY = "b8fce1110e804fed22978980a94ed5fc1b956d2dc1560efa";
    const API_TOKEN = "8ff014908bc520818e0406441fddab7b70ae1428196997a2";
    const SUBDOMAIN = "api.in.exotel.com";
    const SID = "oasisindia1m";
    const API_URL = `https://${SUBDOMAIN}/v1/Accounts/${SID}/Sms/send`;

    const senderId = "OASIST";
    const message = `OTP for enquiry with Oasis Fertility is ${otp_val} and valid for 2 minutes. Do not share this OTP with anyone for security reasons.`;

    // Data payload for the API request
    const params = new URLSearchParams({
      From: senderId,
      To: mobile,
      Body: message,
    });

    // Encode API_KEY and API_TOKEN for Basic Auth
    const authHeader = `Basic ${Buffer.from(`${API_KEY}:${API_TOKEN}`).toString(
      "base64"
    )}`;

    console.log(`[${requestId}] Sending OTP request to Exotel`);
    const exotelStartTime = Date.now();

    // Use fetch to send OTP via Exotel API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
      },
      body: params.toString(),
    });

    const exotelResponseTime = Date.now() - exotelStartTime;
    const data = await response.text();

    console.log(`[${requestId}] Exotel response status: ${response.status}, time: ${exotelResponseTime}ms`);

    if (response.ok) {
      if (!data.includes("Error") && !data.includes("error") && !data.includes("failed")) {
        // Success
        const successLog = {
          requestId,
          mobile: mobile.substring(0, 4) + "****",
          status: "SUCCESS",
          exotelStatus: response.status,
          exotelResponseTime_ms: exotelResponseTime,
          totalResponseTime_ms: Date.now() - startTime,
          hasErrorInResponse: false,
        };
        await otpLogger.log(successLog);

        console.log(`[${requestId}] ✅ OTP sent successfully`);

        return NextResponse.json(
          { success: true, response: data },
          { status: 200 }
        );
      } else {
        // Error in XML response
        const errorLog = {
          requestId,
          mobile: mobile.substring(0, 4) + "****",
          status: "EXOTEL_ERROR",
          errorCode: "ERROR_IN_RESPONSE",
          exotelStatus: response.status,
          exotelResponseTime_ms: exotelResponseTime,
          exotelResponse: data.substring(0, 200),
          totalResponseTime_ms: Date.now() - startTime,
          hasErrorInResponse: true,
        };
        await otpLogger.log(errorLog);

        console.error(`[${requestId}] ❌ Error response from Exotel:`, data.substring(0, 100));

        return NextResponse.json(
          { error: "Failed to send OTP", details: data },
          { status: 400 }
        );
      }
    } else {
      // HTTP error from Exotel
      const errorLog = {
        requestId,
        mobile: mobile.substring(0, 4) + "****",
        status: "HTTP_ERROR",
        exotelStatus: response.status,
        errorCode: `HTTP_${response.status}`,
        exotelResponseTime_ms: exotelResponseTime,
        exotelResponse: data.substring(0, 200),
        totalResponseTime_ms: Date.now() - startTime,
      };
      await otpLogger.log(errorLog);

      console.error(`[${requestId}] ❌ HTTP error from Exotel: ${response.status}`);

      return NextResponse.json(
        { error: "Failed to send OTP", details: data },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorLog = {
      requestId,
      status: "EXCEPTION",
      errorCode: "OTP_SEND_EXCEPTION",
      errorMessage: error.message,
      errorStack: error.stack?.substring(0, 200),
      totalResponseTime_ms: Date.now() - startTime,
    };
    await otpLogger.log(errorLog);

    console.error(`[${requestId}] 💥 Exception sending OTP:`, error.message);

    return NextResponse.json(
      {
        error: "An error occurred while sending the OTP",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
