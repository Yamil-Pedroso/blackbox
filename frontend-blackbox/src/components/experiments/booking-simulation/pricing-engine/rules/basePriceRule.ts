import type { PricingContext, PricingLine } from "../../types/booking.types";

export function basePriceRule(
  context: PricingContext,
  nights: number,
): PricingLine {
  const amount = context.hotel.pricePerNight * nights;

  console.log(
    `Base Price Rule: ${nights} nights at CHF ${context.hotel.pricePerNight}/night = CHF ${amount}`,
  );

  return {
    label: `${nights} nights × CHF ${context.hotel.pricePerNight}`,
    amount,
  };
}
