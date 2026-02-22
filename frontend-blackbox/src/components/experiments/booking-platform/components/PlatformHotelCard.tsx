import type { PlatformHotel } from "../types/platform.types";

interface Props {
  hotel: PlatformHotel;
  onBook: (hotel: PlatformHotel) => void;
}

export default function PlatformHotelCard({ hotel, onBook }: Props) {
  return (
    <div className="border border-neutral-800 bg-main-bg overflow-hidden">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-primary">{hotel.name}</h2>
        <p className="text-secondary">{hotel.location}</p>

        <div className="flex justify-between mt-3">
          <span>CHF {hotel.pricePerNight}</span>
          <span>⭐ {hotel.rating}</span>
        </div>

        <button
          onClick={() => onBook(hotel)}
          className="mt-4 bg-primary text-black px-4 py-2 rounded-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
