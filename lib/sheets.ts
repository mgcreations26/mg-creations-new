
export type Product = {
    productId: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    color: string;
    size: string;
    category: string;
    style: string;
    brand: string;
    mood: string;
    collection: string;
    theme: string;

    // Sales channels
    etsyListingId?: string;
    etsyListingUrl?: string;
    websiteEnabled?: boolean;
    etsyEnabled?: boolean;

    // Product and fulfillment tracking
    sku?: string;
    inventoryTracked?: boolean;
};

export type Mood = {
    id: number;
    name: string;
    tagline: string;
    productTitle: string;
    productCaption: string;
    bgColor: string;
    accentColor: string;
    textColor: string;
};

export type Category = {
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
};

const API_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

const GIDS = {
    WebsiteListings: "1655061874",
    Moods_Master: "1976545941",
    Theme: "262387479",
    Inventory: "1000465436",
    Pricing_Engine: "953971795",
    Design_Library: "1208329618",
    Google_Listings: "825475385",
};

export async function getProducts(): Promise<Product[]> {
    let rows: any[] = [];

    try {
        rows = await fetchSheetByGid(GIDS.WebsiteListings);
    } catch {
        rows = [];
    }

    // Fallback to local data if live sheet fetch fails or returns empty
    if (!rows || rows.length <= 1) {
        return RAW_LISTINGS_FALLBACK;
    }

    const dataRows = rows.slice(1);
    const mapped = dataRows
        .filter((row: any) => row.c && row.c[2] && row.c[2].v)
        .map((row: any) => {
            const rawTitle = String(row.c[2]?.v ?? "");
            const generatedSlug = rawTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");

            const rawPrice = String(row.c[4]?.v ?? "0").replace(/[^0-9.]/g, "");

            return {
                productId: String(row.c[0]?.v ?? generatedSlug),
                slug: generatedSlug,
                title: rawTitle,
                description: String(row.c[3]?.v ?? ""),
                price: parseFloat(rawPrice) || 0,
                imageUrl: String(row.c[6]?.v ?? ""),
                color: String(row.c[7]?.v ?? ""),
                size: String(row.c[8]?.v ?? ""),
                category: String(row.c[9]?.v ?? "General"),
                style: String(row.c[10]?.v ?? ""),
                brand: String(row.c[11]?.v ?? ""),
                mood: String(row.c[12]?.v ?? "General").trim(),
                collection: String(row.c[13]?.v ?? "General").trim(),
                theme: String(row.c[14]?.v ?? ""),
            };
        });

    // Deduplicate by productId (keeps first occurrence)
    const seen = new Map<string, Product>();
    for (const product of mapped) {
        if (!seen.has(product.productId)) {
            seen.set(product.productId, product);
        }
    }

    return Array.from(seen.values());
}

export async function getCollections(): Promise<string[]> {
    const products = await getProducts();
    const collections = products
        .map((p) => p.collection)
        .filter(
            (c) => c && c.trim() !== "" && c !== "General" && c !== "undefined"
        );

    return [...new Set(collections)].sort();
}

