import { Request, Response } from "express";
import stripe from "../services/stripe";
import { StripeEventHandler } from "../services/stripe-event-handler.service";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const stripeWebhookController = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw buffer
      sig,
      endpointSecret,
    );

    await StripeEventHandler.handle(event);

    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error("❌ Stripe webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
