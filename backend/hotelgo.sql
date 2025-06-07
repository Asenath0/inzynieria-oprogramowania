-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 07, 2025 at 09:09 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotelgo`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `number` varchar(20) NOT NULL,
  `occupiedBy` int(11) DEFAULT NULL,
  `standardId` int(11) NOT NULL,
  `roomStatusId` int(11) NOT NULL,
  `pricePerNight` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `capacity`, `number`, `occupiedBy`, `standardId`, `roomStatusId`, `pricePerNight`, `description`) VALUES
(1, 1, '206', NULL, 2, 4, 255.00, 'Wyposażenie pokoju jednoosobowego: wygodne łóżko, stolik z fotelem, biurko do pracy, krzesło, sejf elektroniczny, bezprzewodowy dostęp do internetu, łazienka z wanną. Śniadania są serwowane w formie bufetu szwedzkiego i angielskiego. W cenę pokoju wliczony jest darmowy, monitorowany parking.'),
(2, 2, '301', NULL, 4, 4, 280.00, 'Pokój deluxe wyposażenie: łoże małżeńskie, stolik z fotelami, biurko do pracy, krzesło, sejf elektroniczny, bezprzewodowy dostęp do internetu, łazienka z wanną. W cenę pokoju wliczone jest śniadanie w formie bufetu szwedzkiego i angielskiego, darmowy, monitorowany parking.'),
(3, 2, '115', NULL, 4, 4, 380.00, 'Pokój Dwuosobowy DeLux dostępny jest w dwóch wariantach: 1. Łóżko małżeńskie. 2. Oddzielne łóżka. Dodatkowe wyposażenie: stolik z fotelami, biurko do pracy, krzesło, sejf elektroniczny, bezprzewodowy dostęp do internetu, łazienka z wanną. W cenę pokoju wliczone są śniadania w formie bufetu szwedzkiego i angielskiego oraz darmowy, monitorowany parking.'),
(4, 4, '118', NULL, 3, 4, 520.00, 'Apartamenty są dostępne w dwóch wariantach: 1. Apartament przestrzenny wyposażenie: wygodne duże łoże małżeńskie, rozkładana sofa, stolik z fotelami, biurko do pracy, minibar, sejf elektroniczny, bezprzewodowy dostęp do internetu, dwie łazienki z czego jedna z wanną i prysznicem. 2. Apartament rodzinny: wygodne duże łoże małżeńskie, rozkładana sofa, stół z czterema krzesłami, biurko do pracy, minibar, sejf elektroniczny, bezprzewodowy dostęp do internetu, dwie łazienki z czego jedna z wanną i prysznicem.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roomimage`
--

