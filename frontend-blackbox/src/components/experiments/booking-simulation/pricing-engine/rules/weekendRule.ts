import type { PricingRule } from "../../types/booking.types";

export const weekendRule: PricingRule = (context, nights, subtotal) => {
  void nights;
  void subtotal;

  const start = new Date(context.checkIn);
  const end = new Date(context.checkOut);

  let weekendCount = 0;
  const current = new Date(start);

  while (current < end) {
    const day = current.getDay();
    if (day === 0 || day === 6) {
      weekendCount++;
    }
    current.setDate(current.getDate() + 1);
  }

  const extra = weekendCount * context.hotel.pricePerNight * 0.15;

  return {
    label:
      weekendCount > 0
        ? `Weekend surcharge (15%) – ${weekendCount} weekend nights`
        : "Weekend surcharge",
    amount: extra,
  };
};
