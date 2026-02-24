import { useState } from "react";
import type { PlatformHotel } from "../types/platform.types";
import { calculateNights } from "../utils/calculateNights";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard } from "lucide-react";

interface Props {
  hotel: PlatformHotel;
  checkIn: Date | null;
  checkOut: Date | null;
  onBook: (hotel: PlatformHotel) => void;
}

export default function PlatformHotelCard({
  hotel,
  checkIn,
  checkOut,
  onBook,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [bookHover, setBookHover] = useState(false);

  const nights =
    checkIn && checkOut
      ? calculateNights(
          checkIn.toISOString().slice(0, 10),
          checkOut.toISOString().slice(0, 10),
        )
      : 0;

  const total = nights * hotel.pricePerNight;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setBookHover(false);
      }}
      className="relative border border-neutral-800 bg-main-bg rounded-xl overflow-hidden hover:border-primary transition"
    >
      {/* IMAGE */}
      <div className="h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CARD HOVER OVERLAY */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 flex items-start justify-end p-4 pointer-events-none"
          >
            <div className="w-full bg-neutral-900/80 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-300 backdrop-blur-sm">
              <p className="text-emerald-400 font-medium mb-1 text-2xl">
                Interactive Booking Node
              </p>
              <p className="text-neutral-300 text-[1rem]">
                Select → Trigger Transaction Flow
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-3 relative z-10">
        <h2 className="text-primary font-semibold text-lg">{hotel.name}</h2>

        <p className="text-secondary text-sm">📍 {hotel.location}</p>

        <p className="text-secondary text-sm">
          👥 Max Guests: {hotel.maxGuests}
        </p>

        <p className="text-secondary">CHF {hotel.pricePerNight} / night</p>

        {nights > 0 && (
          <div className="bg-neutral-800 p-3 rounded-md">
            <p className="text-sm text-secondary">{nights} nights</p>
            <p className="text-primary font-semibold">CHF {total} total</p>
          </div>
        )}

        {/* BOOK BUTTON */}
        <div className="relative">
          <button
            onMouseEnter={() => setBookHover(true)}
            onMouseLeave={() => setBookHover(false)}
            onClick={() => onBook(hotel)}
            className="mt-3 w-full bg-primary text-black px-4 py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <CreditCard size={16} />
            Book Now
          </button>

          {/* BOOK TOOLTIP */}
          <AnimatePresence>
            {bookHover && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="w-full absolute left-1/2 -translate-x-1/2 bottom-full mb-3 bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs shadow-xl z-50"
              >
                <p className="text-emerald-400 font-medium mb-2 text-2xl">
                  Booking Transaction Flow
                </p>

                <ul className="space-y-1 text-neutral-400 text-[0.9rem]">
                  <li>• Validate selected dates</li>
                  <li>• Calculate total nights</li>
                  <li>• Compute final price</li>
                  <li>• Create pending booking</li>
                  <li>• Initialize Stripe session</li>
                  <li>• Redirect to payment</li>
                  <li>• Mark booking confirmed</li>
                  <li>• Redirect to success page</li>
                  <li>• Send confirmation email</li>
                </ul>

                {/* Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-3 h-3 bg-neutral-950 border-l border-b border-neutral-800 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
