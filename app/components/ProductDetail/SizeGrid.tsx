import React from 'react';

interface SizeGridProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}

export default function SizeGrid({ sizes, selected, onSelect }: SizeGridProps) {
  if (!sizes.length) return null;
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase text-[#59413c]">Size</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={selected === s}
            aria-label={s}
            className={`px-3 py-1 rounded-full border ${selected === s ? 'ring-2 ring-amber-400' : ''}`}
            onClick={() => onSelect(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
