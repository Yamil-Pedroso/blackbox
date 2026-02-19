import type { PricingContext, PricingLine } from "../../types/booking.types";

export function basePriceRule(
  context: PricingContext,
  nights: number,
): PricingLine {
  const amount = context.hotel.pricePerNight * nights;

  return {
    label: `${nights} nights × CHF ${context.hotel.pricePerNight}`,
    amount,
  };
}
