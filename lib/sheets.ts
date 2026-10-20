export type Product = {
    productId: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    productType: string; // Color column mapped to Product Type
    color: string;       // Size column mapped to Color
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
                size: String(row.c[8]?.v ?? ""),        // Retain size fallback
                category: String(row.c[9]?.v ?? "General"),
                style: String(row.c[10]?.v ?? ""),
                brand: String(row.c[11]?.v ?? ""),
                mood: String(row.c[12]?.v ?? "General").trim(),
                collection: String(row.c[13]?.v ?? "General").trim(),
                theme: String(row.c[14]?.v ?? ""),
            };
        });

    // Combine multi-product listings by unique Title/Slug
    const combinedMap = new Map<string, Product>();
    for (const item of mapped) {
        if (!combinedMap.has(item.slug)) {
            combinedMap.set(item.slug, item);
        } else {
            const existing = combinedMap.get(item.slug)!;
            // Merge unique colors if listing appears multiple times
            if (item.color && !existing.color.includes(item.color)) {
                existing.color = `${existing.color}, ${item.color}`;
            }
        }
    }

    return Array.from(combinedMap.values());
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