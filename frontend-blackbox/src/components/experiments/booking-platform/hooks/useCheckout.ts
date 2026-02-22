import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "../../services/stripe.service";
import { stripePromise } from "../stripe";

export const useCheckout = () => {
  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: async (data) => {
      console.log("Checkout session created:", data);
      const stripe = await stripePromise;
      if (stripe && data.url) {
        window.location.href = data.url;
      }
    },
  });
};
