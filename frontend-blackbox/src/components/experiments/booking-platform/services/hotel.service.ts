import { apiClient } from "../api/apiClient";
import type {
  PlatformHotel,
  PlatformHotelQuery,
  PaginatedHotelResponse,
} from "../types/platform.types";

export const searchHotels = async (
  query: PlatformHotelQuery,
): Promise<PaginatedHotelResponse> => {
  const { data } = await apiClient.get("/hotels", {
    params: query,
  });

  return data;
};

export const getHotelById = async (id: string): Promise<PlatformHotel> => {
  const { data } = await apiClient.get(`/hotels/${id}`);
  return data;
};
