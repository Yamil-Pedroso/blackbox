import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { searchHotels } from "../services/hotel.service";
import type { PlatformHotelQuery } from "../types/platform.types";

export const useHotel = (query: PlatformHotelQuery) => {
  return useQuery({
    queryKey: ["platform-hotels", query],
    queryFn: () => searchHotels(query),
    placeholderData: keepPreviousData,
  });
};
