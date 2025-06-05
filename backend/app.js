import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { routerConfig } from "./routes/index.js";

dotenv.config();

if (!process.env.PORT) {
  console.error("Error: PORT environment variable is not set.");
  process.exit(1);
}

const PORT = parseInt(process.env.PORT, 10);
const app = express();

app.use(
  cors({
    credentials: true,
    origin: (_, callback) => callback(null, true),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routerConfig(app);

app.listen(PORT, () => {
  console.info(`Server started on port ${PORT}`);
});
