type Status = "pending" | "active" | "done";
export interface BookingSimulationPhase {
  id: number;
  name: string;
  status: Status;
  goal?: string;
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

// Pricing Engine Types
export interface PricingContext {
  hotel: Hotel;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface PricingLine {
  label: string;
  amount: number;
}

export interface PricingResult {
  nights: number;
  lines: PricingLine[];
  total: number;
}

export type PricingRule = (
  context: PricingContext,
  nights: number,
  subtotal: number,
) => PricingLine;
