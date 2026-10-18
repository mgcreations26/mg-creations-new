
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const signature = request.headers.get("stripe-signature");

    if (!secretKey || !webhookSecret || !signature) {
        return Response.json(
            { error: "Webhook is not configured." },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        const rawBody = await request.text();
        const stripe = new Stripe(secretKey);

        event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            webhookSecret
        );
    } catch (error) {
        console.error("Stripe webhook signature verification failed:", error);

        return Response.json(
            { error: "Invalid webhook signature." },
            { status: 400 }
        );
    }

    try {
        switch (event.type) {
            case "checkout.session.completed":
            case "checkout.session.async_payment_succeeded": {
                const session = event.data.object as Stripe.Checkout.Session;

                if (
                    session.mode === "payment" &&
                    session.payment_status === "paid"
                ) {
                    // Temporary verification log.
                    // Replace with an idempotent database order update
                    // before using this event for fulfillment.
                    console.info("Verified Stripe payment:", {
                        eventId: event.id,
                        sessionId: session.id,
                        paymentIntent:
                            typeof session.payment_intent === "string"
                                ? session.payment_intent
                                : session.payment_intent?.id ?? null,
                        amountTotal: session.amount_total,
                        currency: session.currency,
                    });
                }

                break;
            }

            case "checkout.session.async_payment_failed": {
                const session = event.data.object as Stripe.Checkout.Session;

                console.warn("Stripe delayed payment failed:", {
                    eventId: event.id,
                    sessionId: session.id,
                });

                break;
            }

            default:
                // Other Stripe event types are intentionally ignored.
                break;
        }

        return Response.json({ received: true });
    } catch (error) {
        console.error("Stripe webhook processing failed:", error);

        return Response.json(
            { error: "Webhook processing failed." },
            { status: 500 }
        );
    }
}
