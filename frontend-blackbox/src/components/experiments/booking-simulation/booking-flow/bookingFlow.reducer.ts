import type {
  BookingFlowState,
  BookingFlowAction,
} from "../types/booking.types";

export const initialBookingFlowState: BookingFlowState = {
  step: "dates",
  checkIn: null,
  checkOut: null,
  guests: 1,
};

export function bookingFlowReducer(
  state: BookingFlowState,
  action: BookingFlowAction,
): BookingFlowState {
  switch (action.type) {
    case "SET_DATES":
      return {
        ...state,
        checkIn: action.payload.checkIn,
        checkOut: action.payload.checkOut,
      };

    case "SET_GUESTS":
      return {
        ...state,
        guests: action.payload,
      };

    case "NEXT_STEP":
      return {
        ...state,
        step: getNextStep(state.step),
      };

    case "PREV_STEP":
      return {
        ...state,
        step: getPrevStep(state.step),
      };

    case "RESET":
      return initialBookingFlowState;

    default:
      return state;
  }
}

function getNextStep(step: BookingFlowState["step"]) {
  const order: BookingFlowState["step"][] = [
    "dates",
    "guests",
    "review",
    "confirm",
  ];

  const index = order.indexOf(step);
  return order[Math.min(index + 1, order.length - 1)];
}

function getPrevStep(step: BookingFlowState["step"]) {
  const order: BookingFlowState["step"][] = [
    "dates",
    "guests",
    "review",
    "confirm",
  ];

  const index = order.indexOf(step);
  return order[Math.max(index - 1, 0)];
}
