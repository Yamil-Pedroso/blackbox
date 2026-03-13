import express from "express";
import cors from "cors";
import bookingAppRoutes from "./applications/booking-app/index";
import aiPaletteRoutes from "./applications/ai/aiPalette.routes";
export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://blackbox-one-olive.vercel.app",
];

// 🔥 1️⃣ STRIPE WEBHOOK FIRST (raw body)
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// 2️⃣ CORS
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

// 3️⃣ JSON parser AFTER webhook
app.use(express.json());

// 4️⃣ Routes
app.use("/api", bookingAppRoutes);
app.use("/api/ai", aiPaletteRoutes);
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});
