import { useState } from "react";
import { calculatePricing } from "../../pricing-engine/pricingEngine";
import type {
  BookingFlowState,
  BookingFlowAction,
  Hotel,
} from "../../types/booking.types";

interface Props {
  state: BookingFlowState;
  dispatch: React.Dispatch<BookingFlowAction>;
  hotel: Hotel;
}

export default function StepConfirm({ state, dispatch, hotel }: Props) {
  // Generate booking ID only once
  const [bookingId] = useState(
    () => "BK-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
  );

  if (!state.checkIn || !state.checkOut) return null;

  const pricing = calculatePricing({
    hotel,
    checkIn: state.checkIn.toISOString().slice(0, 10),
    checkOut: state.checkOut.toISOString().slice(0, 10),
    guests: state.guests,
  });

  return (
    <div className="flex flex-col gap-8 text-center">
      <h2 className="text-2xl font-semibold text-primary">
        🎉 Booking Confirmed!
      </h2>

      <p className="text-secondary">
        Thank you for your reservation at{" "}
        <span className="text-primary font-semibold">{hotel.name}</span>.
      </p>

      <div className="bg-secondary-bg p-6 rounded-xl border border-neutral-800 space-y-3">
        <p className="text-secondary">
          📅 {state.checkIn.toDateString()} → {state.checkOut.toDateString()}
        </p>

        <p className="text-secondary">👥 Guests: {state.guests}</p>

        <p className="text-secondary">
          💰 Total Paid:{" "}
          <span className="text-primary font-semibold">
            CHF {pricing.total.toFixed(2)}
          </span>
        </p>

        <p className="text-green font-mono text-sm mt-4">
          Booking ID: {bookingId}
        </p>
      </div>

      <button
        onClick={() => dispatch({ type: "RESET" })}
        className="bg-primary text-black px-6 py-2 rounded-lg hover:opacity-90 transition"
      >
        Book Another Stay
      </button>
    </div>
  );
}
