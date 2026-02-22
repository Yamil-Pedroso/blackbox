import express from "express";
import {
  getBookingById,
  getAllBookings,
} from "../controllers/booking.controller";

const router = express.Router();

router.get("/bookings/:id", getBookingById);
router.get("/bookings", getAllBookings);

export default router;
