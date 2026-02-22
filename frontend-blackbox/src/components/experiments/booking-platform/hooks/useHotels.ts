import { useInfiniteQuery } from "@tanstack/react-query";
import { searchHotels } from "../services/hotel.service";
import type { PlatformHotelQuery } from "../types/platform.types";

export const useHotels = (filters: PlatformHotelQuery) => {
  return useInfiniteQuery({
    queryKey: ["platform-hotels", filters],
    queryFn: ({ pageParam = 1 }) =>
      searchHotels({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMore) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
