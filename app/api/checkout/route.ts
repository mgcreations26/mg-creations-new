
import Stripe from "stripe";
import { getProducts } from "@/lib/sheets";

export const runtime = "nodejs";

type CheckoutItem = {
    productId: string;
    quantity: number;
    selectedStyle?: string;
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

const CATEGORY_STYLE_PRICES: Record<
    string,
    { style: string; priceKey: "tShirt" | "crewneck" | "hoodie" | "totebag" | "mug" }
> = {
    "t-shirt": { style: "T-Shirt", priceKey: "tShirt" },
    sweatshirt: { style: "Crewneck", priceKey: "crewneck" },
    hoodie: { style: "Hoodie", priceKey: "hoodie" },
    "tote bag": { style: "Totebag", priceKey: "totebag" },
    mug: { style: "Mug", priceKey: "mug" },
};

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

        let allowedOrigins: string[] = [];

  // Parse the site URL defined in NEXT_PUBLIC_SITE_URL
  try {
    const parsedUrl = new URL(siteUrl);

    // Only allow HTTPS (or localhost for local dev)
    if (parsedUrl.protocol !== "https:" && parsedUrl.hostname !== "localhost") {
      return Response.json(
        { error: "Checkout URL configuration is invalid." },
        { status: 500 }
      );
    }

    const baseOrigin = parsedUrl.origin; // e.g. https://mgcreations.store
    allowedOrigins.push(baseOrigin);
    // Add www variant if not already present
    if (!parsedUrl.hostname.startsWith("www.")) {
      allowedOrigins.push(`https://www.${parsedUrl.hostname}`);
    }
  } catch {
    return Response.json(
      { error: "Checkout URL configuration is invalid." },
      { status: 500 }
    );
  }

        const requestOrigin = request.headers.get("origin");
        if (requestOrigin && !allowedOrigins.includes(requestOrigin)) {
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
                (entry.selectedStyle !== undefined &&
                    typeof entry.selectedStyle !== "string") ||
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
                selectedStyle: entry.selectedStyle as string | undefined,
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

            if (!product) {
                return Response.json(
                    { error: "A product is unavailable. Please refresh your cart." },
                    { status: 400 }
                );
            }

            const category = String(product.productType || "")
                .trim()
                .toLowerCase();

            const stylePricing = CATEGORY_STYLE_PRICES[category];

            let effectivePrice = Number(product.price);
            let confirmedStyle = "";

            if (stylePricing) {
                const requestedStyle = item.selectedStyle?.trim();

                if (
                    requestedStyle &&
                    requestedStyle !== "Standard" &&
                    requestedStyle !== stylePricing.style
                ) {
                    return Response.json(
                        { error: "The selected product style is unavailable." },
                        { status: 400 }
                    );
                }

                const configuredPrice =
                    product.stylePrices?.[stylePricing.priceKey];

                if (configuredPrice !== undefined) {
                    effectivePrice = configuredPrice;
                    confirmedStyle = stylePricing.style;
                }
            } else if (
                item.selectedStyle &&
                item.selectedStyle !== "Standard" &&
                item.selectedStyle !== "default"
            ) {
                return Response.json(
                    { error: "This product does not offer that style." },
                    { status: 400 }
                );
            }

            const unitAmount = Math.round(effectivePrice * 100);

            if (
                !Number.isFinite(effectivePrice) ||
                effectivePrice <= 0 ||
                !Number.isSafeInteger(unitAmount) ||
                unitAmount < 1
            ) {
                return Response.json(
                    { error: "A product has an invalid price. Please contact us." },
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
                confirmedStyle,
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
                        ...(product.description && product.description.trim()
                            ? { description: product.description.trim().slice(0, 490) }
                            : {}),
                        metadata: {
                            productId: product.productId,
                            productName: product.title,
                            selectedStyle: item.selectedStyle || "",
                            selectedColor: item.selectedColor || "",
                            selectedSize: item.selectedSize || "",
                            unitPrice: (unitAmount / 100).toString(),
                            orderSource: "Website",
                        },
                    },
                },
            });
        }

        const stripe = new Stripe(secretKey);

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            shipping_address_collection: { allowed_countries: ["US"] },
            phone_number_collection: { enabled: true },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: { amount: 595, currency: "usd" },
                        display_name: "Flat-Rate Shipping",
                    },
                },
            ],
            metadata: { orderSource: "Website" },
            success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/checkout/cancel`,
        });

        if (!session.url) {
            throw new Error("Stripe did not return a checkout URL.");
        }

        return Response.json({ url: session.url });
   
} catch (error) {
    const stripeError = error as {
        name?: string;
        message?: string;
        type?: string;
        code?: string;
        statusCode?: number;
        requestId?: string;
        raw?: {
            type?: string;
            code?: string;
            requestId?: string;
        };
        cause?: {
            name?: string;
            code?: string;
            message?: string;
        };
    };

   console.error("CHECKOUT_DIAGNOSTICS " + JSON.stringify({
    name: stripeError.name,
    message: stripeError.message ?? String(error),
    type: stripeError.type ?? stripeError.raw?.type,
    code: stripeError.code ?? stripeError.raw?.code,
    statusCode: stripeError.statusCode,
    requestId: stripeError.requestId ?? stripeError.raw?.requestId,
    causeName: stripeError.cause?.name,
    causeCode: stripeError.cause?.code,
    causeMessage: stripeError.cause?.message,
}));

    return Response.json(
        { error: "Unable to start checkout. Please try again." },
        { status: 500 }
    );
}
}


