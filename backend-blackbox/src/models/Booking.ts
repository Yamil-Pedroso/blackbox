import mongoose from "mongoose";

interface BookingDocument extends mongoose.Document {
  hotelId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;

  total: number;

  status: "pending" | "paid" | "cancelled";

  stripeSessionId?: string;

  createdAt: Date;
}

const bookingSchema = new mongoose.Schema({
  hotelId: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },

  total: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  },

  stripeSessionId: { type: String },

  createdAt: { type: Date, default: Date.now },
});

export const Booking = mongoose.model<BookingDocument>(
  "Booking",
  bookingSchema,
);
