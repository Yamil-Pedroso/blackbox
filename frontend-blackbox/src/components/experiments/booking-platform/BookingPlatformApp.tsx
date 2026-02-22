import { useState } from "react";
import type { PlatformHotelQuery, PlatformHotel } from "./types/platform.types";
import PlatformFilters from "./components/PlatformFilters";
import PlatformHotelCard from "./components/PlatformHotelCard";
import PlatformBookingFlow from "./booking-flow/PlatformBookingFlow";
import { useHotel } from "./hooks/useHotels";
import { Link } from "@tanstack/react-router";
import PlatformCalendar from "./components/PlatformCalendar";

export default function BookingPlatformApp() {
  const [filters, setFilters] = useState<PlatformHotelQuery>({
    location: "",
    guests: 1,
    sort: "price_asc",
    page: 1,
    limit: 6,
  });

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const [selectedHotel, setSelectedHotel] = useState<PlatformHotel | null>(
    null,
  );

  const { data, isLoading, isError } = useHotel(filters);

  const hotels = data?.data ?? [];
  const hasMore = data?.hasMore ?? false;

  return (
    <div className="h-full bg-secondary-bg overflow-scroll">
      <header className="border-b border-neutral-800 px-6 py-4 flex justify-between items-center bg-main-bg">
        <div className="flex items-center gap-6">
          <Link
            to="/experiments/booking-platform"
            className="font-ibm-plex-mono text-xs text-secondary hover:text-primary transition-colors"
          >
            ← Exit Box
          </Link>

          <h1 className="font-geist text-lg text-primary">Booking Platform</h1>
        </div>
      </header>

      <div className="p-8">
        <PlatformFilters filters={filters} setFilters={setFilters} />

        <div className="mt-6">
          <PlatformCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            onChange={(range) => {
              setCheckIn(range.checkIn);
              setCheckOut(range.checkOut);

              setFilters((prev) => ({
                ...prev,
                checkInDate: range.checkIn
                  ? range.checkIn.toISOString().slice(0, 10)
                  : undefined,
                checkOutDate: range.checkOut
                  ? range.checkOut.toISOString().slice(0, 10)
                  : undefined,
                page: 1,
              }));
            }}
          />
        </div>

        {isLoading && (
          <div className="text-center text-secondary mt-10">
            Loading hotels...
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 mt-10">
            Failed to load hotels.
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
              {hotels.map((hotel) => (
                <PlatformHotelCard
                  key={hotel._id}
                  hotel={hotel}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onBook={setSelectedHotel}
                />
              ))}
            </div>

            {hotels.length === 0 && (
              <div className="text-center text-secondary mt-12">
                No hotels match your filters.
              </div>
            )}

            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: (prev.page ?? 1) + 1,
                    }))
                  }
                  className="border border-neutral-700 px-6 py-2 text-sm text-secondary hover:text-primary"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedHotel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-main-bg w-full max-w-3xl rounded-2xl p-8 relative">
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-4 right-4 text-secondary hover:text-primary"
            >
              ✕
            </button>

            <PlatformBookingFlow hotel={selectedHotel} />
          </div>
        </div>
      )}
    </div>
  );
}
