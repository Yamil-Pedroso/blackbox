import express from "express";
import { getAllHotels, getHotelByCustomId } from "./hotel.controller";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/:id", getHotelByCustomId);

export default router;
