// pricing-engine/rules/seasonalRule.ts

import { isWithinInterval } from "date-fns";
import type { PricingRule, PricingLine } from "../../types/booking.types";

export const seasonalRule: PricingRule = (
  context,
  nights,
  subtotal,
): PricingLine => {
  if (nights <= 0 || subtotal <= 0) {
    return {
      label: "Seasonal Adjustment",
      amount: 0,
    };
  }

  const checkInDate = new Date(context.checkIn);
  const year = checkInDate.getFullYear();

  const highSeason = {
    start: new Date(year, 5, 1), // June 1
    end: new Date(year, 7, 31), // August 31
  };

  const lowSeason = {
    start: new Date(year, 0, 10), // Jan 10
    end: new Date(year, 2, 15), // March 15
  };

  let multiplier = 0;

  if (isWithinInterval(checkInDate, highSeason)) {
    multiplier = 0.25; // +25%
  } else if (isWithinInterval(checkInDate, lowSeason)) {
    multiplier = -0.15; // -15%
  }

  const seasonalAmount = subtotal * multiplier;

  return {
    label:
      multiplier > 0
        ? "High Season Adjustment"
        : multiplier < 0
          ? "Low Season Discount"
          : "Seasonal Adjustment",
    amount: seasonalAmount,
  };
};
