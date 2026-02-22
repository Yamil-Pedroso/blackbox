import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "config", "config.env"),
});

import { app } from "./app";
import { connectDB } from "./config/db";

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3010;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
