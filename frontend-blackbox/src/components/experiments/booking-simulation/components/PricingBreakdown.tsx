import type { PricingResult } from "../types/booking.types";

interface Props {
  pricing: PricingResult;
}

export default function PricingBreakdown({ pricing }: Props) {
  return (
    <div className="mt-4 border-t border-neutral-700 pt-3 text-sm">
      <p className="text-secondary mb-2">{pricing.nights} nights</p>

      {pricing.lines.map((line, index) => (
        <div key={index} className="flex justify-between text-secondary">
          <span>{line.label}</span>
          <span>CHF {line.amount.toFixed(2)}</span>
        </div>
      ))}

      <div className="flex justify-between mt-3 pt-3 border-t border-neutral-700 font-semibold text-primary">
        <span>Total</span>
        <span>CHF {pricing.total.toFixed(2)}</span>
      </div>
    </div>
  );
}
