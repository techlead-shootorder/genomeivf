export class LeadController {

    submitLeadForm(leadRequest) {
        return fetch("/api/lead", {
            method: "POST",
            body: JSON.stringify(leadRequest),
        });
    }

    submitOtpForm(leadRequest) {
        return fetch("/api/otp", {
            method: "POST",
            body: JSON.stringify(leadRequest),
        });
    }

    submitLeadToSheet(leadRequest) {
        return fetch("/api/oasislp", {
            method: "POST",
            body: JSON.stringify(leadRequest),
        });
    }

    // Pabbly removed - leads now go to Salesforce via /api/lead
    pabbly(leadRequest) {
        // No-op: Salesforce is the primary CRM
        return Promise.resolve();
    }
}
