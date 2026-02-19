import { useState, useEffect } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { FaStar } from "react-icons/fa";
import { useBookingSearch } from "./hooks/useBookingSearch";
import { usePricing } from "./hooks/usePricing";
import AvailabilityCalendar from "./components/AvailabilityCalendar";
import { useDebounce } from "./hooks/useDebounce";
import type { BookingQuery, Hotel } from "./types/booking.types";
import { Route } from "../../../routes/experiments/booking-simulation/app";
import PricingBreakdown from "./components/PricingBreakdown";
import { format } from "date-fns";
import BookingFlow from "./booking-flow/BookingFlow";

interface HotelCardProps {
  hotel: Hotel;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  onBook: (hotel: Hotel) => void;
}

const HotelCard = ({
  hotel,
  checkIn,
  checkOut,
  guests,
  onBook,
}: HotelCardProps) => {
  const pricing = usePricing({
    hotel,
    checkIn,
    checkOut,
    guests,
  });

  return (
    <div className="border border-neutral-800 bg-main-bg overflow-hidden group hover:border-primary transition-colors duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h2 className="font-geist text-lg text-primary">{hotel.name}</h2>
        <p className="text-secondary text-sm">📍 {hotel.location}</p>
        <div className="text-secondary">👥 Max Guests: {hotel.maxGuests}</div>

        <div>
          <p className="text-secondary mb-1">Amenities:</p>
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-1 text-xs bg-secondary-bg border border-neutral-700 rounded-md text-secondary"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-secondary mb-1">Availability:</p>
          <div className="text-primary text-sm bg-neutral-800 px-3 py-2 rounded-md inline-block">
            {hotel.availableFrom} → {hotel.availableTo}
          </div>
        </div>

        <div className="flex justify-between text-sm text-secondary">
          <span>CHF {hotel.pricePerNight} / night</span>
          <span className="flex items-center">
            <FaStar className="text-amber-400" />
            <span className="ml-1">{hotel.rating}</span>
          </span>
        </div>

        {pricing && <PricingBreakdown pricing={pricing} />}

        <button
          onClick={() => onBook(hotel)}
          className="mt-4 bg-primary text-black px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

const BookingSimulatorApp = () => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const navigate = useNavigate({ from: Route.fullPath });
  const search = useSearch({ from: Route.fullPath });

  const checkInDate = search.checkInDate ? new Date(search.checkInDate) : null;
  const checkOutDate = search.checkOutDate
    ? new Date(search.checkOutDate)
    : null;

  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const debouncedLocation = useDebounce(search.location ?? "", 400);

  const effectiveQuery: BookingQuery = {
    ...search,
    location: debouncedLocation,
  };

  const { data, isLoading } = useBookingSearch(effectiveQuery);
  const hasMore = data?.hasMore ?? false;

  useEffect(() => {
    if (!data) return;

    setAllHotels((prev) =>
      search.page === 1 ? data.data : [...prev, ...data.data],
    );
  }, [data, search.page]);

  const updateQuery = (updates: Partial<BookingQuery>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...updates,
        page: 1,
      }),
    });
  };

  const loadMore = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: (prev.page ?? 1) + 1,
      }),
    });
  };

  return (
    <div className="h-full flex flex-col bg-secondary-bg overflow-scroll">
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

      {/* ================= FILTER SECTION ================= */}
      <div className="px-6 py-6 bg-main-bg border-b border-neutral-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-secondary font-ibm-plex-mono uppercase tracking-wide">
              Location
            </label>
            <input
              type="text"
              placeholder="Zurich, Bern..."
              value={search.location ?? ""}
              onChange={(e) => updateQuery({ location: e.target.value })}
              className="w-full bg-secondary-bg border border-neutral-700 px-4 py-2 text-sm text-primary"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-secondary font-ibm-plex-mono uppercase tracking-wide">
              Guests
            </label>
            <div className="relative w-full">
              <input
                type="text"
                readOnly
                value={search.guests}
                className="w-full bg-secondary-bg border border-neutral-700 px-10 py-2 text-center text-sm text-primary"
              />
              <button
                onClick={() =>
                  updateQuery({
                    guests: Math.max(1, (search.guests ?? 1) - 1),
                  })
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
              >
                −
              </button>
              <button
                onClick={() =>
                  updateQuery({
                    guests: (search.guests ?? 1) + 1,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
              >
                +
              </button>
            </div>
          </div>

          {/* Min Price */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-secondary font-ibm-plex-mono uppercase tracking-wide">
              Min Price
            </label>
            <input
              type="text"
              readOnly
              value={search.minPrice}
              className="w-full bg-secondary-bg border border-neutral-700 px-4 py-2 text-center text-sm text-primary"
            />
          </div>

          {/* Max Price + Sort */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-secondary font-ibm-plex-mono uppercase tracking-wide">
              Max Price
            </label>
            <input
              type="text"
              readOnly
              value={search.maxPrice}
              className="w-full bg-secondary-bg border border-neutral-700 px-4 py-2 text-center text-sm text-primary"
            />

            <select
              value={search.sort}
              onChange={(e) =>
                updateQuery({ sort: e.target.value as BookingQuery["sort"] })
              }
              className="bg-secondary-bg border border-neutral-700 px-4 py-2 text-sm text-primary"
            >
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Calendar */}
        <div className="flex flex-col justify-center items-center px-6 py-10 bg-main-bg">
          <h2 className="text-primary font-geist text-lg mb-6">Select Dates</h2>

          <AvailabilityCalendar
            checkIn={checkInDate}
            checkOut={checkOutDate}
            onChange={(range) => {
              updateQuery({
                checkInDate: range.checkIn
                  ? format(range.checkIn, "yyyy-MM-dd")
                  : undefined,
                checkOutDate: range.checkOut
                  ? format(range.checkOut, "yyyy-MM-dd")
                  : undefined,
              });
            }}
          />
        </div>
      </div>

      {/* ================= HOTEL GRID ================= */}
      <div className="flex-1 px-6 py-8">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {allHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              checkIn={search.checkInDate}
              checkOut={search.checkOutDate}
              guests={search.guests}
              onBook={setSelectedHotel}
            />
          ))}
        </div>

        {!isLoading && allHotels.length === 0 && (
          <div className="text-center text-secondary mt-12">
            No hotels match your filters.
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMore}
              className="border border-neutral-700 px-6 py-2 text-sm text-secondary hover:text-primary"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* ================= BOOKING FLOW MODAL ================= */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-main-bg w-full max-w-3xl rounded-2xl p-8 relative">
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-4 right-4 text-secondary hover:text-primary"
            >
              ✕
            </button>

            <BookingFlow hotel={selectedHotel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSimulatorApp;
