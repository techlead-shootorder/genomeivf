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

    pabbly(leadRequest) {
        return fetch("https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY0MDYzZjA0MzQ1MjY4NTUzZDUxM2Ei_pc", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(leadRequest),
        })
    }
}
