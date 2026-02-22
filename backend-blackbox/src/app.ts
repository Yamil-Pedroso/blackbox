import express from "express";
import cors from "cors";
import stripeRoutes from "./routes/stripe.routes";
import bookingRoutes from "./routes/booking.routes";
import hotelRoutes from "./routes/hotel.routes";

export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://blackbox-one-olive.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
