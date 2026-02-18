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
