/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.4.5-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: hotelgo
-- ------------------------------------------------------
-- Server version	11.4.5-MariaDB-0ubuntu0.24.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `accountType`
--

DROP TABLE IF EXISTS `accountType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountType`
--

LOCK TABLES `accountType` WRITE;
/*!40000 ALTER TABLE `accountType` DISABLE KEYS */;
INSERT INTO `accountType` VALUES
(1,'uzytkownik');
/*!40000 ALTER TABLE `accountType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amountDue` decimal(12,2) NOT NULL,
  `paid` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES
(1,0.00,0.00),
(2,0.00,0.00);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `beginDate` date NOT NULL,
  `endDate` date NOT NULL,
  `roomId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `paymentId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `paymentId` (`paymentId`),
  KEY `fk_reservation_room` (`roomId`),
  CONSTRAINT `fk_reservation_room` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`paymentId`) REFERENCES `payment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES
(1,'2025-05-08','2025-05-10',2,1,1,'2025-06-14 14:52:04'),
(2,'2025-05-08','2025-05-10',2,2,2,'2025-06-14 14:52:58');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `capacity` int(11) NOT NULL,
  `number` varchar(20) NOT NULL,
  `occupiedBy` int(11) DEFAULT NULL,
  `standardId` int(11) NOT NULL,
  `roomStatusId` int(11) NOT NULL,
  `pricePerNight` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roomStatusId` (`roomStatusId`),
  KEY `standardId` (`standardId`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`roomStatusId`) REFERENCES `roomstatus` (`id`),
  CONSTRAINT `room_ibfk_2` FOREIGN KEY (`standardId`) REFERENCES `standard` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES
(1,1,'206',NULL,2,4,255.00,'Wyposażenie pokoju jednoosobowego: wygodne łóżko, stolik z fotelem, biurko do pracy, krzesło, sejf elektroniczny, bezprzewodowy dostęp do internetu, łazienka z wanną. Śniadania są serwowane w formie bufetu szwedzkiego i angielskiego. W cenę pokoju wliczony jest darmowy, monitorowany parking.'),
(2,2,'301',NULL,4,4,280.00,'Pokój deluxe wyposażenie: łoże małżeńskie, stolik z fotelami, biurko do pracy, krzesło, sejf elektroniczny, bezprzewodowy dostęp do internetu, łazienka z wanną. W cenę pokoju wliczone jest śniadanie w formie bufetu szwedzkiego i angielskiego, darmowy, monitorowany parking.'),
(3,2,'115',NULL,4,4,380.00,'Pokój Dwuosobowy DeLux dostępny jest w dwóch wariantach: 1. Łóżko małżeńskie. 2. Oddzielne łóżka. Dodatkowe wyposażenie: stolik z fotelami, biurko do pracy, krzesło, sejf elektroniczny, bezprzewodowy dostęp do internetu, łazienka z wanną. W cenę pokoju wliczone są śniadania w formie bufetu szwedzkiego i angielskiego oraz darmowy, monitorowany parking.'),
(4,4,'118',NULL,3,4,520.00,'Apartamenty są dostępne w dwóch wariantach: 1. Apartament przestrzenny wyposażenie: wygodne duże łoże małżeńskie, rozkładana sofa, stolik z fotelami, biurko do pracy, minibar, sejf elektroniczny, bezprzewodowy dostęp do internetu, dwie łazienki z czego jedna z wanną i prysznicem. 2. Apartament rodzinny: wygodne duże łoże małżeńskie, rozkładana sofa, stół z czterema krzesłami, biurko do pracy, minibar, sejf elektroniczny, bezprzewodowy dostęp do internetu, dwie łazienki z czego jedna z wanną i prysznicem.');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomimage`
--

DROP TABLE IF EXISTS `roomimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomimage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomId` int(11) NOT NULL,
  `path` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `roomimage_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomimage`
--

LOCK TABLES `roomimage` WRITE;
/*!40000 ALTER TABLE `roomimage` DISABLE KEYS */;
INSERT INTO `roomimage` VALUES
(1,1,'https://hotel-amaryllis.pl/images/galeria/pokoje-1-osobowy-1.jpg','Jest to standardowy pokój jednoosobowy z pojedynczym łóżkiem, stolikiem nocnym z lampką, umożliwiającą czytanie, biurkiem do pracy, przy którym znajduje się kabel lanowski do podpięcia internetu szerokopasmowego, w przypadku gdyby sieć WiFi nie była wystarczająca. W pokoju znajduje się także fotel i stolik, przy którym można ze spokojem odpocząć i np. wypić kawę. O ochronę ważnych dokumentów nie trzeba się martwić, ponieważ w każdym z pokoi znajduje się sejf elektroniczny. Pokojowe łazienki wyposażone są w wanny, które konstrukcyjnie pozwalają również na wzięcie prysznica. Standardowo na wyposażeniu znajdują się przybory toaletowe.'),
(3,1,'https://hotel-amaryllis.pl/images/galeria/pokoje-1-osobowy-2.jpg','W ofercie posiadamy również pokoje typu DeLuxe i Superior o podwyższonym standardzie. DeLux jest to pokój dwuosobowy do wykorzystania dla jednej osoby. Dzięki czemu nasi Goście mają więcej przestrzeni dla siebie oraz większe, bardziej komfortowe, łóżka.'),
(4,1,'https://hotel-amaryllis.pl/images/galeria/pokoje-1-osobowy-3.jpg','Pokój jednoosobowy w hotelu Amaryllis przeznaczony jest dla osób\n              niepalących. Na terenie obiektu jest specjalne miejsce do tego\n              przeznaczone. Pokoje jednoosobowe, znajdujące się w naszym\n              obiekcie, są najchętniej rezerwowane przez Gości odwiedzających\n              Poznań i Swarzędz.'),
(6,2,'https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-1.jpg','W ofercie posiadamy dwa rodzaje eleganckich pokoi dwuosobowych: z dużym łóżkiem małżeńskim oraz z dwoma oddzielnymi łóżkami. Idealne na pobyt służbowy i prywatny.'),
(9,2,'https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-6.jpg','Pokoje dwuosobowe w Hotelu Amaryllis przeznaczone są dla osób niepalących. Na terenie obiektu jest specjalne miejsce przeznaczone do tego celu. Pokoje dwuosobowe znajdujące się w naszym obiekcie są najchętniej rezerwowane przez Gości odwiedzających Poznań i Swarzędz. '),
(10,2,'https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-2.jpg','Jeżeli mielibyście Państwo ochotę na jeszcze większy komfort, możecie pokusić się o zarezerwowanie apartamentu Superior dla dwóch osób. Jeden z nich jest rodzinnym apartamentem, w którym oprócz standardowego wyposażenia, dostępny jest stół z krzesłami i biurko do pracy w części dziennej, a w części sypialnej stolik z fotelami i ogromne królewskie łóżko. W drugim apartamencie przestrzennym, nacisk położony jest na wygodę przebywania. W części dziennej znajduje się biurko do pracy, natomiast w części sypialnej - duże wygodne łóżko, w obydwu częściach znajdują się stoliki z fotelami.'),
(11,3,'https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-3.jpg','Pokoje dwuosobowe w Hotelu Amaryllis przeznaczone są dla osób niepalących. Na terenie obiektu jest specjalne miejsce przeznaczone do tego celu. Pokoje dwuosobowe znajdujące się w naszym obiekcie są najchętniej rezerwowane przez Gości odwiedzających Poznań i Swarzędz. '),
(12,3,'https://hotel-amaryllis.pl/images/galeria/pokoje-2-osobowy-4.jpg','W ofercie posiadamy dwa rodzaje eleganckich pokoi dwuosobowych: z dużym łóżkiem małżeńskim oraz z dwoma oddzielnymi łóżkami. Idealne na pobyt służbowy i prywatny.'),
(13,4,'https://hotel-amaryllis.pl/images/galeria/pokoje-apartament-1.jpg','Dla najbardziej wymagających gości przygotowaliśmy trzy najbardziej komfortowo urządzone apartamenty.'),
(14,4,'https://hotel-amaryllis.pl/images/galeria/pokoje-apartament-2.jpg','Apartamenty w hotelu Amaryllis przeznaczone są dla osób niepalących. Na terenie obiektu jest specjalne miejsce przeznaczone do tego celu. Apartamenty znajdujące się w naszym obiekcie są najchętniej rezerwowane przez Gości odwiedzających Poznań i Swarzędz.');
/*!40000 ALTER TABLE `roomimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomstatus`
--

DROP TABLE IF EXISTS `roomstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomstatus`
--

LOCK TABLES `roomstatus` WRITE;
/*!40000 ALTER TABLE `roomstatus` DISABLE KEYS */;
INSERT INTO `roomstatus` VALUES
(1,'Zajęty'),
(2,'Do posprzątania'),
(3,'Zgłoszono problem'),
(4,'Gotowy');
/*!40000 ALTER TABLE `roomstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standard`
--

DROP TABLE IF EXISTS `standard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `standard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standard`
--

LOCK TABLES `standard` WRITE;
/*!40000 ALTER TABLE `standard` DISABLE KEYS */;
INSERT INTO `standard` VALUES
(1,'ekonomiczny'),
(2,'standard'),
(3,'superior'),
(4,'deluxe');
/*!40000 ALTER TABLE `standard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountTypeId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` decimal(9,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accountTypeId` (`accountTypeId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`accountTypeId`) REFERENCES `accountType` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(1,1,'Katarzyna','Pstrokońska',NULL,'kasiapstrokonska03@gmail.com',111222333),
(2,1,'Katarzyna','Pstrokońska',NULL,'kasiapstrokonska03@gmail.com',111222333);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-06-15 19:31:18
