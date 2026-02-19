import type { PricingContext, PricingLine } from "../../types/booking.types";

export function taxRule(
  _context: PricingContext,
  _nights: number,
  subtotal: number,
): PricingLine {
  const amount = subtotal * 0.08;

  return {
    label: "Taxes (8%)",
    amount,
  };
}
