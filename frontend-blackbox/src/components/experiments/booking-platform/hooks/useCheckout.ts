import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "../services/stripe.service";
import { stripePromise } from "@/lib/stripe";

export const useCheckout = () => {
  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: async (data) => {
      const stripe = await stripePromise;

      if (stripe && data.url) {
        window.location.href = data.url;
      }
    },
  });
};

//http://localhost:5173/experiments/booking-platform/app?location=&guests=1&minPrice=0&maxPrice=500&sort=price_asc&page=1&limit=6
