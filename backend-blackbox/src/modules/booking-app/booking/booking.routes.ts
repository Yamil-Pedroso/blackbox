import express from "express";
import { getBookingById, getAllBookings } from "./booking.controller";

const router = express.Router();

router.get("/:id", getBookingById);
router.get("/", getAllBookings);

export default router;
