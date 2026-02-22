export type BookingStatus = "pending" | "paid" | "cancelled";

export interface PlatformHotel {
  _id: string;
  name: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  rating: number;
  amenities: string[];
  availableFrom: string;
  availableTo: string;
  image: string;
  createdAt?: string;
}

export interface PlatformBooking {
  _id: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: BookingStatus;
  stripeSessionId?: string;
  createdAt: string;
}

export interface PlatformHotelQuery {
  location?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc" | "rating";
  checkInDate?: string;
  checkOutDate?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedHotelResponse {
  data: PlatformHotel[];
  total: number;
  hasMore: boolean;
}

export interface CreateCheckoutPayload {
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}
