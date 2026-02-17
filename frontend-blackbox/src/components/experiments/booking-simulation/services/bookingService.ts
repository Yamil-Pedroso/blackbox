import { hotels } from "../data/hotel";
import {
  type BookingQuery,
  type BookingResponse,
} from "../types/booking.types";

export async function fetchHotels(
  query: BookingQuery,
): Promise<BookingResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...hotels];

      if (query.location) {
        filtered = filtered.filter((hotel) =>
          hotel.location.toLowerCase().includes(query.location!.toLowerCase()),
        );
      }

      if (query.guests) {
        filtered = filtered.filter((hotel) => hotel.maxGuests >= query.guests!);
      }

      filtered = filtered.filter(
        (hotel) =>
          hotel.pricePerNight >= (query.minPrice ?? 0) &&
          hotel.pricePerNight <= (query.maxPrice ?? 9999),
      );

      if (query.sort === "price_asc") {
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
      }

      if (query.sort === "price_desc") {
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
      }

      if (query.sort === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
      }

      const start = (query.page - 1) * query.limit;
      const end = start + query.limit;

      const paginated = filtered.slice(start, end);

      resolve({
        data: paginated,
        total: filtered.length,
        hasMore: end < filtered.length,
      });
    }, 800);
  });
}
