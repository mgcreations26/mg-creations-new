export type Product = {
    productId: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    productType: string;
    color: string;
    size: string;
    category: string;
    style: string;
    brand: string;
    mood: string;
    collection: string;
    theme: string;
    trending?: boolean;
    freshDrop: boolean;
    bestSeller: boolean;
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


export type Theme = {
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    trending: boolean;
};


const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

const GIDS = {
    WebsiteListings: "1655061874",
    Moods_Master: "1976545941",
    Categories: "2040368225",
    Theme: "262387479",
};

function isChecked(value: unknown): boolean {
    return (
        value === true ||
        ["true", "yes", "1", "checked"].includes(
            String(value ?? "").trim().toLowerCase()
        )
    );
}

export async function getProducts(): Promise<Product[]> {
    let rows: any[] = [];
    try {
        rows = await fetchSheetByGid(GIDS.WebsiteListings);
    } catch {
        rows = [];
    }

    if (!rows || rows.length === 0) return [];

    // Filter out header row if present in rows
    const dataRows = rows.filter((row: any) => {
        const firstCol = String(row.c?.[0]?.v ?? "").toLowerCase();
        return firstCol !== "product id" && firstCol !== "";
    });


    const mapped = dataRows
        .filter((row: any) => row.c && row.c[2] && row.c[2].v)
        .map((row: any) => {
            const rawTitle = String(row.c[2]?.v ?? "");
            const generatedSlug = rawTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");

            const rawPrice = String(row.c[4]?.v ?? "0")
                .replace(/[^0-9.]/g, "");

            return {
                productId: String(row.c[0]?.v ?? generatedSlug),
                slug: generatedSlug,
                title: rawTitle,
                description: String(row.c[3]?.v ?? ""),
                price: parseFloat(rawPrice) || 0,
                imageUrl: String(row.c[6]?.v ?? ""),
                productType: String(row.c[7]?.v ?? ""),
                category: String(row.c[7]?.v ?? "General"),
                color: String(row.c[8]?.v ?? ""),
                size: String(row.c[9]?.v ?? ""),
                style: "",
                brand: "",
                mood: "General",
                collection: "General",
                theme: String(row.c[10]?.v ?? "").trim(),
                trending: false,
                freshDrop: isChecked(row.c[11]?.v),
                bestSeller: isChecked(row.c[12]?.v),
            };
        });

    // Combine multi-product listings by unique Slug/Title and merge color variants

    // Combine multi-product listings by unique Slug/Title and merge color variants.
    const combinedMap = new Map<string, Product>();

    for (const item of mapped) {
        const existing = combinedMap.get(item.slug);

        if (!existing) {
            combinedMap.set(item.slug, {
                ...item,
                imageUrl: item.imageUrl.trim(),
            });
            continue;
        }

        // Preserve an image if the first variant has no image.
        if (!existing.imageUrl.trim() && item.imageUrl.trim()) {
            existing.imageUrl = item.imageUrl.trim();
        }

        if (
            item.color &&
            !existing.color
                .split(", ")
                .includes(item.color)
        ) {
            existing.color = existing.color
                ? `${existing.color}, ${item.color}`
                : item.color;
        }

        if (item.trending) existing.trending = true;
        if (item.freshDrop) existing.freshDrop = true;
        if (item.bestSeller) existing.bestSeller = true;
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
    let rows: any[] = [];
    try {
        rows = await fetchSheetByGid(GIDS.Categories);
    } catch {
        rows = [];
    }

    // Fallback to Apps Script if fetchSheetByGid returns empty
    if ((!rows || rows.length <= 1) && APPS_SCRIPT_URL) {
        try {
            const res = await fetch(`${APPS_SCRIPT_URL}?type=categories`, { cache: "no-store" });
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                return json.data.map((c: any) => ({
                    name: String(c.category_name || "").trim(),
                    slug:
                        String(c.slug || c.category_name || "")
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)+/g, ""),
                    description: String(c.category_description || "").trim(),
                    imageUrl: String(c.category_image_url || "").trim(),
                }));
            }
        } catch {
            // quiet fallback
        }
    }

    if (!rows || rows.length <= 1) return [];

    return rows
        .slice(1)
        .filter((row: any) => row.c && row.c[1]?.v)
        .map((row: any) => {
            const name = String(row.c[1]?.v ?? "").trim();
            const explicitSlug = String(row.c[4]?.v ?? "").trim();
            return {
                name,
                slug:
                    explicitSlug ||
                    name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, ""),
                description: String(row.c[3]?.v ?? "").trim(),
                imageUrl: String(row.c[2]?.v ?? "").trim(),
            };
        });
}


export async function getThemes(): Promise<Theme[]> {
    let rows: any[] = [];

    try {
        rows = await fetchSheetByGid(GIDS.Theme);
    } catch {
        rows = [];
    }

    if (!rows || rows.length === 0) return [];

    return rows
        .filter((row: any) => {
            const checked = row.c?.[0]?.v;
            const themeName = String(row.c?.[1]?.v ?? "").trim();

            // Only show themes whose activation checkbox is checked.
            return isChecked(checked) && themeName !== "";
        })
        .map((row: any) => {
            const name = String(row.c?.[1]?.v ?? "").trim();

            return {
                name,
                slug: name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, ""),
                description: String(row.c?.[2]?.v ?? "").trim(),
                imageUrl: String(row.c?.[3]?.v ?? "").trim(),
                trending: isChecked(row.c?.[0]?.v),
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