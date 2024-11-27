-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: reservation_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `reservation_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `reservation_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `reservation_db`;

--
-- Table structure for table `facilities`
--

DROP TABLE IF EXISTS `facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facilities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `facilityName` varchar(100) NOT NULL,
  `facilityDscr` text,
  `imageSrc` varchar(255) DEFAULT NULL,
  `availableDays` varchar(100) DEFAULT NULL,
  `minCap` int DEFAULT NULL,
  `maxCap` int DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `onlySKFlag` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilities`
--

LOCK TABLES `facilities` WRITE;
/*!40000 ALTER TABLE `facilities` DISABLE KEYS */;
INSERT INTO `facilities` VALUES (1,'Gym','Place used for physical activity','/assignImage/gym.jpg','Mon, Tue, Wed, Thu, Fri, Sat, Sun',1,4,'C1033',0),(2,'Swimming Pool','Aquatic Center','/assignImage/pool.jpg','Mon, Tue, Wed, Thu, Fri, Sat, Sun',1,4,'C102',0),(3,'Conference Room','Meeting Space','/assignImage/conference.jpg','Mon, Tue, Wed, Thu, Fri, Sat, Sun',1,4,'B101',1),(4,'Auditorium','The Auditorium Theater','/assignImage/auditorium.jpg','Mon, Tue, Wed, Thu',10,30,'A234',0),(5,'Seminar Room','Lecture Hall','/assignImage/seminar.jpg','Mon, Tue, Wed, Thu',1,4,'C1033',0),(6,'Library','Study and Read Books','/assignImage/library.jpg','Mon, Tue, Wed, Thu, Fri, Sat, Sun',1,4,'C1033',1);
/*!40000 ALTER TABLE `facilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `email` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `pw` varchar(255) NOT NULL,
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('abc@email.com','abc','947e3ebcundefined2725cb623f78bba30249c602491b956a6a0cdd12b731da7f8980f'),('asdf@123.com','asdf','7dd1c7df2c1a53dc2f271ad832b0b60bundefinedb4df49undefinede78a05dacb1615f8db51c'),('email1@email.com','test1','a1c036c2b6e50da61b4e78fd1bd19b8e13753f7cef75476dc8d076cca78316f'),('jjh113022@naver.com','Jay','e4f45d8ccc833aa32d76b7b1b4305dbb956bbf5db758f8a2cc02869e05084e2'),('joohyoung.jun@stonybrook.edu','df','f48844cc281e94a3b072926c725d23b2b0e805f1922c496db93d098dc787dfb1'),('sample1@email.com','sample1','1de7f3122c5216ddf3d08a7495783fdda4d817424f2aeeee4c15c6a25884ebb'),('test1@test.com','test1','47108b1013de0a4b8391b69dd538a0b71a20e07b7704ae797f2e0f2b5afa1f3');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `reservationId` int NOT NULL,
  `reservationDate` date DEFAULT NULL,
  `userNum` int DEFAULT NULL,
  `isSK` tinyint(1) DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `reservationName` varchar(100) DEFAULT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `imageSrc` varchar(255) DEFAULT NULL,
  `reservationLocation` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`reservationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (767305781,'2024-12-01',3,1,'test1','Library','User','/assignImage/library.jpg','B301'),(847234077,'2024-11-30',2,0,'test1','Gym','sample1','/assignImage/gym.jpg','C101'),(970659777,'2024-11-16',4,1,'conference room reservation test 1','Conference Room','User','/assignImage/conference.jpg','B101');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-27 12:47:32
