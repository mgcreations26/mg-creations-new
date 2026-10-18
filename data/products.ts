export type Product = {
    productId: string;
    slug: string;
    designName: string;
    title: string;
    description: string;
    websitePrice: string;
    imageUrl: string;
    colors: string[];
    sizes: string[];
    productType: string;
    style: string;
    brand: string;
    mood: string;
    theme: string;
    collection: string;
    listOnWebsite: boolean;
};

export const products: Product[] = [
    {
        productId: "tote-back-to-school",
        slug: "back-to-school-still-fabulous-tote",
        designName: "Back to School & Still Fabulous",
        title:
            "Retro Back to School & Still Fabulous Canvas Tote Bag",
        description:
            "Step into the school year with vibrant retro energy. This colorful canvas tote combines practical everyday utility with unmistakable groovy style.",
        websitePrice: "$12.95",
        imageUrl:
            "https://i.etsystatic.com/38068797/r/il/3197e2/8484368711/il_1588xN.8484368711_2tg1.jpg",
        colors: ["Black", "Natural"],
        sizes: ['15" x 16"'],
        productType: "Tote Bag",
        style: "Canvas Tote Bag",
        brand: "MG Creations",
        mood: "Slaying Errands",
        theme: "Back to School",
        collection: "Americana",
        listOnWebsite: true,
    },

    {
        productId: "tote-nutcracker-book-club",
        slug: "nutcracker-book-club-canvas-tote-bag",
        designName: "Nutcracker Book Club",
        title:
            "Nutcracker Book Club Canvas Tote Bag, Christmas Reader Gift",
        description:
            "A festive canvas tote for readers who love cozy winter days, books, and holiday humor.",
        websitePrice: "$23.86",
        imageUrl:
            "https://i.etsystatic.com/38068797/r/il/a29266/7429744086/il_1588xN.7429744086_deiy.jpg",
        colors: ["White", "Black", "Red", "Beige", "Navy"],
        sizes: ['13" x 13"', '18" x 18"'],
        productType: "Tote Bag",
        style: "Canvas Tote Bag",
        brand: "Queer Gear Supply",
        mood: "Festive",
        theme: "Christmas",
        collection: "Holiday Cheer",
        listOnWebsite: true,
    },

    {
        productId: "tote-merry-grinchmas",
        slug: "funny-festive-merry-grinchmas-tote",
        designName: "Merry Grinchmas",
        title:
            "Funny Festive Merry Grinchmas Tote, Christmas Reusable Grocery Sack",
        description:
            "A playful holiday tote featuring bright Merry Grinch-mas lettering. Durable, roomy, and ready for groceries, gifts, or festive supplies.",
        websitePrice: "$23.86",
        imageUrl:
            "https://i.etsystatic.com/38068797/r/il/15e63f/7427054978/il_1588xN.7427054978_macc.jpg",
        colors: ["White", "Black", "Red", "Beige", "Navy"],
        sizes: ['13" x 13"', '18" x 18"'],
        productType: "Tote Bag",
        style: "Canvas Tote Bag",
        brand: "MG Creations",
        mood: "Festive",
        theme: "Christmas",
        collection: "Grinchmas",
        listOnWebsite: true,
    },

    {
        productId: "tote-personalized-gingerbread",
        slug: "personalized-gingerbread-tote-bag-custom",
        designName: "Personalized Gingerbread",
        title:
            "Personalized Gingerbread Tote Bag, Custom Name Holiday Gift",
        description:
            "A festive personalized gingerbread tote featuring a custom initial and name. Great for holiday gifts, groceries, books, and everyday use.",
        websitePrice: "$23.86",
        imageUrl:
            "https://i.etsystatic.com/38068797/r/il/cecaa4/7472650404/il_1588xN.7472650404_ppl1.jpg",
        colors: ["White", "Black", "Red", "Beige", "Navy"],
        sizes: ['13" x 13"', '18" x 18"'],
        productType: "Tote Bag",
        style: "Canvas Tote Bag",
        brand: "MG Creations",
        mood: "Festive",
        theme: "Christmas",
        collection: "Personalized Holidays",
        listOnWebsite: true,
    },

    {
        productId: "tote-empower-rise",
        slug: "empower-rise-raised-fist-black-history-month-tote",
        designName: "Empower & Rise",
        title:
            "Empower & Rise Raised Fist Black History Month Tote",
        description:
            "A bold statement tote celebrating Black pride, empowerment, and cultural identity.",
        websitePrice: "",
        imageUrl:
            "https://i.etsystatic.com/38068797/r/il/9b7069/5718862219/il_1588xN.5718862219_bskb.jpg",
        colors: ["White", "Black", "Red", "Beige", "Navy"],
        sizes: ['13" x 13"', '18" x 18"'],
        productType: "Tote Bag",
        style: "Canvas Tote Bag",
        brand: "MG Creations",
        mood: "Proud",
        theme: "Black Culture",
        collection: "Black All Day Everyday",
        listOnWebsite: true,
    },

    {
        productId: "tote-black-history",
        slug: "black-history-month-tote-afrocentric-aesthetic-canvas-book-bag",
        designName: "Black History Month",
        title:
            "Black History Month Tote, Afrocentric Aesthetic Canvas Book Bag",
        description:
            "A bold Afrocentric canvas tote featuring Black History imagery and vibrant cultural symbolism.",
        websitePrice: "$27.44",
        imageUrl:
            "https://i.etsystatic.com/38068797/r/il/906279/7744809921/il_1588xN.7744809921_jwgr.jpg",
        colors: ["White", "Black", "Red", "Beige", "Navy"],
        sizes: ['13" x 13"', '18" x 18"'],
        productType: "Tote Bag",
        style: "Canvas Tote Bag",
        brand: "MG Creations",
        mood: "Proud",
        theme: "Black Culture",
        collection: "Black All Day Everyday",
        listOnWebsite: true,
    },

    {
        productId: "tote-african-american-heritage",
        slug: "african-american-social-justice-ribbon-heritage-tote-black-excellence-canvas-book-bag",
        designName: "African American Heritage",
        title:
            "African American Social Justice Ribbon Heritage Tote, Black Excellence Canvas Book Bag",
        description:
            "A meaningful Afrocentric canvas tote celebrating Black history, heritage, excellence, and social justice.",
        websitePrice: "$27.44",
        imageUrl:
            "https://i.etsystatic.com/38068797/r/il/76c487/7744753055/il_1588xN.7744753055_q7r9.jpg",
        colors: ["White", "Black", "Red", "Beige", "Navy"],
        sizes: ['13" x 13"', '18" x 18"'],
        productType: "Tote Bag",
        style: "Canvas Tote Bag",
        brand: "Queer Gear Supply",
        mood: "Proud",
        theme: "Black Culture",
        collection: "Black All Day Everyday",
        listOnWebsite: true,
    },

    {
        productId: "swsht-g1800",
        slug: "coquette-bow-4th-of-july-sweatshirt",
        designName: "Coquette Bow 4th of July",
        title: "Coquette Bow 4th of July Sweatshirt",
        description:
            "A nostalgic patriotic sweatshirt featuring watercolor-style coquette bows and classic Americana styling.",
        websitePrice: "$34.75",
        imageUrl:
            "https://i.etsystatic.com/38068797/r/il/f8c8ae/8212301542/il_1588xN.8212301542_m6jk.jpg",
        colors: [
            "White",
            "Red",
            "Light Pink",
            "Irish Green",
            "Safety Orange",
            "Safety Green",
            "Heather Sport Royal",
            "Heather Scarlet Red",
        ],
        sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
        productType: "Sweatshirt",
        style: "Gildan G1800",
        brand: "Queer Gear Supply",
        mood: "Celebratory",
        theme: "Patriotic",
        collection: "Americana",
        listOnWebsite: true,
    },
];

export function getProductBySlug(slug: string) {
    return products.find((product) => product.slug === slug);
}

export function getProductsByMood(mood: string) {
    return products.filter(
        (product) =>
            product.listOnWebsite &&
            product.mood.toLowerCase() === mood.toLowerCase()
    );
}