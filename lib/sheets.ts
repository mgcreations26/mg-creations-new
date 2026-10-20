export type Product = {
    productId: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    productType: string; // Column 7 mapped to Product Type
    color: string;       // Column 8 mapped to Color variants
    size: string;
    category: string;
    style: string;
    brand: string;
    mood: string;
    collection: string;
    theme: string;
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

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

const GIDS = {
    WebsiteListings: "1655061874",
    Moods_Master: "1976545941",
    Theme: "262387479",
};

export async function getProducts(): Promise<Product[]> {
    let rows: any[] = [];
    try {
        rows = await fetchSheetByGid(GIDS.WebsiteListings);
    } catch {
        rows = [];
    }

    if (!rows || rows.length <= 1) return [];

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
                productType: String(row.c[7]?.v ?? ""), // Col 7 = Product Type
                color: String(row.c[8]?.v ?? ""),       // Col 8 = Color
                size: String(row.c[8]?.v ?? ""),        // Size fallback
                category: String(row.c[9]?.v ?? "General"),
                style: String(row.c[10]?.v ?? ""),
                brand: String(row.c[11]?.v ?? ""),
                mood: String(row.c[12]?.v ?? "General").trim(),
                collection: String(row.c[13]?.v ?? "General").trim(),
                theme: String(row.c[14]?.v ?? ""),
            };
        });

    // Combine multi-product listings by unique Slug/Title and merge color variants
    const combinedMap = new Map<string, Product>();
    for (const item of mapped) {
        if (!combinedMap.has(item.slug)) {
            combinedMap.set(item.slug, item);
        } else {
            const existing = combinedMap.get(item.slug)!;
            if (item.color && !existing.color.includes(item.color)) {
                existing.color = `${existing.color}, ${item.color}`;
            }
        }
    }

    return Array.from(combinedMap.values());
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
    const rows = await fetchSheetByGid(GIDS.Theme);
    if (!rows || rows.length <= 1) return [];

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