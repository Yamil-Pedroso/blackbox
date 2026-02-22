import { useSearchParams, useNavigate } from "react-router-dom";
import { useBooking } from "../../../../lib/hooks/useBooking";

export default function BookingSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bookingId = searchParams.get("bookingId");
  const { data: booking, isLoading, isError } = useBooking(bookingId);

  if (!bookingId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Invalid booking reference.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
        <p className="text-secondary">Processing your payment...</p>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Booking not found.
      </div>
    );
  }

  const isPaid = booking.status === "paid";

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-bg p-8">
      <div className="max-w-xl w-full bg-secondary-bg rounded-2xl border border-neutral-800 p-8 space-y-6 text-center">
        <h2 className="text-3xl font-semibold text-primary">
          {isPaid ? "🎉 Booking Confirmed!" : "⏳ Payment Processing"}
        </h2>

        <div className="space-y-3 text-secondary">
          <p>
            📅 {new Date(booking.checkIn).toDateString()} →{" "}
            {new Date(booking.checkOut).toDateString()}
          </p>

          <p>👥 Guests: {booking.guests}</p>

          <p>
            💰 Total Paid:{" "}
            <span className="text-primary font-semibold">
              CHF {booking.total.toFixed(2)}
            </span>
          </p>

          <p className="text-green font-mono text-sm mt-4">
            Booking ID: {booking._id}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-primary text-black px-6 py-2 rounded-lg hover:opacity-90 transition"
        >
          Book Another Stay
        </button>
      </div>
    </div>
  );
}
