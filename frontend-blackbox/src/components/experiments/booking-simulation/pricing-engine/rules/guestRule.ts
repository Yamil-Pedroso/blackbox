import type { PricingContext } from "../../types/booking.types";

export function guestRule(context: PricingContext, nights: number) {
  if (context.guests <= 2) {
    return { label: "Guest fee", amount: 0 };
  }

  const extraGuests = context.guests - 2;
  const amount = extraGuests * 25 * nights;

  return {
    label: "Extra guest fee",
    amount,
  };
}
