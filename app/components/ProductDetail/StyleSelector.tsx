
"use client";

import {
    Shirt,
    Layers,
    ShoppingBag,
    Coffee,
} from "lucide-react";

type StylePrices = {
    tShirt?: number;
    crewneck?: number;
    hoodie?: number;
    totebag?: number;
    mug?: number;
};

type StyleOption = {
    key: keyof StylePrices;
    label: string;
    icon: typeof Shirt;
};

const STYLE_OPTIONS: StyleOption[] = [
    { key: "tShirt", label: "T-Shirt", icon: Shirt },
    { key: "crewneck", label: "Crewneck", icon: Layers },
    { key: "hoodie", label: "Hoodie", icon: Shirt },
    { key: "totebag", label: "Tote Bag", icon: ShoppingBag },
    { key: "mug", label: "Mug", icon: Coffee },
];

function normalize(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getStylePricing(
    productType: string,
    stylePrices?: StylePrices
): { style: string; price: number } | null {
    if (!stylePrices) return null;

    const available = STYLE_OPTIONS.filter(
        (option) =>
            typeof stylePrices[option.key] === "number" &&
            stylePrices[option.key]! > 0
    );

    if (available.length === 0) return null;

    const normalizedType = normalize(productType || "");

    const aliases: Record<string, keyof StylePrices> = {
        tshirt: "tShirt",
        tshirts: "tShirt",
        shirt: "tShirt",
        shirts: "tShirt",
        gildan5000: "tShirt",
        crewneck: "crewneck",
        sweatshirt: "crewneck",
        sweatshirtcrewneck: "crewneck",
        hoodie: "hoodie",
        hoodies: "hoodie",
        tote: "totebag",
        totebag: "totebag",
        bag: "totebag",
        mug: "mug",
        mugs: "mug",
    };

    const matchingKey = aliases[normalizedType];

    const selected =
        available.find((option) => option.key === matchingKey) ??
        available[0];

    return {
        style: selected.label,
        price: stylePrices[selected.key]!,
    };
}

type StyleSelectorProps = {
    productType: string;
    stylePrices?: StylePrices;
    selectedStyle: string;
    onSelect: (style: string, price: number) => void;
};

export default function StyleSelector({
    productType,
    stylePrices,
    selectedStyle,
    onSelect,
}: StyleSelectorProps) {
    const availableStyles = STYLE_OPTIONS.filter(
        (option) =>
            typeof stylePrices?.[option.key] === "number" &&
            stylePrices[option.key]! > 0
    );

    const styles = availableStyles.length > 0
        ? availableStyles
        : [{
            key: "tShirt" as const,
            label: productType || "Standard",
            icon: Shirt,
        }];

    return (
        <div className="w-full space-y-3">
            <div className="text-base font-semibold text-[#333333]">
                Style: {selectedStyle}
            </div>

            <div className="flex flex-wrap items-center gap-3">
                {styles.map((style) => {
                    const Icon = style.icon;
                    const isSelected =
                        normalize(selectedStyle) === normalize(style.label);

                    const stylePrice = stylePrices?.[style.key];

                    return (
                        <button
                            key={style.key}
                            type="button"
                            onClick={() => {
                                if (stylePrice !== undefined) {
                                    onSelect(style.label, stylePrice);
                                }
                            }}
                            aria-label={`Select ${style.label}`}
                            aria-pressed={isSelected}
                            className={`
                                flex min-w-[76px] flex-col items-center justify-center
                                gap-1 rounded-lg border-2 px-3 py-3
                                transition-all duration-200
                                ${isSelected
                                    ? "border-[#ffff00] bg-[#fffde5] text-[#222222] shadow-sm"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                                }
                            `}
                        >
                            <Icon className="h-7 w-7" strokeWidth={1.7} />

                            <span className="text-xs font-semibold whitespace-nowrap">
                                {style.label}
                            </span>

                            {stylePrice !== undefined && (
                                <span className="text-[10px] text-gray-500">
                                    ${stylePrice.toFixed(2)}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
