import { useInfiniteQuery } from "@tanstack/react-query";
import { searchHotels } from "../services/hotel.service";
import type { PlatformHotelQuery } from "../types/platform.types";

const PAGE_SIZE = 6;

export const useHotels = (filters: PlatformHotelQuery) => {
  return useInfiniteQuery({
    queryKey: ["platform-hotels", filters],

    queryFn: ({ pageParam = 1 }) =>
      searchHotels({
        ...filters,
        page: pageParam,
        limit: PAGE_SIZE,
      }),

    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,

    initialPageParam: 1,
  });
};
