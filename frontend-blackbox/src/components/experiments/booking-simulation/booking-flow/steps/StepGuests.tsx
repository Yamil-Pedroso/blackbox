/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BookingFlowState } from "../../types/booking.types";
import type { Hotel } from "../../types/booking.types";

interface Props {
  state: BookingFlowState;
  dispatch: React.Dispatch<any>;
  hotel: Hotel;
}

export default function StepGuests({ state, dispatch, hotel }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">How many guests?</h2>

      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() =>
            dispatch({
              type: "SET_GUESTS",
              payload: Math.max(1, state.guests - 1),
            })
          }
          className="w-10 h-10 rounded-full border border-neutral-700 text-primary hover:bg-neutral-800 transition"
        >
          −
        </button>

        <span className="text-lg font-medium text-primary">{state.guests}</span>

        <button
          onClick={() =>
            dispatch({
              type: "SET_GUESTS",
              payload: Math.min(hotel.maxGuests, state.guests + 1),
            })
          }
          disabled={state.guests >= hotel.maxGuests}
          className="w-10 h-10 rounded-full border border-neutral-700 text-primary hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

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
          Continue
        </button>
      </div>
    </div>
  );
}
