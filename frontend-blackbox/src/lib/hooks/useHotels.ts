import { useQuery } from "@tanstack/react-query";
import { getHotels } from "../services/hotel.service";

export const useHotels = () => {
  return useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });
};
