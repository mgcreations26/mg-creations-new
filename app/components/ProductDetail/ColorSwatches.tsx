import React from 'react';

interface ColorSwatchesProps {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
}

export default function ColorSwatches({ colors, selected, onSelect }: ColorSwatchesProps) {
  if (!colors.length) return null;
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase text-[#59413c]">Color</p>
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={selected === c}
            aria-label={c}
            className={`w-8 h-8 rounded border ${selected === c ? 'ring-2 ring-amber-400' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => onSelect(c)}
          />
        ))}
      </div>
    </div>
  );
}
