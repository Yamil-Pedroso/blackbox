import { useState } from "react";
import type { PlatformHotelQuery } from "../types/platform.types";
import InsightTooltip from "./common/InsightTooltip";
import { Search, Users, ArrowUpDown } from "lucide-react";

interface Props {
  filters: PlatformHotelQuery;
  onChange: (updates: Partial<PlatformHotelQuery>) => void;
}

export default function PlatformFilters({ filters, onChange }: Props) {
  const [activeField, setActiveField] = useState<
    "location" | "guests" | "sort" | null
  >(null);

  // 🔍 Location Query Preview
  const locationQuery = filters.location?.trim()
    ? {
        location: {
          $regex: filters.location,
          $options: "i",
        },
      }
    : {};

  // 👥 Guests Query Preview
  const guestsQuery =
    filters.guests && filters.guests > 0
      ? {
          maxGuests: { $gte: filters.guests },
        }
      : {};

  // 💰 Sort Query Preview
  const sortQuery =
    filters.sort === "price_asc"
      ? { pricePerNight: 1 }
      : filters.sort === "price_desc"
        ? { pricePerNight: -1 }
        : filters.sort === "rating"
          ? { rating: -1 }
          : {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-main-bg p-6 rounded-xl border border-neutral-800">
      {/* 🔍 LOCATION */}
      <div className="relative flex items-center gap-3">
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onFocus={() => setActiveField("location")}
          onBlur={() => setActiveField(null)}
          onChange={(e) =>
            onChange({
              location: e.target.value,
              page: 1,
            })
          }
          className="flex-1 bg-secondary-bg border border-neutral-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-0"
        />

        <InsightTooltip
          title="Location Filter"
          description="Case-insensitive MongoDB regex filtering synced with URL."
          icon={<Search size={16} />}
          liveValue={filters.location}
          queryPreview={locationQuery}
          isOpen={activeField === "location" && !!filters.location}
        />
      </div>

      {/* 👥 GUESTS */}
      <div className="relative flex items-center gap-3">
        <input
          type="number"
          value={filters.guests}
          onFocus={() => setActiveField("guests")}
          onBlur={() => setActiveField(null)}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (value < 1) {
              onChange({
                guests: 1,
                page: 1,
              });
            } else {
              onChange({
                guests: value,
                page: 1,
              });
            }
          }}
          className="flex-1 bg-secondary-bg border border-neutral-700 px-4 py-2 rounded-lg focus-within:outline-none focus-within:ring-0"
        />

        <InsightTooltip
          title="Guests Capacity Filter"
          description="Matches hotels where maxGuests >= input."
          icon={<Users size={16} />}
          liveValue={filters.guests}
          queryPreview={guestsQuery}
          isOpen={
            activeField === "guests" && !!filters.guests && filters.guests > 0
          }
        />
      </div>

      {/* 💰 SORT */}
      <div className="relative flex items-center gap-3">
        <select
          value={filters.sort}
          onFocus={() => setActiveField("sort")}
          onBlur={() => setActiveField(null)}
          onChange={(e) =>
            onChange({
              sort: e.target.value as PlatformHotelQuery["sort"],
              page: 1,
            })
          }
          className="flex-1 bg-secondary-bg border border-neutral-700 px-4 py-2 rounded-lg focus-within:outline-none focus-within:ring-0"
        >
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>

        <InsightTooltip
          title="Sorting Layer"
          description="Server-side MongoDB sorting using numeric direction."
          icon={<ArrowUpDown size={16} />}
          liveValue={filters.sort}
          queryPreview={sortQuery}
          isOpen={activeField === "sort"}
        />
      </div>

      {/* 🔎 SEARCH BUTTON */}
      <button
        onClick={() => onChange({ page: 1 })}
        className="bg-primary text-black px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
