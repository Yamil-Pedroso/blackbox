import type { PlatformHotel } from "../types/platform.types";

interface Props {
  hotel: PlatformHotel;
}

export default function PlatformBookingFlow({ hotel }: Props) {
  return (
    <div className="bg-main-bg p-8 rounded-2xl w-full max-w-2xl">
      <h2 className="text-xl text-primary">Booking: {hotel.name}</h2>

      {/* luego insertamos lógica real */}
    </div>
  );
}
