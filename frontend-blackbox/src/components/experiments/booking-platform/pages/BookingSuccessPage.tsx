import { useSearch, Link } from "@tanstack/react-router";
import { Route } from "@/routes/experiments/booking-platform/success";
import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "../services/booking.service";
import { CheckCircle } from "lucide-react";

export default function BookingSuccessPage() {
  const { bookingId } = useSearch({
    from: Route.fullPath,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId),
    enabled: !!bookingId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-bg flex items-center justify-center text-secondary">
        Loading your booking...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-secondary-bg flex items-center justify-center text-red-500">
        Something went wrong loading your booking.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-bg flex items-center justify-center px-6">
      <div className="bg-main-bg border border-neutral-800 rounded-3xl shadow-2xl p-10 w-full max-w-xl text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-400" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-primary">
          Booking Confirmed
        </h1>

        <p className="text-secondary text-sm">
          Your reservation has been successfully processed.
        </p>

        {/* Info Card */}
        <div className="bg-secondary-bg border border-neutral-800 rounded-xl p-6 text-left space-y-3">
          <p className="text-sm text-secondary">
            <span className="text-primary font-medium">Booking ID:</span>{" "}
            {data._id}
          </p>

          <p className="text-sm text-secondary">
            <span className="text-primary font-medium">Status:</span>{" "}
            <span className="text-green-400 capitalize">{data.status}</span>
          </p>

          <p className="text-sm text-secondary">
            <span className="text-primary font-medium">Guests:</span>{" "}
            {data.guests}
          </p>

          <p className="text-sm text-secondary">
            <span className="text-primary font-medium">Stay:</span>{" "}
            {new Date(data.checkIn).toDateString()} →{" "}
            {new Date(data.checkOut).toDateString()}
          </p>

          <div className="pt-4 border-t border-neutral-800">
            <p className="text-lg font-semibold text-primary">
              Total Paid: CHF {data.total}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <Link
          to="/experiments/booking-platform"
          className="inline-block mt-4 bg-primary text-black px-6 py-3 rounded-xl hover:opacity-90 transition font-medium"
        >
          Back to Booking Platform
        </Link>
      </div>
    </div>
  );
}
