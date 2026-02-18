import { useMemo } from "react";

interface Props {
  checkIn: string | null;
  checkOut: string | null;
  onChange: (range: {
    checkIn: string | null;
    checkOut: string | null;
  }) => void;
}

function generateMonthDays(year: number, month: number) {
  const date = new Date(year, month, 1);
  const days: Date[] = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

const CalendarRangePicker = ({ checkIn, checkOut, onChange }: Props) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthOneDays = useMemo(
    () => generateMonthDays(currentYear, currentMonth),
    [currentYear, currentMonth],
  );

  const monthTwoDays = useMemo(
    () => generateMonthDays(currentYear, currentMonth + 1),
    [currentYear, currentMonth],
  );

  const handleSelect = (iso: string) => {
    if (!checkIn) {
      onChange({ checkIn: iso, checkOut: null });
      return;
    }

    if (checkIn && !checkOut) {
      if (iso > checkIn) {
        onChange({ checkIn, checkOut: iso });
      } else {
        onChange({ checkIn: iso, checkOut: null });
      }
      return;
    }

    onChange({ checkIn: iso, checkOut: null });
  };

  const renderMonth = (days: Date[]) => (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const iso = day.toISOString().split("T")[0];

        const isCheckIn = iso === checkIn;
        const isCheckOut = iso === checkOut;
        const isInRange =
          checkIn && checkOut && iso > checkIn && iso < checkOut;

        return (
          <button
            key={iso}
            onClick={() => handleSelect(iso)}
            className={`
              h-10 w-10 text-sm font-ibm-plex-mono
              rounded
              ${
                isCheckIn || isCheckOut
                  ? "bg-primary text-black"
                  : isInRange
                    ? "bg-primary/20"
                    : "hover:bg-neutral-800"
              }
              transition-colors
            `}
          >
            {day.getDate()}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-10 text-primary">
      <div>{renderMonth(monthOneDays)}</div>
      <div>{renderMonth(monthTwoDays)}</div>
    </div>
  );
};

export default CalendarRangePicker;
