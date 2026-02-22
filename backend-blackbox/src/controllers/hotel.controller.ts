import { Request, Response } from "express";
import { Hotel } from "../models/Hotel";

// GET /api/hotels
export const getAllHotels = async (_req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error("Get hotels error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/hotels/:id (usando tu id custom tipo "h1")
export const getHotelByCustomId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findOne({ id });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    console.error("Get hotel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
