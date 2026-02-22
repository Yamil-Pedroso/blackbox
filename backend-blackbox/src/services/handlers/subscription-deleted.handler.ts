import Stripe from "stripe";
import { Subscription } from "../../models/Subscription";

export async function handleSubscriptionDeleted(
  event: Stripe.Event,
): Promise<void> {
  const subscription = event.data.object as Stripe.Subscription;
  const { userId } = subscription.metadata;

  if (!userId) {
    console.log("⚠️ No userId in metadata");
    return;
  }

  await Subscription.updateOne(
    {
      userId,
      stripeSubscriptionId: subscription.id,
    },
    {
      status: "cancelled",
    },
  );

  console.log("✅ Subscription cancelled for user:", userId);
}
