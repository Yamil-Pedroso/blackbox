import express from "express";
import {
  getAllHotels,
  getHotelByCustomId,
} from "../controllers/hotel.controller";

const router = express.Router();

router.get("/hotels", getAllHotels);
router.get("/hotels/:id", getHotelByCustomId);

export default router;
