import { useMemo } from "react";
import { calculatePricing } from "../pricing-engine/pricingEngine";
import type { Hotel } from "../types/booking.types";

interface UsePricingParams {
  hotel: Hotel;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export function usePricing({
  hotel,
  checkIn,
  checkOut,
  guests = 1,
}: UsePricingParams) {
  return useMemo(() => {
    if (!checkIn || !checkOut) return null;

    return calculatePricing({
      hotel,
      checkIn,
      checkOut,
      guests,
    });
  }, [hotel, checkIn, checkOut, guests]);
}
