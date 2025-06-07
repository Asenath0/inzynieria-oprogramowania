import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2/promise";
dotenv.config();
const router = express.Router();

// https://sidorares.github.io/node-mysql2/docs

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const routerConfig = (app) => {
  router.get("/api/rooms", async (req, res) => {
    try {
      const { standard, capacity, priceMin, priceMax } = req.query;
      let whereClauses = [];
      let params = [];

      if (standard) {
        whereClauses.push("s.name = ?");
        params.push(standard);
      }
      if (capacity) {
        whereClauses.push("r.capacity = ?");
        params.push(Number(capacity));
      }
      if (priceMin) {
        whereClauses.push("r.pricePerNight >= ?");
        params.push(Number(priceMin));
      }
      if (priceMax) {
        whereClauses.push("r.pricePerNight <= ?");
        params.push(Number(priceMax));
      }

      const whereSQL = whereClauses.length
        ? "WHERE " + whereClauses.join(" AND ")
        : "";

      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute(
        `
        SELECT 
          r.id,
          r.number,
          (SELECT path FROM roomimage WHERE roomId = r.id ORDER BY id ASC LIMIT 1) as image,
          r.pricePerNight,
          s.name as standard,
          r.capacity,
          r.description
        FROM room r
        JOIN standard s ON r.standardId = s.id
        ${whereSQL}
        `,
        params
      );
      await connection.end();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  });

  router.get("/api/room/images", async (req, res) => {
    const { roomId } = req.query;
    if (!roomId) {
      return res.status(400).json({ error: "Missing roomId parameter" });
    }
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute(
        `
        SELECT path, description
        FROM roomimage
        WHERE roomId = ?
        ORDER BY id ASC
        `,
        [roomId]
      );
      await connection.end();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  });

  app.use(router);

  app.all("", (request, response) => {
    response.status(404).json({
      result: "Nie znaleziono",
      error: 1,
      statusCode: 404,
    });
  });
};
