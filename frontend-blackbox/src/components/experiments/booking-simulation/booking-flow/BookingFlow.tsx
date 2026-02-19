import { useReducer } from "react";
import type { Hotel } from "../types/booking.types";

import {
  bookingFlowReducer,
  initialBookingFlowState,
} from "./bookingFlow.reducer";

import StepDates from "./steps/StepDates";
import StepGuests from "./steps/StepGuests";
import StepReview from "./steps/StepReview";
import StepConfirm from "./steps/StepConfirm";

interface BookingFlowProps {
  hotel: Hotel;
}

export default function BookingFlow({ hotel }: BookingFlowProps) {
  const [state, dispatch] = useReducer(
    bookingFlowReducer,
    initialBookingFlowState,
  );

  return (
    <div className="max-w-2xl mx-auto p-8 bg-main-bg rounded-2xl border border-neutral-800">
      {state.step === "dates" && (
        <StepDates state={state} dispatch={dispatch} />
      )}

      {state.step === "guests" && (
        <StepGuests state={state} dispatch={dispatch} />
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
