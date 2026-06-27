import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, default: "success" },
  createdAt: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
