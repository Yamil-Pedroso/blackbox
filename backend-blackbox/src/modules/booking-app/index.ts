import { Router } from "express";

import bookingRoutes from "./booking/booking.routes";
import hotelRoutes from "./hotels/hotel.routes";
import stripeRoutes from "./payments/stripe.routes";

const router = Router();

router.use("/bookings", bookingRoutes);
router.use("/hotels", hotelRoutes);
router.use("/payments", stripeRoutes);

export default router;
