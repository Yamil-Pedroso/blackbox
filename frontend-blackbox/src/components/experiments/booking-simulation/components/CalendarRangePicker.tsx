import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

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

  const selected: DateRange | undefined = checkIn
    ? { from: checkIn, to: checkOut ?? undefined }
    : undefined;

  return (
    <div className="flex justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[340px] justify-start text-left font-normal rounded-xl border-neutral-700 bg-main-bg hover:bg-neutral-800 transition"
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
          className="w-auto p-4 bg-main-bg border border-neutral-700 rounded-2xl shadow-2xl"
        >
          <Calendar
            mode="range"
            selected={selected}
            onSelect={(range) => {
              onChange({
                checkIn: range?.from ?? null,
                checkOut: range?.to ?? null,
              });

              // 🔥 Cierra automáticamente cuando el rango está completo
              if (range?.from && range?.to) {
                setOpen(false);
              }
            }}
            numberOfMonths={2}
            initialFocus
            classNames={{
              months:
                "flex flex-col sm:flex-row space-y-4 sm:space-x-6 sm:space-y-0",
              month: "space-y-4",
              caption:
                "flex justify-center pt-2 relative items-center text-primary",
              caption_label: "text-sm font-semibold",
              nav: "space-x-2 flex items-center",
              nav_button:
                "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 transition",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell:
                "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative",
              day: "h-9 w-9 p-0 font-normal hover:bg-neutral-800 rounded-md transition",
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary rounded-md",
              day_range_middle: "bg-neutral-800 text-primary rounded-none",
              day_today: "border border-primary rounded-md",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
