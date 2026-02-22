import { useState } from "react";
import type { PlatformHotelQuery, PlatformHotel } from "./types/platform.types";
import PlatformFilters from "./components/PlatformFilters";
import PlatformHotelCard from "./components/PlatformHotelCard";
import PlatformBookingFlow from ".//booking-flow/PlatformBookingFlow";
import { Link } from "@tanstack/react-router";

export default function BookingPlatformApp() {
  const [filters, setFilters] = useState<PlatformHotelQuery>({
    location: "",
    guests: 1,
    minPrice: 0,
    maxPrice: 1000,
    sort: "price_asc",
    page: 1,
    limit: 6,
  });

  const [selectedHotel, setSelectedHotel] = useState<PlatformHotel | null>(
    null,
  );

  // 🔥 Por ahora usamos array vacío (luego conectamos backend)
  const hotels: PlatformHotel[] = [];

  return (
    <div className="min-h-screen bg-secondary-bg p-8">
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

      <PlatformFilters filters={filters} setFilters={setFilters} />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
        {hotels.map((hotel) => (
          <PlatformHotelCard
            key={hotel._id}
            hotel={hotel}
            onBook={setSelectedHotel}
          />
        ))}
      </div>

      {selectedHotel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <PlatformBookingFlow hotel={selectedHotel} />
        </div>
      )}
    </div>
  );
}
