import { useSearch } from "@tanstack/react-router";
import { Route } from "@/routes/experiments/booking-platform/success";
import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "../services/booking.service";

export default function BookingSuccessPage() {
  const search = useSearch({
    from: Route.fullPath,
  });

  const bookingId = search.bookingId;

  const { data, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId),
    enabled: !!bookingId,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <h1>Booking Confirmed 🎉</h1>
      <p>Status: {data?.status}</p>
      <p>Total: CHF {data?.total}</p>
    </div>
  );
}
