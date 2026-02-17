export interface Hotel {
  id: number | string;
  name: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  rating: number;
  amenities: string[];
  image: string;
}

export interface BookingQuery {
  location: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
  sort: "price_asc" | "price_desc" | "rating";
  page: number;
  limit: number;
}

export interface BookingResponse {
  data: Hotel[];
  total: number;
  hasMore: boolean;
}
