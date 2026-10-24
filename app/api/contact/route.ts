import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// The inbox that receives the contact form submissions
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "hello@mgcreations.store";
// The "from" address — must be a verified domain in your Resend account
// During development you can use the Resend shared domain: onboarding@resend.dev
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "MG Creations <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body as {
            name: string;
            email: string;
            subject: string;
            message: string;
        };

        // Basic server-side validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        }

        const subjectLabels: Record<string, string> = {
            order: "Order Inquiry",
            custom: "Custom Order Request",
            shipping: "Shipping Question",
            return: "Return / Refund",
            wholesale: "Wholesale Inquiry",
            other: "Other",
        };
        const subjectLabel = subjectLabels[subject] ?? subject;

        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [TO_EMAIL],
            replyTo: email,
            subject: `[MG Creations Contact] ${subjectLabel} — ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #241f1b;">
                    <div style="background: #e85d3f; padding: 24px 32px; border-radius: 12px 12px 0 0;">
                        <h1 style="margin: 0; color: white; font-size: 22px; font-weight: 900; letter-spacing: -0.5px;">
                            MG CREATIONS — New Contact Form Submission
                        </h1>
                    </div>
                    <div style="background: #fffaf5; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #f0e8e0;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #999; width: 120px;">Name</td>
                                <td style="padding: 8px 0; font-size: 15px; font-weight: 700;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #999;">Email</td>
                                <td style="padding: 8px 0; font-size: 15px; font-weight: 700;"><a href="mailto:${email}" style="color: #e85d3f;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #999;">Subject</td>
                                <td style="padding: 8px 0; font-size: 15px; font-weight: 700;">${subjectLabel}</td>
                            </tr>
                        </table>
                        <hr style="border: none; border-top: 1px solid #f0e8e0; margin: 24px 0;" />
                        <p style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #999; margin: 0 0 12px;">Message</p>
                        <p style="font-size: 15px; line-height: 1.7; white-space: pre-wrap; margin: 0;">${message}</p>
                        <hr style="border: none; border-top: 1px solid #f0e8e0; margin: 24px 0;" />
                        <p style="font-size: 12px; color: #aaa; margin: 0;">
                            Submitted via mgcreations.store contact form · Reply directly to this email to respond to ${name}.
                        </p>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error("[Contact API] Resend error:", error);
            return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[Contact API] Unexpected error:", err);
        return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
}
