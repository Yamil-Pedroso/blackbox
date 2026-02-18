type Status = "pending" | "active" | "done";
export interface BookingSimulationPhase {
  id: number;
  name: string;
  status: Status;
}

export interface Hotel {
  id: number | string;
  name: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  rating: number;
  amenities: string[];
  availableFrom: string; // ISO date
  availableTo: string; // ISO date
  image: string;
}

export interface BookingQuery {
  location: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
  sort: "price_asc" | "price_desc" | "rating";
  checkInDate?: string;
  checkOutDate?: string;
  page: number;
  limit: number;
}

export interface BookingResponse {
  data: Hotel[];
  total: number;
  hasMore: boolean;
}
