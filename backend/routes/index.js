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

  router.post("api/reservation/no-account", async (req, res) => {
    const { name, surname, email, phone, arrivalDate, departureDate, selectedRoomId } = req.body;
  
    if (!name || !surname || !email || !phone || !arrivalDate || !departureDate || !selectedRoomId) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
  
      // Create a new user with accountTypeId = 1
      const [userResult] = await connection.query(
        "INSERT INTO `user` (accountTypeId, name, lastName, email, phoneNumber) VALUES (?, ?, ?, ?, ?)",
        [1, name, surname, email, phone]
      );
      const userId = userResult.insertId;
  
      // Create a new payment record
      const [paymentResult] = await connection.query(
        "INSERT INTO payment (amountDue, paid) VALUES (?, ?)",
        [0, 0] // Assuming no payment is made initially
      );
      const paymentId = paymentResult.insertId;
  
      // Create a new reservation tied to the user and payment
      await connection.query(
        "INSERT INTO reservation (beginDate, endDate, roomId, userId, paymentId) VALUES (?, ?, ?, ?, ?)",
        [arrivalDate, departureDate, selectedRoomId, userId, paymentId]
      );
  
      await connection.commit();
      res.status(201).json({ message: "Reservation created successfully" });
    } catch (error) {
      await connection.rollback();
      console.error("Error creating reservation:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      connection.release();
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
