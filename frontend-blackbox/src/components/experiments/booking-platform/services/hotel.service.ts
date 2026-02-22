import { apiClient } from "../api/apiClient";
import type {
  PlatformHotel,
  PlatformHotelQuery,
  PaginatedHotelResponse,
} from "../types/platform.types";

export const searchHotels = async (
  query: PlatformHotelQuery,
): Promise<PaginatedHotelResponse> => {
  const cleanQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([, value]) => value !== undefined && value !== "",
    ),
  );

  const { data } = await apiClient.get("/hotels", {
    params: cleanQuery,
  });

  return data;
};

export const getHotelById = async (id: string): Promise<PlatformHotel> => {
  const { data } = await apiClient.get(`/hotels/${id}`);
  return data;
};
