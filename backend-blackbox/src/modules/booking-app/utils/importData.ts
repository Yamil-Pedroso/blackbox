import mongoose from "mongoose";
import { Hotel } from "../hotels/hotel.model";
import path from "path";
import { hotels } from "../data/hotel";
import { env } from "../../../core/config/env";

const seed = async () => {
  await mongoose.connect(env.database.mongoUri);

  await Hotel.deleteMany();

  await Hotel.insertMany(hotels);

  console.log("Hotels seeded successfully");

  process.exit();
};

seed();
