import stripe from "../../../core/config/stripe.client";
import { Booking } from "../booking/booking.model";
import { Hotel } from "../hotels/hotel.model";
import { calculateNights } from "../utils/calculateNights";
import { env } from "../../../core/config/env";

interface CreateCheckoutInput {
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export class StripePaymentService {
  static async createCheckoutSession(input: CreateCheckoutInput) {
    const { hotelId, checkIn, checkOut, guests } = input;

    // 1️⃣ Obtener hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) throw new Error("Hotel not found");

    if (!checkIn || !checkOut) throw new Error("Missing dates");

    // 2️⃣ Calcular noches
    const nights = calculateNights(checkIn, checkOut);
    if (nights <= 0) throw new Error("Invalid dates");

    // 3️⃣ Calcular total
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
      success_url: `${env.stripe.successUrl}?bookingId=${booking._id}`,
      cancel_url: `${env.stripe.cancelUrl}`,
    });

    booking.stripeSessionId = session.id;
    await booking.save();

    return session.url;
  }
}
