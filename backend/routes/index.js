import express from "express";
const router = express.Router();

// https://sidorares.github.io/node-mysql2/docs

export const routerConfig = (app) => {
  router.get("/api/rooms", function (req, res) {
    const rooms = [
      { id: 1, name: "Room 1" },
      { id: 2, name: "Room 2" },
      { id: 3, name: "Room 3" },
    ];

    res.json(rooms);
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