export async function getMoods(): Promise<Mood[]> {
    let rows: any[] = [];
    try {
        rows = await fetchSheetByGid(GIDS.Moods_Master);
    } catch {
        rows = [];
    }

    if (!rows || rows.length <= 1) {
        return [
            {
                id: 1,
                name: "😎 Slaying Errands",
                tagline: "Perfect Daily Streetwear",
                productTitle: "Canvas Tote",
                productCaption: "Look Loud",
                bgColor: "bg-[#ffff00]",
                accentColor: "#ffff00",
                textColor: "text-black",
            },
            {
                id: 2,
                name: "🛍️ Thrift Store Hunting",
                tagline: "Secure Vintage Gold",
                productTitle: "Utility Keychain",
                productCaption: "No More Tangled Keys",
                bgColor: "bg-[#8c52ff]",
                accentColor: "#8c52ff",
                textColor: "text-black",
            },
            {
                id: 3,
                name: "☕ Park Hangs & Chill",
                tagline: "Cozy Afternoons",
                productTitle: "Bookish Mug",
                productCaption: "Enjoy Morning Coffee",
                bgColor: "bg-[#e85d3f]",
                accentColor: "#e85d3f",
                textColor: "text-white",
            },
        ];
    }

    return rows
        .slice(1)
        .filter((row: any) => row.c && row.c[1]?.v)
        .map((row: any) => ({
            id: Number(row.c[0]?.v ?? 0),
            name: String(row.c[1]?.v ?? ""),
            tagline: String(row.c[2]?.v ?? ""),
            productTitle: String(row.c[3]?.v ?? ""),
            productCaption: String(row.c[4]?.v ?? ""),
            bgColor: String(row.c[15]?.v ?? "bg-gray-100"),
            accentColor: String(row.c[16]?.v ?? "#000000"),
            textColor: String(row.c[17]?.v ?? "text-black"),
        }));
}

export async function getCategories(): Promise<Category[]> {
    if (API_URL) {
        try {
            const res = await fetch(`${API_URL}?type=categories`, {
                next: { revalidate: 60 },
            });
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                return json.data.map((c: any) => ({
                    name: String(c.category_name || c.theme || ""),
                    slug: String(c.slug || c.category_name || c.theme || "")
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, ""),
                    description: String(
                        c.category_description || c.theme_description || ""
                    ),
                    imageUrl: String(c.category_image_url || c.theme_image_url || ""),
                }));
            }
        } catch {
            // Quietly fallback to direct GViz
        }
    }

    const rows = await fetchSheetByGid(GIDS.Theme);
    if (!rows || rows.length <= 1) {
        return CATEGORY_FALLBACK_DATA;
    }

    return rows
        .slice(1)
        .filter((row: any) => row.c && row.c[0]?.v)
        .map((row: any) => {
            const name = String(row.c[0]?.v ?? "");
            const explicitSlug = String(row.c[3]?.v ?? "").trim();
            return {
                name,
                slug:
                    explicitSlug ||
                    name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, ""),
                description: String(row.c[2]?.v ?? ""),
                imageUrl: String(row.c[1]?.v ?? ""),
            };
        });
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price || 0);
}

