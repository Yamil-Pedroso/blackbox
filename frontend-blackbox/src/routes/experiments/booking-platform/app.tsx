import { createFileRoute } from "@tanstack/react-router";
import BookingPlatformApp from "@/components/experiments/booking-platform/BookingPlatformApp";
import type { PlatformHotelQuery } from "@/components/experiments/booking-platform/types/platform.types";

export const Route = createFileRoute("/experiments/booking-platform/app")({
  validateSearch: (search) => ({
    location: (search.location as string) ?? "",
    guests: Number(search.guests ?? 1),
    minPrice: Number(search.minPrice ?? 0),
    maxPrice: Number(search.maxPrice ?? 500),
    sort: (search.sort as PlatformHotelQuery["sort"]) ?? "price_asc",

    checkInDate: search.checkInDate ? String(search.checkInDate) : undefined,

    checkOutDate: search.checkOutDate ? String(search.checkOutDate) : undefined,
  }),
  component: BookingPlatformApp,
});
