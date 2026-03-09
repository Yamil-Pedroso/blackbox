import { Request, Response } from "express";
import { Booking } from "./booking.model";
import { asyncHandler } from "../../../core/middlewares/asyncHandler";

// 🔹 Get booking by ID
export const getBookingById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  },
);

// 🔹 Optional: list all bookings (for admin / debug)
export const getAllBookings = asyncHandler(
  async (_req: Request, res: Response) => {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  },
);
