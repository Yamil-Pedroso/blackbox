import { useMemo, useState } from "react";
import { hotels } from "./data/hotel";
import { Link } from "@tanstack/react-router";
import { FaStar } from "react-icons/fa";

interface SearchState {
  location: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
}

const BookingSimulatorApp = () => {
  const [search, setSearch] = useState<SearchState>({
    location: "",
    guests: 1,
    minPrice: 0,
    maxPrice: 500,
  });

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      if (
        search.location &&
        !hotel.location.toLowerCase().includes(search.location.toLowerCase())
      )
        return false;

      if (hotel.maxGuests < search.guests) return false;

      if (
        hotel.pricePerNight < search.minPrice ||
        hotel.pricePerNight > search.maxPrice
      )
        return false;

      return true;
    });
  }, [search]);

  return (
    <div className="min-h-screen flex flex-col bg-secondary-bg">
      <header className="border-b border-neutral-800 px-6 py-4 flex justify-between items-center bg-main-bg">
        <div className="flex items-center gap-6">
          <Link
            to="/experiments/booking-simulation"
            className="font-ibm-plex-mono text-xs text-secondary hover:text-primary transition-colors"
          >
            ← Exit Box
          </Link>

          <h1 className="font-geist text-lg text-primary">
            Booking Platform Simulation
          </h1>
        </div>
      </header>

      <div className="px-6 py-6 bg-main-bg border-b border-neutral-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-secondary font-ibm-plex-mono uppercase tracking-wide">
              Location
            </label>
            <input
              type="text"
              placeholder="Zurich, Bern..."
              value={search.location}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              className="bg-secondary-bg border border-neutral-700 px-4 py-2 text-sm text-primary focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* GUESTS */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-secondary font-ibm-plex-mono uppercase tracking-wide">
              Guests
            </label>

            <div className="relative w-full">
              <input
                type="text"
                readOnly
                value={search.guests}
                className="w-full bg-secondary-bg border border-neutral-700 px-10 py-2 text-center text-sm text-primary focus:outline-none"
              />

              <button
                onClick={() =>
                  setSearch((prev) => ({
                    ...prev,
                    guests: Math.max(1, prev.guests - 1),
                  }))
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                −
              </button>

              <button
                onClick={() =>
                  setSearch((prev) => ({
                    ...prev,
                    guests: prev.guests + 1,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-secondary font-ibm-plex-mono uppercase tracking-wide">
              Min Price
            </label>

            <div className="relative w-full">
              <input
                type="text"
                readOnly
                value={search.minPrice}
                className="w-full bg-secondary-bg border border-neutral-700 px-10 py-2 text-center text-sm text-primary focus:outline-none"
              />

              <button
                onClick={() =>
                  setSearch((prev) => ({
                    ...prev,
                    minPrice: Math.max(0, prev.minPrice - 10),
                  }))
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                −
              </button>

              <button
                onClick={() =>
                  setSearch((prev) => ({
                    ...prev,
                    minPrice: Math.min(prev.maxPrice, prev.minPrice + 10),
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-secondary font-ibm-plex-mono uppercase tracking-wide">
              Max Price
            </label>

            <div className="relative w-full">
              <input
                type="text"
                readOnly
                value={search.maxPrice}
                className="w-full bg-secondary-bg border border-neutral-700 px-10 py-2 text-center text-sm text-primary focus:outline-none"
              />

              <button
                onClick={() =>
                  setSearch((prev) => ({
                    ...prev,
                    maxPrice: Math.max(prev.minPrice, prev.maxPrice - 10),
                  }))
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                −
              </button>

              <button
                onClick={() =>
                  setSearch((prev) => ({
                    ...prev,
                    maxPrice: prev.maxPrice + 10,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="border border-neutral-800 bg-main-bg overflow-hidden group hover:border-primary transition-colors duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h2 className="font-geist text-lg text-primary">
                  {hotel.name}
                </h2>

                <p className="text-secondary text-sm">{hotel.location}</p>

                <div className="flex justify-between text-sm text-secondary">
                  <span>CHF {hotel.pricePerNight} / night</span>
                  <span className="flex justify-center items-center">
                    <FaStar className="text-amber-400" />{" "}
                    <span className="mx-1.5">{hotel.rating}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {hotel.amenities.map((a) => (
                    <span
                      key={a}
                      className="px-2 py-1 text-xs border border-neutral-700 bg-secondary-bg text-secondary"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center text-secondary mt-12 font-ibm-plex-mono text-sm">
            No hotels match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSimulatorApp;
