import { Request, Response } from "express";
import { Hotel } from "./hotel.model";
import { asyncHandler } from "../../../core/middlewares/asyncHandler";

// GET /api/hotels
export const getAllHotels = asyncHandler(
  async (req: Request, res: Response) => {
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
    console.log("Querying hotels with:", {
      pageNumber,
    });
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
  },
);

// GET /api/hotels/:id (usando tu id custom tipo "h1")
export const getHotelByCustomId = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const hotel = await Hotel.findOne({ id });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  },
);
