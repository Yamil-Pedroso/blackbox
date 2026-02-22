import { Request, Response } from "express";
import { Hotel } from "../models/Hotel";

// GET /api/hotels
export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const {
      location,
      guests,
      minPrice,
      maxPrice,
      sort,
      page = "1",
      limit = "6",
    } = req.query;

    const query: any = {};

    // 🔍 Location filter (case insensitive)
    if (location && typeof location === "string" && location.trim() !== "") {
      query.location = { $regex: location, $options: "i" };
    }

    // 👥 Guests filter
    if (guests) {
      query.maxGuests = { $gte: Number(guests) };
    }

    // 💰 Price range filter
    if (minPrice || maxPrice) {
      query.pricePerNight = {};

      if (minPrice) {
        query.pricePerNight.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.pricePerNight.$lte = Number(maxPrice);
      }
    }

    // 📊 Sorting
    let sortOption: any = {};

    if (sort === "price_asc") sortOption.pricePerNight = 1;
    if (sort === "price_desc") sortOption.pricePerNight = -1;
    if (sort === "rating") sortOption.rating = -1;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const hotels = await Hotel.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const total = await Hotel.countDocuments(query);

    res.json({
      data: hotels,
      total,
      hasMore: skip + hotels.length < total,
    });
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
