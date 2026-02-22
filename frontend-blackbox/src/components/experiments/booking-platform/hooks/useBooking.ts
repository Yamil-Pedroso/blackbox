// src/hooks/useBooking.ts
import { useQuery } from "@tanstack/react-query";
import { getAllBookings, getBookingById } from "../../services/booking.service";

export const useBooking = (bookingId: string | null) => {
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId!),
    enabled: !!bookingId, // solo ejecutar si existe
  });
};

export const useAllBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => getAllBookings(),
  });
};
