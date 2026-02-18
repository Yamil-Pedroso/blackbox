import type { BookingSimulationPhase } from "../types/booking.types";

export const phases: BookingSimulationPhase[] = [
  { id: 1, name: "Search & Filtering", status: "done" },
  { id: 2, name: "Availability Calendar", status: "active" },
  { id: 3, name: "Pricing Engine", status: "pending" },
  { id: 4, name: "Multi-Step Booking Flow", status: "pending" },
  { id: 5, name: "Payment Simulation", status: "pending" },
  { id: 6, name: "Authentication Integration", status: "pending" },
  { id: 7, name: "Performance Optimization", status: "pending" },
  { id: 8, name: "Mobile UX", status: "pending" },
];
