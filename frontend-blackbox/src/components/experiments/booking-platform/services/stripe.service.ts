import { apiClient } from "../api/apiClient";

export interface CreateCheckoutSessionPayload {
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface CheckoutSessionResponse {
  url: string;
}

export const createCheckoutSession = async (
  payload: CreateCheckoutSessionPayload,
): Promise<CheckoutSessionResponse> => {
  const { data } = await apiClient.post(
    "/payments/create-checkout-session",
    payload,
  );

  return data;
};
