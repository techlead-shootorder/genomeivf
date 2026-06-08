import { NextResponse } from "next/server";

// Salesforce OAuth2 - get access token using password grant
async function getSalesforceAccessToken() {
  const params = new URLSearchParams({
    grant_type: "password",
    client_id: process.env.SALESFORCE_LIVE_CLIENT_ID,
    client_secret: process.env.SALESFORCE_LIVE_CLIENT_SECRET,
    username: process.env.SALESFORCE_LIVE_USERNAME,
    password: process.env.SALESFORCE_LIVE_PASSWORD,
  });

  const response = await fetch("https://login.salesforce.com/services/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Salesforce auth error:", errorText);
    throw new Error(`Salesforce authentication failed: ${response.status}`);
  }

  return response.json();
}

// Create a Lead in Salesforce
async function createSalesforceLead(accessToken, instanceUrl, leadData) {
  const response = await fetch(`${instanceUrl}/services/data/v59.0/sobjects/Lead/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Salesforce lead creation error:", errorText);
    throw new Error(`Salesforce lead creation failed: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Lead form submission received:", body);

    // Get Salesforce access token
    const { access_token, instance_url } = await getSalesforceAccessToken();

    // Map form data to Salesforce Lead fields
    const leadData = {
      FirstName: body.firstName || "",
      LastName: body.firstName || "Not Provided",
      Phone: body.mobileNo || "",
      LeadSource: "Website",
      Company: "Genome IVF - Website Lead",
      Description: [
        body.looking_for ? `Looking for: ${body.looking_for}` : "",
        body.gender ? `Gender: ${body.gender}` : "",
        body.age ? `Age: ${body.age}` : "",
        body.placement ? `Placement: ${body.placement}` : "",
        body.pageUrl ? `Page URL: ${body.pageUrl}` : "",
        body.referralUrl ? `Referral URL: ${body.referralUrl}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    };

    // Add UTM fields if available
    if (body.utmSource) leadData.utm_source__c = body.utmSource;
    if (body.utmMedium) leadData.utm_medium__c = body.utmMedium;
    if (body.utmCampaign) leadData.utm_campaign__c = body.utmCampaign;
    if (body.utmTerm) leadData.utm_term__c = body.utmTerm;
    if (body.utmContent) leadData.utm_content__c = body.utmContent;
    if (body.gclid) leadData.GCLID__c = body.gclid;
    if (body.fbclid) leadData.FBCLID__c = body.fbclid;
    if (body.campaignid) leadData.Campaign_ID__c = body.campaignid;
    if (body.adgroupid) leadData.Ad_Group_ID__c = body.adgroupid;
    if (body.device) leadData.Device__c = body.device;
    if (body.matchtype) leadData.Match_Type__c = body.matchtype;

    const result = await createSalesforceLead(access_token, instance_url, leadData);
    console.log("Salesforce lead created:", result);

    return NextResponse.json({
      success: true,
      message: "Lead submitted to Salesforce successfully",
      salesforceId: result.id,
    });
  } catch (error) {
    console.error("Error submitting lead to Salesforce:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit lead. Please try again.",
      },
      { status: 500 }
    );
  }
}
