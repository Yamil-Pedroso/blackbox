import type { PricingContext, PricingLine } from "../../types/booking.types";
export function serviceFeeRule(
  _context: PricingContext,
  _nights: number,
  subtotal: number,
): PricingLine {
  const amount = subtotal * 0.1;

  return {
    label: "Service fee (10%)",
    amount,
  };
}