async function fetchSheetByGid(gid: string) {
    if (!SHEET_ID) return [];
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${gid}`;
    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return [];
        const text = await res.text();
        const jsonString = text.substring(47, text.length - 2);
        return JSON.parse(jsonString).table.rows || [];
    } catch {
        return [];
    }
}

// Complete category catalog fallback
const CATEGORY_FALLBACK_DATA: Category[] = [
    {
        name: "T-Shirt",
        slug: "t-shirts",
        description:
            "Discover the perfect blend of comfort and style with our collection of premium T-shirts.",
        imageUrl:
            "https://i.ibb.co/4wJzjkT9/A-photorealistic-high-resolution-202604050851-1.jpg",
    },
    {
        name: "Mug",
        slug: "mugs",
        description:
            "Enjoy your favorite hot or cold beverages in our high-quality ceramic mugs.",
        imageUrl: "https://i.ibb.co/DfJ0SMSv/MG-Creations-2000-x-2000-px-6.png",
    },
    {
        name: "Tote Bag",
        slug: "totebags",
        description:
            "Our versatile tote bags are the perfect blend of style and functionality.",
        imageUrl:
            "https://i.ibb.co/kNcYWBg/A-photorealistic-high-resolution-202604050852.jpg",
    },
    {
        name: "Hat",
        slug: "hat",
        description:
            "High-profile foam trucker caps and headwear for everyday style.",
        imageUrl:
            "https://i.ibb.co/N2X7GJ8d/A-photorealistic-high-resolution-202604050851.jpg",
    },
    {
        name: "Beanie",
        slug: "beanie",
        description: "Cozy knit beanies for cool weather wear.",
        imageUrl: "https://i.ibb.co/hPzM2Zy/apparel-beanie.jpg",
    },
    {
        name: "Sweatshirt",
        slug: "sweatshirt",
        description:
            "Experience ultimate comfort and style with our premium crewneck sweatshirts.",
        imageUrl:
            "https://i.ibb.co/K8dH18T/A-meticulously-detailed-202604050851-1.jpg",
    },
    {
        name: "Tank Top",
        slug: "embroidery",
        description:
            "Lightweight tank tops designed for breathable daily comfort.",
        imageUrl: "https://i.ibb.co/21d3CPHG/apparel-tank-top.png",
    },
    {
        name: "Hoodie",
        slug: "hoodie",
        description:
            "Soft fleece and cotton hoodies with adjustable drawstrings and cozy pockets.",
        imageUrl: "https://i.ibb.co/0y4tbPzx/apparel-hoodie.png",
    },
    {
        name: "Tumbler",
        slug: "tumbler",
        description:
            "Durable, insulated tumblers to keep your drinks at the ideal temperature.",
        imageUrl: "https://i.ibb.co/vxVQwmmc/apparel-20oz-tumbler.jpg",
    },
    {
        name: "Ornament",
        slug: "ornament",
        description:
            "Exquisite keepsake ornaments crafted to capture holiday memories.",
        imageUrl: "https://i.ibb.co/gLFsgTWz/accessories-star-ornament.png",
    },
    {
        name: "16 oz Glass Cup",
        slug: "16oz-glass-cup",
        description:
            "Sleek 16 oz glass cups designed for iced coffee and iced tea.",
        imageUrl:
            "https://i.ibb.co/hJMmfCzY/accessories-16oz-sipper-glass.png",
    },
];

// Product catalog fallback
const RAW_LISTINGS_FALLBACK: Product[] = [
    {
        productId: "tote-lbn-001",
        slug: "back-to-school-still-fabulous-canvas-tote-bag",
        title: "Back to School & Still Fabulous Canvas Tote Bag",
        description:
            "Step into the school year with vibrant retro energy! 100% heavy cotton canvas tote.",
        price: 15.95,
        imageUrl:
            "https://images-api.printify.com/mockup/6a8f5da896c72cf99602b5ef/101409/109940/retro-back-to-school-still-fabulous-canvas-tote-bag-bright-rainbow-teacher-tote-heavy-cotton-canvas-shopping-bag-groovy-student-book-bag.jpg?camera_label=lifestyle-front&revision=1787789132920&s=2048",
        color: "Natural",
        size: "Standard",
        category: "🎒 Back to School",
        style: "Retro",
        brand: "Printful",
        mood: "Back to School",
        collection: "LGBTQ2+",
        theme: "Back to School",
    },
    {
        productId: "hat-oto-001",
        slug: "taxi-service-trucker-hat-vintage-floral-taxi-logo-foam-cap",
        title: "Taxi Service Trucker Hat — Vintage Floral Taxi Logo Foam Cap",
        description:
            "A roomy five-panel foam trucker that brings retro roadside charm to everyday wear.",
        price: 19.95,
        imageUrl:
            "https://images-api.printify.com/mockup/6abec5dad39eb1d9340830a7/243675/109489/taxi-service-trucker-hat-vintage-floral-taxi-logo-foam-cap.jpg?camera_label=front&revision=1790887795135&s=2048",
        color: "Black, White, Red, Dark Navy",
        size: "One Size",
        category: "Trucker Hat",
        style: "Bold/Fun",
        brand: "Otto Cap",
        mood: "😎 Slaying Errands",
        collection: "Sassy Moms",
        theme: "Mom",
    },
    {
        productId: "mug-002w-11",
        slug: "mom-mode-activated-ceramic-mug",
        title: "Mom Mode Activated Ceramic Mug (11oz & 15oz)",
        description:
            "Power up your morning routine with this Mom Mode Activated ceramic coffee mug!",
        price: 12.95,
        imageUrl:
            "https://images-api.printify.com/mockup/6abea86ad430e8e1e30a25e5/104692/101750/mom-mode-activated-ceramic-mug-cute-colorful-coffee-cup-11oz-15oz.jpg?camera_label=front&revision=1790882716453&s=2048",
        color: "White",
        size: "11oz, 15oz",
        category: "Mom",
        style: "Bold/Fun",
        brand: "Generac Brand",
        mood: "😎 Slaying Errands",
        collection: "Sassy Moms",
        theme: "Mom",
    },
    {
        productId: "swsht-001",
        slug: "snack-dealer-crewneck-sweatshirt",
        title:
            "Snack Dealer Crewneck Sweatshirt — Retro Vending Machine Graphic",
        description: "Cozy oversized crewneck sweatshirt for snack lovers.",
        price: 37.95,
        imageUrl:
            "https://images-api.printify.com/mockup/6abea87dd430e8e1e30a25e7/25458/128102/snack-dealer-hoodie-cozy-funny-graphic-sweatshirt-snack-lover-gift-for-her-him-comfort-blend-oversized-hooded-pullover-sweater.jpg?camera_label=lifestyle-2&revision=1790885461251&s=2048",
        color: "White, Red, Black, Light Pink",
        size: "S, M, L, XL, 2XL",
        category: "Sweatshirt",
        style: "Bold/Fun",
        brand: "Gildan G1800",
        mood: "😎 Slaying Errands",
        collection: "Sassy Moms",
        theme: "Mom",
    },
    {
        productId: "tote-qt-e-001",
        slug: "personalized-custom-name-embroidered-zippered-canvas-tote-bag",
        title: "Personalized Custom Name Embroidered Zippered Canvas Tote Bag",
        description:
            "Heavy 12 oz cotton canvas with a zippered top and front zip pocket.",
        price: 35.95,
        imageUrl:
            "https://d123s6f1z9g2wk.cloudfront.net/files/2026/10/20261002003911-1f1bdf9a-f61c-6542-a37f-6e7bceafae97.png?revision=1790910886628&s=2048",
        color: "Natural/Royal, Natural/Black, Natural/Navy",
        size: '18" x 14" x 4.5"',
        category: "Canvas Tote Bag",
        style: "Personalized",
        brand: "Q-Tees",
        mood: "General",
        collection: "General",
        theme: "General",
    },
    {
        productId: "ts-b3001-001",
        slug: "sarcastic-ew-valentines-day-shirt",
        title: "Sarcastic Ew Valentine's Day Shirt",
        description:
            "Featuring a bold 'Ew' heart design, soft and durable Anti-Valentine tee.",
        price: 19.95,
        imageUrl:
            "https://images-api.printify.com/mockup/6977e9a04eed98159c01df42/18438/102049/sarcastic-ew-valentines-day-shirt-funny-anti-valentine-heart-tee.jpg?camera_label=hanging-3&revision=1769468221196&s=2048",
        color: "Navy, Black, Natural, White",
        size: "S, M, L, XL, 2XL, 3XL",
        category: "T-Shirt",
        style: "Festive",
        brand: "Bella Canvas 3001",
        mood: "General",
        collection: "Love & Connection",
        theme: "Valentine's",
    },
    {
        productId: "mug11-ac-001",
        slug: "monkey-letter-m-love-coffee-cup",
        title:
            "Monkey Letter M Love Coffee Cup, Heart Design Valentine’s Day Mug",
        description: "Custom accent mug with cute monkey and letter artwork.",
        price: 16.95,
        imageUrl:
            "https://images-api.printify.com/mockup/6945a1f061e6f8e0a90d7194/72184/102760/cute-monkey-letter-m-love-coffee-cup-heart-design-valentines-day-mug.jpg?camera_label=context-1&revision=1768904860610&s=2048",
        color: "Black, Red, Pink, Purple",
        size: "11oz",
        category: "Accent Coffee Mug",
        style: "Festive",
        brand: "Generac Brand",
        mood: "General",
        collection: "Love & Connection",
        theme: "Valentine's",
    },
];