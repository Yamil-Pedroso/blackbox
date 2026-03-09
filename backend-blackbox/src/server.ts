import { app } from "./app";
import { connectDB } from "./core/database/mongo";
import { env } from "./core/config/env";

const startServer = async () => {
  try {
    await connectDB();

    const PORT = env.app.port;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
