type AddToCartCTAProps = {
  onAdd: () => void;
};

export default function AddToCartCTA({ onAdd }: AddToCartCTAProps) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="w-full rounded-xl bg-[#1b7a43] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#155f34] focus:outline-none focus:ring-2 focus:ring-[#1b7a43] focus:ring-offset-2"
    >
      Add to Cart
    </button>
  );
}
