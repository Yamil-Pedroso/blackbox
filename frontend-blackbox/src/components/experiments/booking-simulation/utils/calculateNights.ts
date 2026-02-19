export function calculateNights(checkIn: string, checkOut: string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();

  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
