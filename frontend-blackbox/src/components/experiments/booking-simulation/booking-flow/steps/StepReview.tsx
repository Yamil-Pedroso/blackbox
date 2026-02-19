/* eslint-disable @typescript-eslint/no-explicit-any */
import { calculatePricing } from "../../pricing-engine/pricingEngine";
import type { BookingFlowState } from "../../types/booking.types";
import PricingBreakdown from "../../components/PricingBreakdown";
import type { Hotel } from "../../types/booking.types";

interface Props {
  state: BookingFlowState;
  dispatch: React.Dispatch<any>;
  hotel: Hotel; // hotel seleccionado
}

export default function StepReview({ state, dispatch, hotel }: Props) {
  if (!state.checkIn || !state.checkOut) {
    return null;
  }

  const pricing = calculatePricing({
    hotel,
    checkIn: state.checkIn.toISOString().slice(0, 10),
    checkOut: state.checkOut.toISOString().slice(0, 10),
    guests: state.guests,
  });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">
        Review your booking
      </h2>

      <div className="bg-secondary-bg p-6 rounded-xl border border-neutral-800">
        <p className="text-secondary">
          📅 {state.checkIn.toDateString()} → {state.checkOut.toDateString()}
        </p>
        <p className="text-secondary">👥 Guests: {state.guests}</p>
      </div>

      <PricingBreakdown pricing={pricing} />

      <div className="flex justify-between mt-8">
        <button
          onClick={() => dispatch({ type: "PREV_STEP" })}
          className="text-secondary hover:text-primary transition"
        >
          Back
        </button>

        <button
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          className="bg-primary text-black px-6 py-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
