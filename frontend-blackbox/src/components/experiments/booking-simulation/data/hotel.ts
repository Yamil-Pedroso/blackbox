export interface Hotel {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  rating: number;
  amenities: string[];
  availableDates: string[];
  image: string;
}

export const hotels: Hotel[] = [
  {
    id: "h1",
    name: "Lake View Retreat",
    location: "Zurich",
    pricePerNight: 180,
    maxGuests: 2,
    rating: 4.7,
    amenities: ["wifi", "spa"],
    availableDates: ["2025-02-20", "2025-02-21", "2025-02-22"],
    image:
      "https://images.unsplash.com/photo-1635503540730-dde3f051c36f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fExha2UlMjBadXJpY2h8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "h2",
    name: "Alpine Escape",
    location: "Bern",
    pricePerNight: 220,
    maxGuests: 4,
    rating: 4.9,
    amenities: ["wifi", "parking", "breakfast"],
    availableDates: ["2025-02-20", "2025-02-23"],
    image:
      "https://plus.unsplash.com/premium_photo-1673735052822-5ad5966cfc2f?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "h3",
    name: "Urban Studio",
    location: "Zurich",
    pricePerNight: 120,
    maxGuests: 2,
    rating: 4.3,
    amenities: ["wifi"],
    availableDates: ["2025-02-21", "2025-02-22"],
    image:
      "https://images.unsplash.com/photo-1612949411928-c5ff3809dcb9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
