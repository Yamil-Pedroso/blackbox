import Stripe from "stripe";
import { Booking } from "../../booking/booking.model";

export const handleBookingPaymentSucceeded = async (event: Stripe.Event) => {
  const session = event.data.object as Stripe.Checkout.Session;

  const bookingId = session.metadata?.bookingId;

  if (!bookingId) {
    console.log("⚠️ No bookingId found in metadata");
    return;
  }

  await Booking.findByIdAndUpdate(bookingId, {
    status: "paid",
  });

  console.log("✅ Booking marked as paid:", bookingId);
};
