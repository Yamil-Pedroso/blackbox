import Stripe from "stripe";
import { handleInvoicePaymentSucceeded } from "./handlers/invoice-payment-suceeded.handler";
import { handleSubscriptionDeleted } from "./handlers/subscription-deleted.handler";
import { handleBookingPaymentSucceeded } from "./handlers/booking-payment-succeeded.handler";

export class StripeEventHandler {
  static async handle(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      // 🔹 Subscription events
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event);
        break;

      case "invoice.payment_failed":
        console.log("⚠️ Subscription payment failed");
        break;

      // 🔥 NEW: Booking payment (one-time)
      case "checkout.session.completed":
        await handleBookingPaymentSucceeded(event);
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
  }
}