CREATE TABLE `roomimage` (
  `id` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `path` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roomimage`
--

INSERT INTO `roomimage` (`id`, `roomId`, `path`, `description`) VALUES
(1, 1, 'https://hotel-amaryllis.pl/images/galeria/pokoje-1-osobowy-1.jpg', 'Jest to standardowy pokój jednoosobowy z pojedynczym łóżkiem, stolikiem nocnym z lampką, umożliwiającą czytanie, biurkiem do pracy, przy którym znajduje się kabel lanowski do podpięcia internetu szerokopasmowego, w przypadku gdyby sieć WiFi nie była wystarczająca. W pokoju znajduje się także fotel i stolik, przy którym można ze spokojem odpocząć i np. wypić kawę. O ochronę ważnych dokumentów nie trzeba się martwić, ponieważ w każdym z pokoi znajduje się sejf elektroniczny. Pokojowe łazienki wyposażone są w wanny, które konstrukcyjnie pozwalają również na wzięcie prysznica. Standardowo na wyposażeniu znajdują się przybory toaletowe.'),
(3, 1, 'https://hotel-amaryllis.pl/images/galeria/pokoje-1-osobowy-2.jpg', 'W ofercie posiadamy również pokoje typu DeLuxe i Superior o podwyższonym standardzie. DeLux jest to pokój dwuosobowy do wykorzystania dla jednej osoby. Dzięki czemu nasi Goście mają więcej przestrzeni dla siebie oraz większe, bardziej komfortowe, łóżka.'),
(4, 1, 'https://hotel-amaryllis.pl/images/galeria/pokoje-1-osobowy-3.jpg', 'Pokój jednoosobowy w hotelu Amaryllis przeznaczony jest dla osób\n              niepalących. Na terenie obiektu jest specjalne miejsce do tego\n              przeznaczone. Pokoje jednoosobowe, znajdujące się w naszym\n              obiekcie, są najchętniej rezerwowane przez Gości odwiedzających\n              Poznań i Swarzędz.'),
(6, 2, 'https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-1.jpg', 'W ofercie posiadamy dwa rodzaje eleganckich pokoi dwuosobowych: z dużym łóżkiem małżeńskim oraz z dwoma oddzielnymi łóżkami. Idealne na pobyt służbowy i prywatny.'),
(9, 2, 'https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-6.jpg', 'Pokoje dwuosobowe w Hotelu Amaryllis przeznaczone są dla osób niepalących. Na terenie obiektu jest specjalne miejsce przeznaczone do tego celu. Pokoje dwuosobowe znajdujące się w naszym obiekcie są najchętniej rezerwowane przez Gości odwiedzających Poznań i Swarzędz. '),
(10, 2, 'https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-2.jpg', 'Jeżeli mielibyście Państwo ochotę na jeszcze większy komfort, możecie pokusić się o zarezerwowanie apartamentu Superior dla dwóch osób. Jeden z nich jest rodzinnym apartamentem, w którym oprócz standardowego wyposażenia, dostępny jest stół z krzesłami i biurko do pracy w części dziennej, a w części sypialnej stolik z fotelami i ogromne królewskie łóżko. W drugim apartamencie przestrzennym, nacisk położony jest na wygodę przebywania. W części dziennej znajduje się biurko do pracy, natomiast w części sypialnej - duże wygodne łóżko, w obydwu częściach znajdują się stoliki z fotelami.'),
(11, 3, 'https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-3.jpg', 'Pokoje dwuosobowe w Hotelu Amaryllis przeznaczone są dla osób niepalących. Na terenie obiektu jest specjalne miejsce przeznaczone do tego celu. Pokoje dwuosobowe znajdujące się w naszym obiekcie są najchętniej rezerwowane przez Gości odwiedzających Poznań i Swarzędz. '),
(12, 3, 'https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-4.jpg', 'W ofercie posiadamy dwa rodzaje eleganckich pokoi dwuosobowych: z dużym łóżkiem małżeńskim oraz z dwoma oddzielnymi łóżkami. Idealne na pobyt służbowy i prywatny.'),
(13, 4, 'https://hotel-amaryllis.pl/images/galeria/pokoje-apartament-1.jpg', 'Dla najbardziej wymagających gości przygotowaliśmy trzy najbardziej komfortowo urządzone apartamenty.'),
(14, 4, 'https://hotel-amaryllis.pl/images/galeria/pokoje-apartament-2.jpg', 'Apartamenty w hotelu Amaryllis przeznaczone są dla osób niepalących. Na terenie obiektu jest specjalne miejsce przeznaczone do tego celu. Apartamenty znajdujące się w naszym obiekcie są najchętniej rezerwowane przez Gości odwiedzających Poznań i Swarzędz.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roomstatus`
--

CREATE TABLE `roomstatus` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roomstatus`
--

INSERT INTO `roomstatus` (`id`, `name`) VALUES
(1, 'Zajęty'),
(2, 'Do posprzątania'),
(3, 'Zgłoszono problem'),
(4, 'Gotowy');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `standard`
--

CREATE TABLE `standard` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `standard`
--

INSERT INTO `standard` (`id`, `name`) VALUES
(1, 'ekonomiczny'),
(2, 'standard'),
(3, 'superior'),
(4, 'deluxe');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomStatusId` (`roomStatusId`),
  ADD KEY `standardId` (`standardId`);

--
-- Indeksy dla tabeli `roomimage`
--
ALTER TABLE `roomimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomId` (`roomId`);

--
-- Indeksy dla tabeli `roomstatus`
--
ALTER TABLE `roomstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `standard`
--
ALTER TABLE `standard`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roomimage`
--
ALTER TABLE `roomimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `roomstatus`
--
ALTER TABLE `roomstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `standard`
--
ALTER TABLE `standard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`roomStatusId`) REFERENCES `roomstatus` (`id`),
  ADD CONSTRAINT `room_ibfk_2` FOREIGN KEY (`standardId`) REFERENCES `standard` (`id`);

--
-- Constraints for table `roomimage`
--
ALTER TABLE `roomimage`
  ADD CONSTRAINT `roomimage_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
