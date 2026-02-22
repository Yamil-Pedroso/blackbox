import mongoose from "mongoose";
import { Hotel } from "../models/Hotel";
import path from "path";
import dotenv from "dotenv";
import { hotels } from "../data/hotel";

dotenv.config({ path: path.resolve(__dirname, "..", "config", "config.env") });

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  await Hotel.deleteMany();

  await Hotel.insertMany(hotels);

  console.log("Hotels seeded successfully");

  process.exit();
};

seed();
