import { Request, Response } from "express";
import stripe from "../services/stripe";
import { Booking } from "../models/Booking";

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { hotelId, checkIn, checkOut, guests } = req.body;

    // 🔥 Aquí debes recalcular precio real (NO confiar en frontend)
    const total = 500; // ejemplo, luego lo conectamos a pricing engine

    // 1️⃣ Crear booking pending
    const booking = await Booking.create({
      hotelId,
      checkIn,
      checkOut,
      guests,
      total,
      status: "pending",
    });

    // 2️⃣ Crear sesión Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "chf",
            product_data: {
              name: "Hotel Booking",
            },
            unit_amount: total * 100, // Stripe trabaja en centavos
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: booking._id.toString(),
      },
      success_url: `${process.env.STRIPE_SUCCESS_URL}?bookingId=${booking._id}`,
      cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
    });

    booking.stripeSessionId = session.id;
    await booking.save();

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
