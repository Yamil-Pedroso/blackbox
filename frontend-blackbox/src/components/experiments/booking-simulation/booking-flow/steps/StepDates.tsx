
import AvailabilityCalendar from "../../components/AvailabilityCalendar";
import type { BookingFlowAction, BookingFlowState } from "../../types/booking.types";

interface Props {
  state: BookingFlowState;
  dispatch: React.Dispatch<BookingFlowAction>;
}

export default function StepDates({ state, dispatch }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary">Select your dates</h2>

      <AvailabilityCalendar
        checkIn={state.checkIn}
        checkOut={state.checkOut}
        onChange={(range) => dispatch({ type: "SET_DATES", payload: range })}
      />

      <button
        disabled={!state.checkIn || !state.checkOut}
        onClick={() => dispatch({ type: "NEXT_STEP" })}
        className="bg-primary text-black px-6 py-2 rounded-lg disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
