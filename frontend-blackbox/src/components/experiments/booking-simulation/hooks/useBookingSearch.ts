import { useQuery } from "@tanstack/react-query";
import { fetchHotels } from "../services/bookingService";
import { type BookingQuery } from "../types/booking.types";

export function useBookingSearch(query: BookingQuery) {
  return useQuery({
    queryKey: ["hotels", query],
    queryFn: () => fetchHotels(query),
    placeholderData: (previousData) => previousData,
  });
}
