import Stripe from "stripe";
import stripe from "../stripe";
import { Subscription } from "../../models/Subscription";
import { Transaction } from "../../models/Transaction";

export async function handleInvoicePaymentSucceeded(
  event: Stripe.Event,
): Promise<void> {
  const invoice = event.data.object as Stripe.Invoice;

  const subscriptionId =
    invoice.parent?.type === "subscription_details"
      ? (invoice.parent.subscription_details?.subscription as string)
      : null;

  if (!subscriptionId) {
    console.log("ℹ️ Invoice without subscription");
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const { userId, planId } = subscription.metadata;

  if (!userId) {
    throw new Error("Missing userId in metadata");
  }

  // 🔥 Activar suscripción en Mongo
  const updated = await Subscription.findOneAndUpdate(
    { userId, status: "pending" },
    {
      status: "active",
      stripeSubscriptionId: subscriptionId,
      planId,
    },
    { new: true },
  );

  if (!updated) {
    console.log("⚠️ No pending subscription found");
    return;
  }

  // 🔥 Guardar transacción
  await Transaction.create({
    userId,
    amount: invoice.amount_paid / 100,
    currency: invoice.currency.toUpperCase(),
    status: "success",
  });

  console.log("✅ Subscription activated and transaction stored");
}
