import type { BookingSimulationPhase } from "../types/booking.types";

export const phases: BookingSimulationPhase[] = [
  {
    id: 1,
    name: "Search & Filtering",
    status: "done",
    goal: "Implement URL-driven filtering architecture with controlled inputs and structured state management.",
  },
  {
    id: 2,
    name: "Availability Calendar",
    status: "done",
    goal: "Develop an interactive calendar component for selecting check-in and check-out dates, integrated with URL state management.",
  },
  {
    id: 3,
    name: "Pricing Engine",
    status: "active",
    goal: "Create a dynamic pricing engine that calculates hotel prices based on user-selected criteria and updates the URL accordingly.",
  },
  {
    id: 4,
    name: "Multi-Step Booking Flow",
    status: "pending",
    goal: "Design and implement a multi-step booking process that guides users through hotel selection, date picking, and price confirmation, with state reflected in the URL.",
  },
  {
    id: 5,
    name: "Payment Simulation",
    status: "pending",
    goal: "Simulate payment processing to ensure the booking flow handles transactions correctly.",
  },
  {
    id: 6,
    name: "Authentication Integration",
    status: "pending",
    goal: "Integrate user authentication to secure the booking process and manage user sessions.",
  },
  {
    id: 7,
    name: "Performance Optimization",
    status: "pending",
    goal: "Optimize the application's performance to handle large datasets and high user traffic efficiently.",
  },
  {
    id: 8,
    name: "Mobile UX",
    status: "pending",
    goal: "Enhance the mobile user experience with responsive design and touch-friendly interactions.",
  },
];
