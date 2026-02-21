import { useReducer } from "react";
import type { Hotel } from "../types/booking.types";

interface BookingFlowProps {
  hotel: Hotel;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

import {
  bookingFlowReducer,
  initialBookingFlowState,
} from "./bookingFlow.reducer";

import StepDates from "./steps/StepDates";
import StepGuests from "./steps/StepGuests";
import StepReview from "./steps/StepReview";
import StepConfirm from "./steps/StepConfirm";

export default function BookingFlow({
  hotel,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}: BookingFlowProps) {
  const [state, dispatch] = useReducer(bookingFlowReducer, {
    ...initialBookingFlowState,
    checkIn: initialCheckIn ? new Date(initialCheckIn) : null,
    checkOut: initialCheckOut ? new Date(initialCheckOut) : null,
    guests: initialGuests ?? 1,
  });

  return (
    <div className="max-w-2xl mx-auto p-8 bg-main-bg rounded-2xl border border-neutral-800">
      {state.step === "dates" && (
        <StepDates state={state} dispatch={dispatch} />
      )}

      {state.step === "guests" && (
        <StepGuests state={state} dispatch={dispatch} hotel={hotel} />
      )}

      {state.step === "review" && (
        <StepReview state={state} dispatch={dispatch} hotel={hotel} />
      )}

      {state.step === "confirm" && (
        <StepConfirm state={state} dispatch={dispatch} hotel={hotel} />
      )}
    </div>
  );
}
