import mongoose, { Connection } from "mongoose";
import colors from "colors";
import { env } from "../config/env";

colors.enable();

let llmConnection: Connection | null = null;

export const connectDB = async () => {
  try {
    const mongoURI = env.database.mongoUri;
    const mongoURILLM = env.database_llm.mongoUri;

    const mainConn = await mongoose.connect(mongoURI);

    llmConnection = await mongoose.createConnection(mongoURILLM).asPromise();

    console.log(
      `Main MongoDB Connected: ${mainConn.connection.host}`.green.bold,
    );

    console.log(`LLM MongoDB Connected: ${llmConnection.host}`.cyan.bold);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`.red.bold);
    } else {
      console.error("Unknown MongoDB connection error".red.bold);
    }

    throw error;
  }
};

export const getLLMConnection = (): Connection => {
  if (!llmConnection) {
    throw new Error("LLM database connection has not been initialized");
  }

  return llmConnection;
};
