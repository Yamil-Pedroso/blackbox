import { useState, useMemo } from "react";
import type { PlatformHotel } from "../types/platform.types";
import { useCheckout } from "../hooks/useCheckout";
import { calculateNights } from "../utils/calculateNights";
import PlatformCalendar from "../components/PlatformCalendar";

interface Props {
  hotel: PlatformHotel;
}

type Step = "dates" | "guests" | "review";

export default function PlatformBookingFlow({ hotel }: Props) {
  const [step, setStep] = useState<Step>("dates");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(1);

  const { mutate, isPending } = useCheckout();

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return calculateNights(
      checkIn.toISOString().slice(0, 10),
      checkOut.toISOString().slice(0, 10),
    );
  }, [checkIn, checkOut]);

  const total = nights * hotel.pricePerNight;

  const datesInvalid =
    !checkIn ||
    !checkOut ||
    nights <= 0 ||
    new Date(checkOut) <= new Date(checkIn);

  const guestsInvalid = guests < 1 || guests > hotel.maxGuests;

  const handleConfirmAndPay = () => {
    if (datesInvalid || guestsInvalid) return;

    mutate({
      hotelId: hotel._id,
      checkIn: checkIn!.toISOString(),
      checkOut: checkOut!.toISOString(),
      guests,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-semibold text-primary">
        Booking — {hotel.name}
      </h2>

      {/* STEP 1: DATES */}
      {step === "dates" && (
        <>
          <PlatformCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            onChange={(range) => {
              setCheckIn(range.checkIn);
              setCheckOut(range.checkOut);
            }}
          />

          {datesInvalid && checkIn && checkOut && (
            <p className="text-red-500 text-sm text-center">
              Check-out must be after check-in.
            </p>
          )}

          <div className="flex justify-end">
            <button
              disabled={datesInvalid}
              onClick={() => setStep("guests")}
              className="bg-primary text-black px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* STEP 2: GUESTS */}
      {step === "guests" && (
        <>
          <div className="flex flex-col gap-4">
            <label className="text-secondary">
              Guests (max {hotel.maxGuests})
            </label>

            <input
              type="number"
              min={1}
              max={hotel.maxGuests}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="bg-secondary-bg border border-neutral-700 px-4 py-2 rounded"
            />

            {guestsInvalid && (
              <p className="text-red-500 text-sm">
                Guests must be between 1 and {hotel.maxGuests}.
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep("dates")} className="text-secondary">
              Back
            </button>

            <button
              disabled={guestsInvalid}
              onClick={() => setStep("review")}
              className="bg-primary text-black px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* STEP 3: REVIEW */}
      {step === "review" && (
        <>
          <div className="bg-secondary-bg p-6 border border-neutral-700 rounded-lg space-y-2">
            <p>
              📅 {checkIn?.toDateString()} → {checkOut?.toDateString()}
            </p>

            <p>🌙 Nights: {nights}</p>

            <p>👥 Guests: {guests}</p>

            <div className="border-t border-neutral-700 pt-4 mt-4">
              <p>
                CHF {hotel.pricePerNight} × {nights} nights
              </p>

              <p className="text-lg font-semibold text-primary">
                Total: CHF {total}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep("guests")}
              className="text-secondary"
            >
              Back
            </button>

            <button
              onClick={handleConfirmAndPay}
              disabled={isPending || datesInvalid || guestsInvalid}
              className="bg-primary text-black px-4 py-2 rounded disabled:opacity-50"
            >
              {isPending ? "Redirecting..." : "Confirm & Pay"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
