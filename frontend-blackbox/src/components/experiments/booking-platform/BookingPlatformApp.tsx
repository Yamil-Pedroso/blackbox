import { useState } from "react";
import type { PlatformHotelQuery, PlatformHotel } from "./types/platform.types";
import PlatformFilters from "./components/PlatformFilters";
import PlatformHotelCard from "./components/PlatformHotelCard";
import PlatformBookingFlow from "./booking-flow/PlatformBookingFlow";
import { useHotels } from "./hooks/useHotels";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "@/routes/experiments/booking-platform/app";
import PlatformCalendar from "./components/PlatformCalendar";
import { Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingPlatformApp() {
  const search = useSearch({ from: Route.fullPath });
  const [loadHover, setLoadHover] = useState(false);
  const navigate = useNavigate({ from: Route.fullPath });

  const checkIn = search.checkInDate ? new Date(search.checkInDate) : null;

  const checkOut = search.checkOutDate ? new Date(search.checkOutDate) : null;

  const [selectedHotel, setSelectedHotel] = useState<PlatformHotel | null>(
    null,
  );

  {
    /*useEffect(() => {
    navigate({
      search: (prev) => {
        const cleaned = { ...prev } as any;
        delete cleaned.page;
        delete cleaned.limit;
        return cleaned;
      },
      replace: true,
    });
  }, []);*/
  }

  const updateQuery = (updates: Partial<PlatformHotelQuery>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...updates,
        page: 1,
      }),
    });
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useHotels(search);

  const hotels = data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = hasNextPage ?? false;

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
        <PlatformFilters filters={search} onChange={updateQuery} />

        <div className="mt-6">
          <PlatformCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            onChange={(range) => {
              updateQuery({
                checkInDate: range.checkIn
                  ? range.checkIn.toISOString().slice(0, 10)
                  : undefined,
                checkOutDate: range.checkOut
                  ? range.checkOut.toISOString().slice(0, 10)
                  : undefined,
              });
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
              <div className="flex justify-center mt-10 relative">
                <button
                  onMouseEnter={() => setLoadHover(true)}
                  onMouseLeave={() => setLoadHover(false)}
                  onClick={() => fetchNextPage()}
                  className="border border-neutral-700 px-6 py-2 text-sm text-secondary hover:text-primary transition flex items-center gap-2"
                >
                  <Layers size={16} className="text-purple-400" />
                  Load More
                </button>

                <AnimatePresence>
                  {loadHover && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className=" absolute bottom-full mb-4 w-96 bg-secondary-bg border border-neutral-800 rounded-xl p-4 text-xs shadow-xl z-50"
                    >
                      {/* Header with icon */}
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-emerald-400 font-medium text-2xl">
                          Infinite Pagination Trigger
                        </p>
                        <Layers size={24} className="text-purple-400" />
                      </div>

                      <ul className="space-y-1 text-neutral-400 text-[0.9rem]">
                        <li>• Calls fetchNextPage()</li>
                        <li>• Increments page parameter</li>
                        <li>• Recalculates Mongo skip</li>
                        <li>• Executes new GET request</li>
                        <li>• Appends results to state</li>
                      </ul>

                      {/* Arrow */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-neutral-950 border-l border-b border-neutral-800 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
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
