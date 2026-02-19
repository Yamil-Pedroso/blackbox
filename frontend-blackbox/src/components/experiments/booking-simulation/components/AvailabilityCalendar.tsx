import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AvailabilityCalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (range: { checkIn: Date | null; checkOut: Date | null }) => void;
}

export default function AvailabilityCalendar({
  checkIn,
  checkOut,
  onChange,
}: AvailabilityCalendarProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Airbnb-like selection logic
  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!checkIn && !checkOut) {
      onChange({ checkIn: date, checkOut: null });
      return;
    }

    if (checkIn && !checkOut) {
      if (date > checkIn) {
        onChange({ checkIn, checkOut: date });
      } else {
        onChange({ checkIn: date, checkOut: null });
      }
      return;
    }

    onChange({ checkIn: date, checkOut: null });
  };

  return (
    <div className="flex justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="
              w-full sm:w-[340px]
              justify-start
              text-left
              font-normal
              rounded-xl
              border-neutral-700
              bg-main-bg
              hover:bg-neutral-800
              transition
              text-secondary
            "
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />

            {checkIn ? (
              checkOut ? (
                <>
                  {format(checkIn, "LLL dd, y")} –{" "}
                  {format(checkOut, "LLL dd, y")}
                </>
              ) : (
                format(checkIn, "LLL dd, y")
              )
            ) : (
              <span className="text-muted-foreground">
                Select your stay dates
              </span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="center"
          className="
            w-[95vw] sm:w-auto
            max-w-md sm:max-w-none
            p-4
            bg-main-bg
            border border-neutral-700
            rounded-xl sm:rounded-2xl
            shadow-2xl
            text-primary
          "
        >
          <Calendar
            mode="single"
            selected={checkOut ?? checkIn ?? undefined}
            onSelect={handleSelect}
            numberOfMonths={isMobile ? 1 : 2}
            initialFocus
            modifiers={{
              checkIn: checkIn ?? undefined,
              checkOut: checkOut ?? undefined,
              inRange:
                checkIn && checkOut
                  ? { from: checkIn, to: checkOut }
                  : undefined,
            }}
            modifiersClassNames={{
              checkIn: "bg-white text-black font-semibold rounded-full",
              checkOut: "bg-white text-black font-semibold rounded-full",
              inRange: "bg-neutral-800 text-white",
            }}
            classNames={{
              months: "flex flex-col sm:flex-row gap-6",
              month: "space-y-4",
              caption:
                "relative flex items-center justify-center pt-2 text-white",
              caption_label: "text-sm font-semibold text-white",
              nav: "absolute inset-x-0 top-2 flex justify-between px-2",
              nav_button:
                "h-8 w-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition flex items-center justify-center",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell:
                "text-neutral-400 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative",
              day: "h-9 w-9 p-0 font-normal text-white hover:bg-neutral-800 rounded-md transition aria-selected:text-black aria-selected:bg-white aria-selected:font-semibold",
              day_today: "border border-primary text-white rounded-md",
              day_disabled: "text-neutral-600 opacity-50",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

//http://localhost:5173/experiments/booking-simulation/app?location=&guests=1&minPrice=0&maxPrice=500&sort=price_asc&page=1&limit=6&checkInDate=2026-02-03&checkOutDate=2026-03-09
