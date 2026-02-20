import { calculateNights } from "../utils/calculateNights";
import type {
  PricingContext,
  PricingResult,
  PricingLine,
  PricingRule,
} from "../types/booking.types";

import { basePriceRule } from "./rules/basePriceRule";
import { weekendRule } from "./rules/weekendRule";
import { guestRule } from "./rules/guestRule";
import { cleaningFeeRule } from "./rules/cleaningFeeRule";
import { taxRule } from "./rules/taxRule";
import { serviceFeeRule } from "./rules/serviceFeeRule";
import { seasonalRule } from "./rules/seasonalRule";

export function calculatePricing(context: PricingContext): PricingResult {
  const nights = calculateNights(context.checkIn, context.checkOut);

  let subtotal = 0;
  const lines: PricingLine[] = [];

  const rules: PricingRule[] = [
    basePriceRule,
    weekendRule,
    guestRule,
    seasonalRule,
    cleaningFeeRule,
    serviceFeeRule,
    taxRule,
  ];

  for (const rule of rules) {
    const result = rule(context, nights, subtotal);

    subtotal += result.amount;
    lines.push(result);
  }

  return {
    nights,
    lines,
    total: subtotal,
  };
}
