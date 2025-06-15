/**
 * @file Defines API routes for the backend application.
 * @summary Contains route handlers for fetching rooms, room images, and
 * creating reservations. Uses MySQL2 for database interactions.
 */

const dotenv = require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const router = express.Router();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

exports.routerConfig = (app) => {
  /**
   * @route GET /api/rooms
   * @summary Fetches rooms based on specified filters.
   * @description Retrieves room data from the database, applying filters for
   * standard, capacity, and price range.
   * @param {string} [standard] - The standard of the room.
   * @param {number} [capacity] - The capacity of the room.
   * @param {number} [priceMin] - The minimum price per night.
   * @param {number} [priceMax] - The maximum price per night.
   * @returns {object[]} An array of room objects.
   * @throws {500} - Database error.
   */
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

  /**
   * @route GET /api/room/images
   * @summary Fetches images for a specific room.
   * @description Retrieves image paths and descriptions from the database for a
   * given room ID.
   * @param {string} roomId - The ID of the room.
   * @returns {object[]} An array of image objects with path and description.
   * @throws {400} - Missing roomId parameter.
   * @throws {500} - Database error.
   */
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

  /**
   * @route POST /api/reservation/no-account
   * @summary Creates a new reservation without an existing account.
   * @description Creates a new user, payment record, and reservation in the database.
   * @param {string} name - User's name.
   * @param {string} surname - User's surname.
   * @param {string} email - User's email.
   * @param {string} phone - User's phone number.
   * @param {string} arrivalDate - Reservation arrival date.
   * @param {string} departureDate - Reservation departure date.
   * @param {string} selectedRoomId - ID of the selected room.
   * @returns {object} A success message.
   * @throws {400} - Missing required fields.
   * @throws {500} - Internal server error.
   */
  router.post("/api/reservation/no-account", async (req, res) => {
    const {
      name,
      surname,
      email,
      phone,
      arrivalDate,
      departureDate,
      selectedRoomId,
    } = req.body;

    if (
      !name ||
      !surname ||
      !email ||
      !phone ||
      !arrivalDate ||
      !departureDate ||
      !selectedRoomId
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const connection = await mysql.createConnection(dbConfig);
    try {
      await connection.beginTransaction();

      const [userResult] = await connection.execute(
        "INSERT INTO `user` (accountTypeId, name, lastName, email, phoneNumber) VALUES (?, ?, ?, ?, ?)",
        [1, name, surname, email, phone]
      );
      const userId = userResult.insertId;

      const [paymentResult] = await connection.execute(
        "INSERT INTO payment (amountDue, paid) VALUES (?, ?)",
        [0, 0]
      );
      const paymentId = paymentResult.insertId;

      await connection.execute(
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
      await connection.end();
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
