import Stripe from "stripe";
import { getProducts } from "@/lib/sheets";

export const runtime = "nodejs";

type CheckoutItem = {
    productId: string;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function getOptions(value: unknown): string[] {
    if (typeof value !== "string" || !value.trim()) {
        return [];
    }

    return value
        .split(",")
        .map((option) => option.trim())
        .filter(Boolean);
}

export async function POST(request: Request) {
    try {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

        if (!secretKey || !siteUrl) {
            return Response.json(
                { error: "Checkout is not configured." },
                { status: 500 }
            );
        }

        let origin: string;

        try {
            const parsedUrl = new URL(siteUrl);

            if (
                parsedUrl.protocol !== "https:" &&
                parsedUrl.hostname !== "localhost"
            ) {
                return Response.json(
                    { error: "Checkout URL configuration is invalid." },
                    { status: 500 }
                );
            }

            origin = parsedUrl.origin;
        } catch {
            return Response.json(
                { error: "Checkout URL configuration is invalid." },
                { status: 500 }
            );
        }

        const requestOrigin = request.headers.get("origin");

        if (requestOrigin && requestOrigin !== origin) {
            return Response.json(
                { error: "Invalid request origin." },
                { status: 403 }
            );
        }

        let body: unknown;

        try {
            body = await request.json();
        } catch {
            return Response.json(
                { error: "Invalid checkout request." },
                { status: 400 }
            );
        }

        if (
            !isRecord(body) ||
            !Array.isArray(body.items) ||
            body.items.length === 0 ||
            body.items.length > 50
        ) {
            return Response.json(
                { error: "Your cart is empty or invalid." },
                { status: 400 }
            );
        }

        const items: CheckoutItem[] = [];

        for (const entry of body.items) {
            if (
                !isRecord(entry) ||
                typeof entry.productId !== "string" ||
                !entry.productId.trim() ||
                !Number.isSafeInteger(entry.quantity) ||
                (entry.quantity as number) < 1 ||
                (entry.quantity as number) > 99 ||
                (entry.selectedColor !== undefined &&
                    typeof entry.selectedColor !== "string") ||
                (entry.selectedSize !== undefined &&
                    typeof entry.selectedSize !== "string")
            ) {
                return Response.json(
                    { error: "A cart item is invalid." },
                    { status: 400 }
                );
            }

            items.push({
                productId: entry.productId,
                quantity: entry.quantity as number,
                selectedColor: entry.selectedColor as string | undefined,
                selectedSize: entry.selectedSize as string | undefined,
            });
        }

        const products = await getProducts();

        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        for (const item of items) {
            const product = products.find(
                (candidate) => candidate.productId === item.productId
            );

            const price = Number(product?.price);
            const unitAmount = Math.round(price * 100);

            if (
                !product ||
                !Number.isFinite(price) ||
                price <= 0 ||
                !Number.isSafeInteger(unitAmount) ||
                unitAmount < 1
            ) {
                return Response.json(
                    {
                        error:
                            "A product is unavailable. Please refresh your cart.",
                    },
                    { status: 400 }
                );
            }

            const availableColors = getOptions(product.color);
            const availableSizes = getOptions(product.size);

            if (
                item.selectedColor &&
                !availableColors.includes(item.selectedColor)
            ) {
                return Response.json(
                    { error: "A selected color is unavailable." },
                    { status: 400 }
                );
            }

            if (
                item.selectedSize &&
                !availableSizes.includes(item.selectedSize)
            ) {
                return Response.json(
                    { error: "A selected size is unavailable." },
                    { status: 400 }
                );
            }

            const variant = [
                item.selectedColor,
                item.selectedSize,
            ]
                .filter(Boolean)
                .join(" / ");

            lineItems.push({
                quantity: item.quantity,
                price_data: {
                    currency: "usd",
                    unit_amount: unitAmount,
                    product_data: {
                        name: variant
                            ? `${product.title} — ${variant}`
                            : product.title,
                        ...(product.description
                            ? { description: product.description }
                            : {}),
                    },
                },
            });
        }

        const stripe = new Stripe(secretKey);

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url:
                `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/checkout/cancel`,
        });

        if (!session.url) {
            throw new Error("Stripe did not return a checkout URL.");
        }

        return Response.json({ url: session.url });
    } catch (error) {
        console.error("Checkout creation failed:", error);

        return Response.json(
            { error: "Unable to start checkout. Please try again." },
            { status: 500 }
        );
    }
}