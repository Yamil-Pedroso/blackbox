import type { PlatformHotelQuery } from "../types/platform.types";

interface Props {
  filters: PlatformHotelQuery;
  onChange: (updates: Partial<PlatformHotelQuery>) => void;
}

export default function PlatformFilters({ filters, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-main-bg p-6 rounded-xl border border-neutral-800">
      <input
        type="text"
        placeholder="Location"
        value={filters.location}
        onChange={(e) =>
          onChange({
            location: e.target.value,
            page: 1,
          })
        }
        className="bg-secondary-bg border border-neutral-700 px-4 py-2"
      />

      <input
        type="number"
        value={filters.guests}
        onChange={(e) =>
          onChange({
            guests: Number(e.target.value),
            page: 1,
          })
        }
        className="bg-secondary-bg border border-neutral-700 px-4 py-2"
      />

      <select
        value={filters.sort}
        onChange={(e) =>
          onChange({
            sort: e.target.value as PlatformHotelQuery["sort"],
            page: 1,
          })
        }
        className="bg-secondary-bg border border-neutral-700 px-4 py-2"
      >
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>

      <button
        onClick={() => onChange({ page: 1 })}
        className="bg-primary text-black px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
