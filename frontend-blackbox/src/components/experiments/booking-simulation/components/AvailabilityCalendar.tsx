import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface AvailabilityCalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (range: { checkIn: Date | null; checkOut: Date | null }) => void;
}

const AvailabilityCalendar = ({
  checkIn,
  checkOut,
  onChange,
}: AvailabilityCalendarProps) => {
  const selectedRange: DateRange | undefined = checkIn
    ? { from: checkIn, to: checkOut ?? undefined }
    : undefined;

  return (
    <div className="p-6 bg-main-bg border border-neutral-800 rounded-xl text-primary">
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={(range) =>
          onChange({
            checkIn: range?.from ?? null,
            checkOut: range?.to ?? null,
          })
        }
        numberOfMonths={2}
        pagedNavigation
        classNames={{
          caption_label: "text-primary font-semibold",
          nav_button: "text-primary hover:text-indigo-400",
          day: "text-primary hover:bg-neutral-700 rounded-md transition",
          day_selected: "bg-indigo-500 text-white",
          day_range_middle: "bg-indigo-900 text-white",
          day_today: "border border-indigo-500",
        }}
      />
    </div>
  );
};

export default AvailabilityCalendar;

//http://localhost:5173/experiments/booking-simulation/app?location=&guests=1&minPrice=0&maxPrice=500&sort=price_asc&page=1&limit=6&checkInDate=2026-02-05&checkOutDate=2026-02-27&checkIn=2026-01-31&checkOut=2026-02-10
