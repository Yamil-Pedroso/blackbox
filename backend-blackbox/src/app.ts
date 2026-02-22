import express from "express";
import cors from "cors";
import stripeRoutes from "./routes/stripe.routes";
import bookingRoutes from "./routes/booking.routes";
import hotelRoutes from "./routes/hotel.routes";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", stripeRoutes);
app.use("/api", bookingRoutes);
app.use("/api", hotelRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});
