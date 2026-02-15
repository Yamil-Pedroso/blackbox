import { app } from "./app";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "config", "config.env") });

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
