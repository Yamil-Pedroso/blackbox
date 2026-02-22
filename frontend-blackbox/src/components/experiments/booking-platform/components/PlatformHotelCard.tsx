import type { PlatformHotel } from "../types/platform.types";
import { calculateNights } from "../utils/calculateNights";

interface Props {
  hotel: PlatformHotel;
  checkIn: Date | null;
  checkOut: Date | null;
  onBook: (hotel: PlatformHotel) => void;
}

export default function PlatformHotelCard({
  hotel,
  checkIn,
  checkOut,
  onBook,
}: Props) {
  const nights =
    checkIn && checkOut
      ? calculateNights(
          checkIn.toISOString().slice(0, 10),
          checkOut.toISOString().slice(0, 10),
        )
      : 0;

  const total = nights * hotel.pricePerNight;

  return (
    <div className="border border-neutral-800 bg-main-bg rounded-xl overflow-hidden hover:border-primary transition">
      {/* IMAGE */}
      <div className="h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-primary font-semibold text-lg">{hotel.name}</h2>

        <p className="text-secondary text-sm">📍 {hotel.location}</p>

        <p className="text-secondary text-sm">
          👥 Max Guests: {hotel.maxGuests}
        </p>

        <p className="text-secondary">CHF {hotel.pricePerNight} / night</p>

        {/* Dynamic total */}
        {nights > 0 && (
          <div className="bg-neutral-800 p-3 rounded-md">
            <p className="text-sm text-secondary">{nights} nights</p>
            <p className="text-primary font-semibold">CHF {total} total</p>
          </div>
        )}

        <button
          onClick={() => onBook(hotel)}
          className="mt-3 bg-primary text-black px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
