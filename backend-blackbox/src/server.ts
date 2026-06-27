import { app } from "./app";
import { connectDB } from "./core/databases/mongo";
import { env } from "./core/config/env";

const startServer = async () => {
  const PORT = env.app.port;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  try {
    await connectDB();
  } catch (error) {
    console.error(
      "⚠️ Server is running, but database connections are unavailable:",
      error,
    );
  }
};

startServer();
