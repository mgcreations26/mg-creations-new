import React from 'react';

interface QuantityStepperProps {
  quantity: number;
  setQuantity: (q: number) => void;
}

export default function QuantityStepper({ quantity, setQuantity }: QuantityStepperProps) {
  const decrement = () => setQuantity(Math.max(1, quantity - 1));
  const increment = () => setQuantity(quantity + 1);
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={decrement} className="px-2 py-1 border rounded">‑</button>
      <span className="px-2">{quantity}</span>
      <button type="button" onClick={increment} className="px-2 py-1 border rounded">+</button>
    </div>
  );
}
