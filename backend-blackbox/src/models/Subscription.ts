import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  planId: { type: String },
  status: { type: String, default: "pending" },
  stripeSubscriptionId: { type: String },
});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
