import express from "express";
const router = express.Router();

// https://sidorares.github.io/node-mysql2/docs

export const routerConfig = (app) => {
  router.get("/api/rooms", function (req, res) {
    const rooms = [
      {
        image:
          "https://hotel-amaryllis.pl/components/com_vikbooking/resources/uploads/r_pokoje-1-osobowy-3.jpg",
        standard: "standard",
        price: 255,
        beds: 1,
        description:
          "Wyposażenie pokoju jednoosobowego: wygodne łóżko, stolik z fotelem, biurko do pracy, krzesło, sejf elektroniczny, bezprzewodowy dostęp do internetu, łazienka z wanną. Śniadania są serwowane w formie bufetu szwedzkiego i angielskiego. W cenę pokoju wliczony jest darmowy, monitorowany parking.",
      },
      {
        image:
          "https://hotel-amaryllis.pl/components/com_vikbooking/resources/uploads/r_pokoje-2-osobowy-7.jpg",
        standard: "delux",
        price: 280,
        beds: 2,
        description:
          "Pokój deluxe wyposażenie: łoże małżeńskie, stolik z fotelami, biurko do pracy, krzesło, sejf elektroniczny, bezprzewodowy dostęp do internetu, łazienka z wanną. W cenę pokoju wliczone jest śniadanie w formie bufetu szwedzkiego i angielskiego, darmowy, monitorowany parking.",
      },
      {
        image:
          "https://hotel-amaryllis.pl/components/com_vikbooking/resources/uploads/r_pokoje-2-osobowy-3.jpg",
        standard: "delux",
        price: 380,
        beds: 2,
        description:
          "Pokój Dwuosobowy DeLux dostępny jest w dwóch wariantach: 1. Łóżko małżeńskie. 2. Oddzielne łóżka. Dodatkowe wyposażenie: stolik z fotelami, biurko do pracy, krzesło, sejf elektroniczny, bezprzewodowy dostęp do internetu, łazienka z wanną. W cenę pokoju wliczone są śniadania w formie bufetu szwedzkiego i angielskiego oraz darmowy, monitorowany parking.",
      },
      {
        image:
          "https://hotel-amaryllis.pl/components/com_vikbooking/resources/uploads/r_pokoje-apartament-2.jpg",
        standard: "superior",
        price: 520,
        beds: 4,
        description:
          "Apartamenty są dostępne w dwóch wariantach: 1. Apartament przestrzenny wyposażenie: wygodne duże łoże małżeńskie, rozkładana sofa, stolik z fotelami, biurko do pracy, minibar, sejf elektroniczny, bezprzewodowy dostęp do internetu, dwie łazienki z czego jedna z wanną i prysznicem. 2. Apartament rodzinny: wygodne duże łoże małżeńskie, rozkładana sofa, stół z czterema krzesłami, biurko do pracy, minibar, sejf elektroniczny, bezprzewodowy dostęp do internetu, dwie łazienki z czego jedna z wanną i prysznicem.",
      },
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
