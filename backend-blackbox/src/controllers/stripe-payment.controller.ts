import { Request, Response } from "express";
import stripe from "../services/stripe";
import { Booking } from "../models/Booking";
import { Hotel } from "../models/Hotel";

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { hotelId, checkIn, checkOut, guests } = req.body;

    // 1️⃣ Obtener hotel real desde DB
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    // 2️⃣ Calcular noches
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (nights <= 0) {
      return res.status(400).json({ error: "Invalid dates" });
    }

    // 3️⃣ Calcular total real
    const total = nights * hotel.pricePerNight;

    // 4️⃣ Crear booking pending
    const booking = await Booking.create({
      hotelId,
      checkIn,
      checkOut,
      guests,
      total,
      status: "pending",
    });

    // 5️⃣ Crear sesión Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "chf",
            product_data: {
              name: hotel.name,
            },
            unit_amount: total * 100,
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
