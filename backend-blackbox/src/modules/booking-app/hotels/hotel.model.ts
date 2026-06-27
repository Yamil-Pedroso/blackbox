import mongoose from "mongoose";

interface HotelDocument extends mongoose.Document {
  name: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  rating: number;
  amenities: string[];
  availableFrom: Date;
  availableTo: Date;
  image: string;
}

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  rating: { type: Number, required: true },
  amenities: [{ type: String }],
  availableFrom: { type: Date },
  availableTo: { type: Date },
  image: { type: String },
});

export const Hotel = mongoose.model<HotelDocument>("Hotel", hotelSchema);
