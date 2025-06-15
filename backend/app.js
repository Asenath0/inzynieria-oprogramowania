/**
 * @file Main application file for the backend server.
 * @summary Initializes and configures the Express app, sets up middleware,
 * defines routes, and starts the server.
 */

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const { routerConfig } = require("./routes/index.js");

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
    origin: [
      "http://hotelgo.kpstr.ovh:3000",
      "http://localhost:3000",
      "https://hotelgo-snowy.vercel.app/",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routerConfig(app);

app.listen(PORT, () => {
  console.info(`Server started on port ${PORT}`);
});

module.exports = app;
