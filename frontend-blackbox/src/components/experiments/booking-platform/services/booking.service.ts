import { apiClient } from "../api/apiClient";

export interface Booking {
  _id: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: "pending" | "paid" | "cancelled";
  createdAt: string;
}

export const getBookingById = async (id: string): Promise<Booking> => {
  const { data } = await apiClient.get(`/bookings/${id}`);
  return data;
};

export const getAllBookings = async (): Promise<Booking[]> => {
  const { data } = await apiClient.get("/bookings");
  return data;
};
