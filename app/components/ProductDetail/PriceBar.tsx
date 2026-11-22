
type PriceBarProps = {
  unitPrice: number;
  quantity: number;
};

function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function PriceBar({
  unitPrice,
  quantity,
}: PriceBarProps) {
  const totalPrice = unitPrice * quantity;

  return (
    <div className="rounded-xl border border-[#e0bfb8]/50 bg-white p-4">
      <div className="flex items-center justify-between text-sm text-[#59413c]">
        <span>Price per item</span>
        <span>{formatPrice(unitPrice)}</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[#e0bfb8]/40 pt-3">
        <span className="font-bold text-[#1f1b17]">
          Total ({quantity} {quantity === 1 ? "item" : "items"})
        </span>

        <span className="text-xl font-bold text-[#a93017]">
          {formatPrice(totalPrice)}
        </span>
      </div>
    </div>
  );
}
