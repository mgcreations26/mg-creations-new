import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    const appsScriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL?.trim();
    const signature = request.headers.get("stripe-signature");

    if (!secretKey || !webhookSecret || !signature) {
        return Response.json(
            { error: "Webhook is not configured." },
            { status: 400 }
        );
    }

    const stripe = new Stripe(secretKey);
    let event: Stripe.Event;

    try {
        const rawBody = await request.text();
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
                    // Retrieve full session with line items & variant metadata
                    const fullSession = await stripe.checkout.sessions.retrieve(
                        session.id,
                        { expand: ["line_items.data.price.product"] }
                    );

                    const purchasedItems = (fullSession.line_items?.data ?? []).map((li) => {
                        const productObj =
                            li.price?.product && typeof li.price.product === "object" && !("deleted" in li.price.product)
                                ? (li.price.product as Stripe.Product)
                                : null;

                        return {
                            productId: productObj?.metadata?.productId ?? "",
                            name: li.description ?? productObj?.name ?? "Item",
                            qty: li.quantity ?? 1,
                            style: productObj?.metadata?.selectedStyle ?? "",
                            color: productObj?.metadata?.selectedColor ?? "",
                            size: productObj?.metadata?.selectedSize ?? "",
                            amountTotal: (li.amount_total ?? 0) / 100,
                        };
                    });

                    const customerEmail =
                        fullSession.customer_details?.email ??
                        fullSession.customer_email ??
                        "";
                    const customerName = fullSession.customer_details?.name ?? "";
                    const customerPhone = fullSession.customer_details?.phone ?? "";
                    const shippingAddress = fullSession.collected_information?.shipping_details?.address
                        ?? (fullSession as unknown as { shipping_details?: { address?: Stripe.Address } }).shipping_details?.address
                        ?? fullSession.customer_details?.address
                        ?? null;

                    const orderPayload = {
                        type: "order",
                        id: fullSession.id,
                        eventId: event.id,
                        email: customerEmail,
                        customerName,
                        phone: customerPhone,
                        shippingAddress,
                        amountTotal: (fullSession.amount_total ?? 0) / 100,
                        currency: fullSession.currency ?? "usd",
                        items: purchasedItems,
                        details: JSON.stringify({
                            customerName,
                            email: customerEmail,
                            phone: customerPhone,
                            shippingAddress,
                            total: (fullSession.amount_total ?? 0) / 100,
                            items: purchasedItems,
                        }),
                    };

                    if (appsScriptUrl) {
                        const sheetRes = await fetch(appsScriptUrl, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(orderPayload),
                            redirect: "follow",
                        });

                        if (!sheetRes.ok) {
                            throw new Error(`Apps Script returned HTTP ${sheetRes.status}`);
                        }
                    } else {
                        console.warn("NEXT_PUBLIC_APPS_SCRIPT_URL not set; order logged only to console:", orderPayload);
                    }

                    console.info("Logged paid Stripe order:", {
                        eventId: event.id,
                        sessionId: fullSession.id,
                        email: customerEmail,
                        itemCount: purchasedItems.length,
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
