
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        };
        return entities[character];
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body as {
            name?: string;
            email?: string;
            subject?: string;
            message?: string;
        };

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof subject !== "string" ||
            typeof message !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !subject.trim() ||
            !message.trim()
        ) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        if (
            name.length > 150 ||
            email.length > 254 ||
            subject.length > 100 ||
            message.length > 10000
        ) {
            return NextResponse.json(
                { error: "One or more fields are too long." },
                { status: 400 }
            );
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const cleanMessage = message.trim();
        const cleanSubject = subject.trim();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        const gmailUser = process.env.GMAIL_USER;
        const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
        const toEmail = process.env.CONTACT_TO_EMAIL;

        if (!gmailUser || !gmailAppPassword || !toEmail) {
            console.error(
                "[Contact API] Gmail environment variables are missing."
            );
            return NextResponse.json(
                { error: "Email service is not configured." },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: gmailUser,
                pass: gmailAppPassword.replace(/\s/g, ""),
            },
        });

        const subjectLabels: Record<string, string> = {
            order: "Order Inquiry",
            custom: "Custom Order Request",
            shipping: "Shipping Question",
            return: "Return / Refund",
            wholesale: "Wholesale Inquiry",
            other: "Other",
        };

        const subjectLabel = subjectLabels[cleanSubject] ?? cleanSubject;

        const safeName = escapeHtml(cleanName);
        const safeEmail = escapeHtml(cleanEmail);
        const safeSubject = escapeHtml(subjectLabel);
        const safeMessage = escapeHtml(cleanMessage);

        await transporter.sendMail({
            from: {
                name: "MG Creations",
                address: gmailUser,
            },
            to: toEmail,
            replyTo: cleanEmail,
            subject: `[MG Creations Contact] ${subjectLabel} — ${cleanName}`,
            text: [
                "MG Creations — New Contact Form Submission",
                "",
                `Name: ${cleanName}`,
                `Email: ${cleanEmail}`,
                `Subject: ${subjectLabel}`,
                "",
                "Message:",
                cleanMessage,
            ].join("\n"),
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #241f1b;">
                    <div style="background: #e85d3f; padding: 24px 32px; border-radius: 12px 12px 0 0;">
                        <h1 style="margin: 0; color: white; font-size: 22px;">
                            MG CREATIONS — New Contact Form Submission
                        </h1>
                    </div>
                    <div style="background: #fffaf5; padding: 32px; border: 1px solid #f0e8e0;">
                        <p><strong>Name:</strong> ${safeName}</p>
                        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
                        <p><strong>Subject:</strong> ${safeSubject}</p>
                        <hr style="border: none; border-top: 1px solid #f0e8e0; margin: 24px 0;" />
                        <p><strong>Message:</strong></p>
                        <p style="font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>
                        <hr style="border: none; border-top: 1px solid #f0e8e0; margin: 24px 0;" />
                        <p style="font-size: 12px; color: #777;">
                            Submitted via mgcreations.store. Reply directly to this email to respond.
                        </p>
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[Contact API] Email delivery failed:", err);
        return NextResponse.json(
            { error: "Failed to send message. Please try again." },
            { status: 500 }
        );
    }
}
