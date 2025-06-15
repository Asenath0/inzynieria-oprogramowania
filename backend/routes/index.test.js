/**
 * @file Unit tests for API endpoints in routes/index.js.
 */

const request = require("supertest");
const express = require("express");
const { routerConfig } = require("./index.js");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

// Mock the database connection
jest.mock("mysql2/promise", () => {
  const mockExecute = jest.fn();
  const mockConnection = {
    execute: mockExecute,
    beginTransaction: jest.fn(),
    commit: jest.fn(),
    rollback: jest.fn(),
    release: jest.fn(),
    end: jest.fn(),
  };
  const mockCreateConnection = jest.fn(() => Promise.resolve(mockConnection));

  return {
    createConnection: mockCreateConnection,
  };
});

describe("API Endpoints", () => {
  let app;
  let mockExecute;
  let mockConnection;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    routerConfig(app);

    // Set up mock for mysql connection
    mockExecute = jest.fn();
    mockConnection = {
      execute: mockExecute,
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
      end: jest.fn(),
    };
    mysql.createConnection = jest.fn(() => Promise.resolve(mockConnection));
  });

  describe("GET /api/rooms", () => {
    it("should fetch rooms successfully", async () => {
      const mockRooms = [{ id: 1, number: "101", pricePerNight: 100 }];
      mockExecute.mockResolvedValue([mockRooms]);

      const response = await request(app).get("/api/rooms");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockRooms);
      expect(mockExecute).toHaveBeenCalled();
    });

    it("should handle database errors", async () => {
      mockExecute.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/rooms");

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: "Database error" });
    });
  });

  describe("GET /api/room/images", () => {
    it("should fetch room images successfully", async () => {
      const mockImages = [{ path: "/image1.jpg", description: "Image 1" }];
      mockExecute.mockResolvedValue([mockImages]);

      const response = await request(app)
        .get("/api/room/images")
        .query({ roomId: "1" });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockImages);
      expect(mockExecute).toHaveBeenCalled();
    });

    it("should return 400 if roomId is missing", async () => {
      const response = await request(app).get("/api/room/images");

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Missing roomId parameter" });
    });

    it("should handle database errors", async () => {
      mockExecute.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .get("/api/room/images")
        .query({ roomId: "1" });

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: "Database error" });
    });
  });

  describe("POST /api/reservation/no-account", () => {
    const reservationData = {
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      phone: "123456789",
      arrivalDate: "2024-01-01",
      departureDate: "2024-01-05",
      selectedRoomId: "1",
    };

    it("should create a reservation successfully", async () => {
      mockExecute.mockResolvedValue([{ insertId: 1 }]); // Mock userResult and paymentResult
      mockConnection.beginTransaction.mockResolvedValue();
      mockConnection.commit.mockResolvedValue();

      const response = await request(app)
        .post("/api/reservation/no-account")
        .send(reservationData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        message: "Reservation created successfully",
      });
      expect(mockExecute).toHaveBeenCalled();
      expect(mockConnection.beginTransaction).toHaveBeenCalled();
      expect(mockConnection.commit).toHaveBeenCalled();
    });

    it("should handle missing required fields", async () => {
      const invalidData = { ...reservationData, name: "" };

      const response = await request(app)
        .post("/api/reservation/no-account")
        .send(invalidData);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "All fields are required" });
    });

    it("should handle database errors", async () => {
      mockExecute.mockRejectedValue(new Error("Database error"));
      mockConnection.beginTransaction.mockResolvedValue();
      mockConnection.rollback.mockResolvedValue();

      const response = await request(app)
        .post("/api/reservation/no-account")
        .send(reservationData);

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
      expect(mockConnection.rollback).toHaveBeenCalled();
    });
  });
});
