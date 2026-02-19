import { useQuery } from "@tanstack/react-query";
import { fetchHotels } from "../services/bookingService";
import { type BookingQuery } from "../types/booking.types";

export function useBookingSearch(query: BookingQuery) {
  return useQuery({
    queryKey: [
      "hotels",
      query.location,
      query.guests,
      query.minPrice,
      query.maxPrice,
      query.sort,
      query.checkInDate,
      query.checkOutDate,
      query.page,
      query.limit,
    ],
    queryFn: () => fetchHotels(query),
    placeholderData: (previousData) => previousData,
  });
}

//http://localhost:5173/experiments/booking-simulation/app?location=&guests=1&minPrice=0&maxPrice=500&sort=price_asc&page=1&limit=6&checkInDate=2026-02-03&checkOutDate=2026-02-13
