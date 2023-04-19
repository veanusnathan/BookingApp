-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: property_renting_web_app
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Bali'),(2,'Bandung'),(3,'Jakarta'),(4,'Surabaya'),(5,'Yogyakarta');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `event_rates_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `total_rooms` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `event_rates_id` (`event_rates_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `event_ibfk_49` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_ibfk_50` FOREIGN KEY (`event_rates_id`) REFERENCES `event_rates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_ibfk_51` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Lebaran','2023-03-23','2023-03-25',5,1,2,NULL),(2,'Lebaran','2023-03-26','2023-03-31',5,2,2,NULL),(8,'tester','2023-03-29','2023-04-10',5,8,1,NULL),(14,'tester','2023-04-11','2023-04-11',5,14,1,0),(16,'puasa yeuh','2023-04-12','2023-04-12',5,16,1,0),(17,'','2023-03-22','2023-03-25',5,17,1,0),(18,'','2023-03-12','2023-03-12',5,18,1,0),(19,'tester','2023-04-14','2023-04-15',5,19,1,0);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_rates`
--

DROP TABLE IF EXISTS `event_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `discount` int DEFAULT NULL,
  `markup` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_rates`
--

LOCK TABLES `event_rates` WRITE;
/*!40000 ALTER TABLE `event_rates` DISABLE KEYS */;
INSERT INTO `event_rates` VALUES (1,0,10),(2,10,NULL),(8,50,0),(9,0,10),(14,50,0),(16,10,0),(17,90,0),(18,0,10),(19,20,0);
/*!40000 ALTER TABLE `event_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city_id` int NOT NULL,
  `property_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `location_ibfk_33` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `location_ibfk_34` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Badung',1,1),(2,'Badung',1,2),(3,'Legian',1,3),(4,'Denpasar',1,4),(5,'Ubud',1,5),(6,'Sukasada',1,6),(7,'Kuta',1,7),(8,'Kuta',1,8),(9,'Kuta',1,9),(10,'Seminyak',1,10),(11,'Badung',1,11),(12,'Nusa Dua',1,12),(13,'Ubud',1,13),(14,'Ubud',1,14),(15,'Kuta',1,15),(16,'Kubutambahan',1,16),(17,'Buah Batu',2,17),(18,'Cicendo',2,18),(19,'Antapani',2,19),(20,'Batununggal',2,20),(21,'Cimenyan',2,21),(22,'Dago Pakar',2,22),(23,'Dago',2,23),(24,'Cimenyan',2,24),(25,'Setiabudi',2,25),(26,'Pasirkaliki',2,26),(27,'Dago Pakar',2,27),(28,'Juanda',2,28),(29,'Dago',2,29),(30,'Lembang',2,30),(31,'Ciater',2,31),(32,'Cibodas',2,32),(33,'Karet',3,33),(34,'Kebayoran Baru',3,34),(35,'Gandaria',3,35),(36,'Jatinegara',3,36),(37,'Senayan',3,37),(38,'Rempoa',3,38),(39,'Duren Sawit',3,39),(40,'Kembangan',3,40),(41,'Mangkuluhur',3,41),(42,'Pasar Baru',3,42),(43,'Senayan',3,43),(44,'Sudirman',3,44),(45,'Kebayoran Baru',3,45),(46,'Pondok Aren',3,46),(47,'Pesanggrahan',3,47),(48,'Pesanggrahan',3,48),(49,'Dukuh Pakis',4,49),(50,'Sambikerep',4,50),(51,'Wiyung',4,51),(52,'Wiyung',4,52),(53,'Asem Rowo',4,53),(54,'Lakarsantri',4,54),(55,'Wonokromo',4,55),(56,'Sambikerep',4,56),(57,'genteng',4,57),(58,'Sawahan',4,58),(59,'Sukomanunggal',4,59),(60,'Genteng',4,60),(61,'Sambikerep',4,61),(62,'Sukolilo',4,62),(63,'Dukuh Pakis',4,63),(64,'Tandes',4,64),(65,'Depok',5,65),(66,'Merapi',5,66),(67,'Depok',5,67),(68,'Depok',5,68),(69,'Depok',5,69),(70,'Depok',5,70),(71,'Kasihan',5,71),(72,'Sewon',5,72),(73,'Adisucipto',5,73),(74,'Malioboro',5,74),(75,'Ngaglik',5,75),(76,'Depok',5,76),(77,'Kasihan',5,77),(78,'Mlati',5,78),(79,'Sewon',5,79),(80,'Depok',5,80);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(250) NOT NULL,
  `description` longtext,
  `tenant_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `property_ibfk_33` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `property_ibfk_34` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,'Apartment Citadines Bali','sesuai alamat','sesuai penjelasan','1',1),(2,'Apartment Coast Bali','sesuai alamat','penjelasaannya','1',1),(3,'Apartment Suji Bali','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(4,'Apartment The Vinhill Bali','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(5,'Guest House Authentic Vibes Bali','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(6,'Guest House Fire Place Bali','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(7,'Guest House Garden Mahe Bali','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(8,'Guest House Melasti Bali','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(9,'Hotel Aston Bali','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(10,'Hotel Potato Head Bali','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(11,'Hotel Swiss Bell Bali','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(12,'Hotel The Apurva Bali','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(13,'Villa Hideaway Bali','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(14,'Villa Stunning Bali','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(15,'Villa Uluwatu Surf Bali','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(16,'Villa Wisa Bali','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(17,'Apartment Emerald Apartel Bandung','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(18,'Apartment Gateway Bandung','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(19,'Apartment Tamansari Narel Bandung','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(20,'Apartment The Suites Metro Bandung','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(21,'Guest House Incognito Bandung','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(22,'Guest House Jendela Pakar Bandung','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(23,'Guest House Syllo2 Bandung','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(24,'Guest House Yucca Bandung','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(25,'Hotel GAIA Bandung','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(26,'Hotel Hilton Bandung','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(27,'Hotel Intercontinental Bandung','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(28,'Hotel Marriot Bandung','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(29,'Villa Bumi Andung Bandung','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(30,'Villa De Rossa Bandung','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(31,'Villa Miracle Bandung','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(32,'Villa The Lodge Bandung','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(33,'Apartment Batavia Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(34,'Apartment Botanica Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(35,'Apartment Gandaria Heights Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(36,'Apartment The Hive Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(37,'Guest House MK House Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(38,'Guest House Rumah Bumi Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(39,'Guest House Rumah Perdana Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(40,'Guest House West House Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(41,'Hotel Artotel Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(42,'Hotel Borobudur Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(43,'Hotel Mulia Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(44,'Hotel The Langham Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(45,'Villa Kasandra Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(46,'Villa Little Bali Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(47,'Villa Nuri Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(48,'Villa Rumatata Jakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(49,'Apartment Ciputra Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(50,'Apartment Orchard Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(51,'Apartment Pakuwon Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(52,'Apartment Rose Bay Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(53,'Guest House Ayyub Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(54,'Guest House Cheerful Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(55,'Guest House Kebon Sari Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(56,'Guest House Natura Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(57,'Hotel Doubletree Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(58,'Hotel Shangri-la Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(59,'Hotel Vasa Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(60,'Hotel Wyndam Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(61,'Villa Esayuri Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(62,'Villa Kertajaya Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(63,'Villa Raka Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(64,'Villa Ruma Manis Surabaya','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(65,'Apartment Jowo Klutuk Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(66,'Apartment Roten Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(67,'Apartment Student Castle Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(68,'Apartment V Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',1),(69,'Guest House Chipmunk Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(70,'Guest House Omah Tentrem Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(71,'Guest House Riverside Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(72,'Guest House Tasteful Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',2),(73,'Hotel Ambarrukmo Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(74,'Hotel Elroyale Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(75,'Hotel Hyatt Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(76,'Hotel Lafayette Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','1',3),(77,'Villa Portum Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(78,'Villa Teduh Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(79,'Villa Tembi Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',4),(80,'Villa Tibra Yogyakarta','sesuai addressnya ya','penjelasan tentang propertynya','2',4);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_accommodation`
--

DROP TABLE IF EXISTS `property_accommodation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_accommodation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_accommodation`
--

LOCK TABLES `property_accommodation` WRITE;
/*!40000 ALTER TABLE `property_accommodation` DISABLE KEYS */;
INSERT INTO `property_accommodation` VALUES (1,'Dimension'),(2,'Total guests'),(3,'Parkir'),(4,'Elevator'),(5,'Restaurant'),(6,'Breakfast restaurant'),(7,'Dinner restaurant'),(8,'Safety deposit box'),(9,'WiFi in public area'),(10,'Ballroom'),(11,'Sport center'),(12,'Swimming pool'),(13,'Spa'),(14,'Laundry service'),(15,'ATM/Banking'),(16,'Supermarket'),(17,'Smoking area public');
/*!40000 ALTER TABLE `property_accommodation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_connector`
--

DROP TABLE IF EXISTS `property_connector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_connector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `property_accommodation_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `property_accommodation_id` (`property_accommodation_id`),
  CONSTRAINT `property_connector_ibfk_31` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `property_connector_ibfk_32` FOREIGN KEY (`property_accommodation_id`) REFERENCES `property_accommodation` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=533 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_connector`
--

LOCK TABLES `property_connector` WRITE;
/*!40000 ALTER TABLE `property_connector` DISABLE KEYS */;
INSERT INTO `property_connector` VALUES (490,76,3),(491,76,7),(492,76,10),(493,76,14),(503,1,15),(504,1,16),(505,2,14),(506,2,10),(507,2,6),(508,NULL,9),(509,NULL,5),(510,NULL,6),(511,NULL,10),(512,NULL,14),(513,NULL,3),(514,NULL,11),(515,NULL,15),(516,NULL,16),(517,NULL,12),(518,NULL,8),(519,NULL,4),(520,NULL,17),(521,NULL,14),(522,NULL,15),(523,NULL,16),(524,3,9),(525,3,5),(526,3,16),(527,3,12),(528,3,8),(529,3,11),(530,3,15),(531,3,3),(532,3,6);
/*!40000 ALTER TABLE `property_connector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_image`
--

DROP TABLE IF EXISTS `property_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) DEFAULT NULL,
  `property_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_image_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=365 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_image`
--

LOCK TABLES `property_image` WRITE;
/*!40000 ALTER TABLE `property_image` DISABLE KEYS */;
INSERT INTO `property_image` VALUES (1,'apartment-bali-badung-citadines-1-1.webp',1),(2,'apartment-bali-badung-coast-1-1.webp',2),(3,'apartment-bali-legian-suji-1-1.webp',3),(4,'apartment-bali-denpasar-thevinhill-1-1.webp',4),(5,'guesthouse-bali-ubud-authenticvibes-1-1.webp',5),(6,'guesthouse-bali-sukasada-fireplace-1-1.webp',6),(7,'guesthouse-bali-kuta-gardenmahe-1-1.webp',7),(8,'guesthouse-bali-kuta-melasti-1-1.webp',8),(9,'hotel-bali-kuta-aston-1-1.webp',9),(10,'hotel-bali-seminyak-potatohead-1-1.webp',10),(11,'hotel-bali-badung-swissbell-1-1.webp',11),(12,'hotel-bali-nusadua-theapurva-1-1.webp',12),(13,'villa-bali-ubud-hideaway-1-1.webp',13),(14,'villa-bali-ubud-stunning-1-1.webp',14),(15,'villa-bali-kuta-uluwatusurf-1-1.webp',15),(16,'villa-bali-kubutambahan-wisa-1-1.webp',16),(17,'apartment-bandung-buahbatu-emeraldapartel-1-1.webp',17),(18,'apartment-bandung-cicendo-gateway-1-1.webp',18),(19,'apartment-bandung-antapani-tamansarinarel-1-1.webp',19),(20,'apartment-bandung-batununggal-thesuitesmetro-1-1.webp',20),(21,'guesthouse-bandung-cimenyan-incognito-1-1.webp',21),(22,'guesthouse-bandung-dagopakar-jendelapakar-1-1.webp',22),(23,'guesthouse-bandung-dago-syllo2-1-1.webp',23),(24,'guesthouse-bandung-cimenyan-yucca-1-1.webp',24),(25,'hotel-bandung-setiabudi-gaia-1-1.webp',25),(26,'hotel-bandung-pasirkaliki-hilton-1-1.webp',26),(27,'hotel-bandung-dagopakar-intercontinental-1-1.webp',27),(28,'hotel-bandung-juanda-marriot-1-1.webp',28),(29,'villa-bandung-dago-bumiandung-1-1.webp',29),(30,'villa-bandung-lembang-derossa-1-1.webp',30),(31,'villa-bandung-ciater-miracle-1-1.webp',31),(32,'villa-bandung-cibodas-thelodge-1-1.webp',32),(33,'apartment-jakarta-karet-batavia-1-1.webp',33),(34,'apartment-jakarta-kbybaru-botanica-1-1.webp',34),(35,'apartment-jakarta-gandaria-gandariaheights-1-1.webp',35),(36,'apartment-jakarta-jatinegara-thehive-1-1.webp',36),(37,'guesthouse-jakarta-senayan-mkhouse-1-1.webp',37),(38,'guesthouse-jakarta-rempoa-rumahbumi-1-1.jpg',38),(39,'guesthouse-jakarta-durensawit-rumahperdana-1-1.webp',39),(40,'guesthouse-jakarta-kembangan-westhouse-1-1.webp',40),(41,'hotel-jakarta-mangkuluhur-artotel-1-1.webp',41),(42,'hotel-jakarta-pasarbaru-borobudur-1-1.webp',42),(43,'hotel-jakarta-senayan-mulia-1-1.webp',43),(44,'hotel-jakarta-sudirman-thelangham-1-1.webp',44),(45,'villa-jakarta-kbybaru-kasandra-1-1.webp',45),(46,'villa-jakarta-pondokaren-littlebali-1-1.webp',46),(47,'villa-jakarta-pesanggrahan-nuri-1-1.webp',47),(48,'villa-jakarta-pesanggrahan-rumatata-1-1.webp',48),(49,'apartment-surabaya-dukuhpakis-ciputra-1-1.webp',49),(50,'apartment-surabaya-sambikerep-orchard-1-1.webp',50),(51,'apartment-surabaya-wiyung-pakuwon-1-1.webp',51),(52,'apartment-surabaya-wiyung-rosebay-1-1.webp',52),(53,'guesthouse-surabaya-asemrowo-ayyub-1-1.webp',53),(54,'guesthouse-surabaya-lakarsantri-cheerful-1-1.webp',54),(55,'guesthouse-surabaya-wonokromo-kebonsari-1-1.webp',55),(56,'guesthouse-surabaya-sambikerep-natura-1-1.webp',56),(57,'hotel-surabaya-genteng-doubletree-1-1.webp',57),(58,'hotel-surabaya-sawahan-shangrila-1-1.webp',58),(59,'hotel-surabaya-sukomanunggal-vasa-1-1.webp',59),(60,'hotel-surabaya-genteng-wyndam-1-1.webp',60),(61,'villa-surabaya-sambikerep-esayuri-1-1.webp',61),(62,'villa-surabaya-sukolilo-kertajaya-1-1.webp',62),(63,'villa-surabaya-dukuhpakis-raka-1-1.webp',63),(64,'villa-surabaya-tandes-rumamanis-1-1.jpeg',64),(65,'apartment-yogyakarta-depok-jowoklutuk-1-1.webp',65),(66,'apartment-yogyakarta-merapi-roten-1-1.webp',66),(67,'apartment-yogyakarta-depok-studentcastle-1-1.webp',67),(68,'apartment-yogyakarta-depok-v-1-1.webp',68),(69,'guesthouse-yogyakarta-depok-chipmunk-1-1.webp',69),(70,'guesthouse-yogyakarta-depok-omahtentrem-1-1.webp',70),(71,'guesthouse-yogyakarta-kasihan-riverside-1-1.webp',71),(72,'guesthouse-yogyakarta-sewon-tasteful-1-1.webp',72),(73,'hotel-yogyakarta-adisucipto-ambarrukmo-1-1.webp',73),(74,'hotel-yogyakarta-malioboro-elroyale-1-1.webp',74),(75,'hotel-yogyakarta-ngaglik-hyatt-1-1.webp',75),(76,'hotel-yogyakarta-depok-lafayette-1-1.webp',76),(77,'villa-yogyakarta-kasihan-portum-1-1.webp',77),(78,'villa-yogyakarta-mlati-teduh-1-1.webp',78),(79,'villa-yogyakarta-sewon-tembi-1-1.webp',79),(80,'villa-yogyakarta-depok-tibra-1-1.webp',80),(81,'apartment-bali-badung-citadines-1-2.webp',1),(82,'apartment-bali-badung-coast-1-2.webp',2),(83,'apartment-bali-legian-suji-1-2.webp',3),(84,'apartment-bali-denpasar-thevinhill-1-2.webp',4),(85,'guesthouse-bali-ubud-authenticvibes-1-2.webp',5),(86,'guesthouse-bali-sukasada-fireplace-1-2.webp',6),(87,'guesthouse-bali-kuta-gardenmahe-1-2.webp',7),(88,'guesthouse-bali-kuta-melasti-1-2.webp',8),(89,'hotel-bali-kuta-aston-1-2.webp',9),(90,'hotel-bali-seminyak-potatohead-1-2.webp',10),(91,'hotel-bali-badung-swissbell-1-2.webp',11),(92,'hotel-bali-nusadua-theapurva-1-2.webp',12),(93,'villa-bali-ubud-hideaway-1-2.webp',13),(94,'villa-bali-ubud-stunning-1-2.webp',14),(95,'villa-bali-kuta-uluwatusurf-1-2.webp',15),(96,'villa-bali-kubutambahan-wisa-1-2.webp',16),(97,'apartment-bandung-buahbatu-emeraldapartel-1-2.webp',17),(98,'apartment-bandung-cicendo-gateway-1-2.webp',18),(99,'apartment-bandung-antapani-tamansarinarel-1-2.webp',19),(100,'apartment-bandung-batununggal-thesuitesmetro-1-2.webp',20),(101,'guesthouse-bandung-cimenyan-incognito-1-2.webp',21),(102,'guesthouse-bandung-dagopakar-jendelapakar-1-2.webp',22),(103,'guesthouse-bandung-dago-syllo2-1-2.webp',23),(104,'guesthouse-bandung-cimenyan-yucca-1-2.webp',24),(105,'hotel-bandung-setiabudi-gaia-1-2.webp',25),(106,'hotel-bandung-pasirkaliki-hilton-1-2.webp',26),(107,'hotel-bandung-dagopakar-intercontinental-1-2.webp',27),(108,'hotel-bandung-juanda-marriot-1-2.webp',28),(109,'villa-bandung-dago-bumiandung-1-2.webp',29),(110,'villa-bandung-lembang-derossa-1-2.webp',30),(111,'villa-bandung-ciater-miracle-1-2.webp',31),(112,'villa-bandung-cibodas-thelodge-1-2.webp',32),(113,'apartment-jakarta-karet-batavia-1-2.webp',33),(114,'apartment-jakarta-kbybaru-botanica-1-2.webp',34),(115,'apartment-jakarta-gandaria-gandariaheights-1-2.webp',35),(116,'apartment-jakarta-jatinegara-thehive-1-2.webp',36),(117,'guesthouse-jakarta-senayan-mkhouse-1-2.webp',37),(118,'guesthouse-jakarta-rempoa-rumahbumi-1-2.jpg',38),(119,'guesthouse-jakarta-durensawit-rumahperdana-1-2.webp',39),(120,'guesthouse-jakarta-kembangan-westhouse-1-2.webp',40),(121,'hotel-jakarta-mangkuluhur-artotel-1-2.webp',41),(122,'hotel-jakarta-pasarbaru-borobudur-1-1.webp',42),(123,'hotel-jakarta-senayan-mulia-1-2.webp',43),(124,'hotel-jakarta-sudirman-thelangham-1-2.webp',44),(125,'villa-jakarta-kbybaru-kasandra-1-2.webp',45),(126,'villa-jakarta-pondokaren-littlebali-1-2.webp',46),(127,'villa-jakarta-pesanggrahan-nuri-1-2.webp',47),(128,'villa-jakarta-pesanggrahan-rumatata-1-2.webp',48),(129,'apartment-surabaya-dukuhpakis-ciputra-1-2.webp',49),(130,'apartment-surabaya-sambikerep-orchard-1-2.webp',50),(131,'apartment-surabaya-wiyung-pakuwon-1-2.webp',51),(132,'apartment-surabaya-wiyung-rosebay-1-2.webp',52),(133,'guesthouse-surabaya-asemrowo-ayyub-1-2.webp',53),(134,'guesthouse-surabaya-lakarsantri-cheerful-1-2.webp',54),(135,'guesthouse-surabaya-wonokromo-kebonsari-1-2.webp',55),(136,'guesthouse-surabaya-sambikerep-natura-1-2.webp',56),(137,'hotel-surabaya-genteng-doubletree-1-2.webpp',57),(138,'hotel-surabaya-sawahan-shangrila-1-2.webp',58),(139,'hotel-surabaya-sukomanunggal-vasa-1-2.webp',59),(140,'hotel-surabaya-genteng-wyndam-1-2.webp',60),(141,'villa-surabaya-sambikerep-esayuri-1-2.webp',61),(142,'villa-surabaya-sukolilo-kertajaya-1-2.webp',62),(143,'villa-surabaya-dukuhpakis-raka-1-2.webp',63),(144,'villa-surabaya-tandes-rumamanis-1-2.jpeg',64),(145,'apartment-yogyakarta-depok-jowoklutuk-1-2.webp',65),(146,'apartment-yogyakarta-merapi-roten-1-2.webp',66),(147,'apartment-yogyakarta-depok-studentcastle-1-2.webp',67),(148,'apartment-yogyakarta-depok-v-1-2.webp',68),(149,'guesthouse-yogyakarta-depok-chipmunk-1-2.webp',69),(150,'guesthouse-yogyakarta-depok-omahtentrem-1-2.webp',70),(151,'guesthouse-yogyakarta-kasihan-riverside-1-2.webp',71),(152,'guesthouse-yogyakarta-sewon-tasteful-1-2.webp',72),(153,'hotel-yogyakarta-adisucipto-ambarrukmo-1-2.webp',73),(154,'hotel-yogyakarta-malioboro-elroyale-1-2.webp',74),(155,'hotel-yogyakarta-ngaglik-hyatt-1-2.webp',75),(156,'hotel-yogyakarta-depok-lafayette-1-2.webp',76),(157,'villa-yogyakarta-kasihan-portum-1-2.webp',77),(158,'villa-yogyakarta-mlati-teduh-1-2.webp',78),(159,'villa-yogyakarta-sewon-tembi-1-2.webp',79),(160,'villa-yogyakarta-depok-tibra-1-2.webp',80);
/*!40000 ALTER TABLE `property_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rating` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `transactions_history_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`),
  KEY `room_id` (`room_id`),
  KEY `transactions_history_id` (`transactions_history_id`),
  CONSTRAINT `review_ibfk_31` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_32` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_33` FOREIGN KEY (`transactions_history_id`) REFERENCES `transactions_history` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (24,'9beaa852-6017-4127-8dba-6c7d0f147184','Nice Room','2023-03-26 20:52:07','2023-03-26 20:52:07',5,NULL,74),(84,'5890b6f4-54fb-4877-8d00-92e7727913e0','enak euy!','2023-03-28 23:26:47','2023-03-28 23:26:47',5,6,76),(86,'5890b6f4-54fb-4877-8d00-92e7727913e0','wakwaw','2023-03-28 23:47:24','2023-03-28 23:47:24',4,6,76),(87,'5890b6f4-54fb-4877-8d00-92e7727913e0','wakwaw 2','2023-03-28 23:47:46','2023-03-28 23:47:46',3,6,76);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `available_room` int NOT NULL,
  `price` int NOT NULL,
  `property_id` int NOT NULL,
  `event_rates_id` int DEFAULT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Executive','penjelasan tentang roomnya',2,700000,1,19,4.5),(2,'One Bedroom','penjelasan tentang roomnya',2,500000,1,NULL,NULL),(3,'One Bedroom','penjelasan tentang roomnya',2,500000,2,NULL,5),(4,'Studio','penjelasan tentang roomnya',2,500000,2,NULL,NULL),(5,'One Bedroom','penjelasan tentang roomnya',2,500000,3,NULL,NULL),(6,'Studio Queen','penjelasan tentang roomnya',2,500000,3,NULL,5),(7,'One Bedroom','penjelasan tentang roomnya',2,500000,4,NULL,NULL),(8,'Standard','penjelasan tentang roomnya',2,500000,4,NULL,NULL),(9,'Superior','penjelasan tentang roomnya',2,500000,5,NULL,NULL),(10,'Twin','penjelasan tentang roomnya',2,500000,5,NULL,NULL),(11,'Comfy','penjelasan tentang roomnya',2,500000,6,NULL,NULL),(12,'Elegant','penjelasan tentang roomnya',2,500000,6,NULL,NULL),(13,'Large','penjelasan tentang roomnya',2,500000,7,NULL,NULL),(14,'Medium','penjelasan tentang roomnya',2,500000,7,NULL,NULL),(15,'King','penjelasan tentang roomnya',2,500000,8,NULL,NULL),(16,'Master','penjelasan tentang roomnya',2,500000,8,NULL,NULL),(17,'Family','penjelasan tentang roomnya',2,500000,9,NULL,NULL),(18,'Premier','penjelasan tentang roomnya',2,500000,9,NULL,NULL),(19,'Resident','penjelasan tentang roomnya',2,500000,10,NULL,NULL),(20,'Studio','penjelasan tentang roomnya',2,500000,10,NULL,NULL),(21,'Deluxe','penjelasan tentang roomnya',2,500000,11,NULL,NULL),(22,'Suite','penjelasan tentang roomnya',2,500000,11,NULL,NULL),(23,'Deluxe','penjelasan tentang roomnya',2,500000,12,NULL,NULL),(24,'Junior Suite','penjelasan tentang roomnya',2,500000,12,NULL,NULL),(25,'Master','penjelasan tentang roomnya',2,500000,13,NULL,NULL),(26,'Superior Twin','penjelasan tentang roomnya',2,500000,13,NULL,NULL),(27,'Master','penjelasan tentang roomnya',2,500000,14,NULL,NULL),(28,'Queen','penjelasan tentang roomnya',2,500000,14,NULL,NULL),(29,'Deluxe','penjelasan tentang roomnya',2,500000,15,NULL,NULL),(30,'One Bedroom','penjelasan tentang roomnya',2,500000,15,NULL,NULL),(31,'Deluxe','penjelasan tentang roomnya',2,500000,16,NULL,NULL),(32,'Super King','penjelasan tentang roomnya',2,500000,16,NULL,NULL),(33,'Deluxe','penjelasan tentang roomnya',2,500000,17,NULL,NULL),(34,'One Bedroom','penjelasan tentang roomnya',2,500000,17,NULL,NULL),(35,'One Bedroom','penjelasan tentang roomnya',2,500000,18,NULL,NULL),(36,'Studio','penjelasan tentang roomnya',2,500000,18,NULL,NULL),(37,'One Bedroom','penjelasan tentang roomnya',2,500000,19,NULL,NULL),(38,'Studio','penjelasan tentang roomnya',2,500000,19,NULL,NULL),(39,'One Bedroom','penjelasan tentang roomnya',2,500000,20,NULL,NULL),(40,'Studio','penjelasan tentang roomnya',2,500000,20,NULL,NULL),(41,'Master','penjelasan tentang roomnya',2,500000,21,NULL,NULL),(42,'Twin','penjelasan tentang roomnya',2,500000,21,NULL,NULL),(43,'King','penjelasan tentang roomnya',2,500000,22,NULL,NULL),(44,'Super King','penjelasan tentang roomnya',2,500000,22,NULL,NULL),(45,'King','penjelasan tentang roomnya',2,500000,23,NULL,NULL),(46,'Queen','penjelasan tentang roomnya',2,500000,23,NULL,NULL),(47,'Master','penjelasan tentang roomnya',2,500000,24,NULL,NULL),(48,'Twin','penjelasan tentang roomnya',2,500000,24,NULL,NULL),(49,'Club','penjelasan tentang roomnya',2,500000,25,NULL,NULL),(50,'Deluxe','penjelasan tentang roomnya',2,500000,25,NULL,NULL),(51,'Deluxe','penjelasan tentang roomnya',2,500000,26,NULL,NULL),(52,'Queen','penjelasan tentang roomnya',2,500000,26,NULL,NULL),(53,'Standard','penjelasan tentang roomnya',2,500000,27,NULL,NULL),(54,'Queen','penjelasan tentang roomnya',2,500000,27,NULL,NULL),(55,'King','penjelasan tentang roomnya',2,500000,28,NULL,NULL),(56,'Twin Bed','penjelasan tentang roomnya',2,500000,28,NULL,NULL),(57,'King','penjelasan tentang roomnya',2,500000,29,NULL,NULL),(58,'Queen','penjelasan tentang roomnya',2,500000,29,NULL,NULL),(59,'Lite','penjelasan tentang roomnya',2,500000,30,NULL,NULL),(60,'Superior','penjelasan tentang roomnya',2,500000,30,NULL,NULL),(61,'Queen','penjelasan tentang roomnya',2,500000,31,NULL,NULL),(62,'Suite','penjelasan tentang roomnya',2,500000,31,NULL,NULL),(63,'Campervan','penjelasan tentang roomnya',2,500000,32,NULL,NULL),(64,'Superior','penjelasan tentang roomnya',2,500000,32,NULL,NULL),(65,'Deluxe','penjelasan tentang roomnya',2,500000,33,NULL,NULL),(66,'Superior','penjelasan tentang roomnya',2,500000,33,NULL,NULL),(67,'Master','penjelasan tentang roomnya',2,500000,34,NULL,NULL),(68,'Secondary','penjelasan tentang roomnya',2,500000,34,NULL,NULL),(69,'Master','penjelasan tentang roomnya',2,500000,35,NULL,NULL),(70,'Secondary','penjelasan tentang roomnya',2,500000,35,NULL,NULL),(71,'Primary','penjelasan tentang roomnya',2,500000,36,NULL,NULL),(72,'Secondary','penjelasan tentang roomnya',2,500000,36,NULL,NULL),(73,'Double','penjelasan tentang roomnya',2,500000,37,NULL,NULL),(74,'Queen','penjelasan tentang roomnya',2,500000,37,NULL,NULL),(75,'Single','penjelasan tentang roomnya',2,500000,38,NULL,NULL),(76,'Single Long','penjelasan tentang roomnya',2,500000,38,NULL,NULL),(77,'Adult','penjelasan tentang roomnya',2,500000,39,NULL,NULL),(78,'Kid','penjelasan tentang roomnya',2,500000,39,NULL,NULL),(79,'Master','penjelasan tentang roomnya',2,500000,40,NULL,NULL),(80,'Suite','penjelasan tentang roomnya',2,500000,40,NULL,NULL),(81,'King','penjelasan tentang roomnya',2,500000,41,NULL,NULL),(82,'Twin','penjelasan tentang roomnya',2,500000,41,NULL,NULL),(83,'Club Suite','penjelasan tentang roomnya',2,500000,42,NULL,NULL),(84,'Twin','penjelasan tentang roomnya',2,500000,42,NULL,NULL),(85,'Junior Suite','penjelasan tentang roomnya',2,500000,43,NULL,NULL),(86,'Signature','penjelasan tentang roomnya',2,500000,43,NULL,NULL),(87,'Deluxe King','penjelasan tentang roomnya',2,500000,44,NULL,NULL),(88,'Skyline King','penjelasan tentang roomnya',2,500000,44,NULL,NULL),(89,'Family','penjelasan tentang roomnya',2,500000,45,NULL,NULL),(90,'King','penjelasan tentang roomnya',2,500000,45,NULL,NULL),(91,'Master','penjelasan tentang roomnya',2,500000,46,NULL,NULL),(92,'Master Pavilion','penjelasan tentang roomnya',2,500000,46,NULL,NULL),(93,'Queen','penjelasan tentang roomnya',2,500000,47,NULL,NULL),(94,'Twin','penjelasan tentang roomnya',2,500000,47,NULL,NULL),(95,'Master','penjelasan tentang roomnya',2,500000,48,NULL,NULL),(96,'Suite','penjelasan tentang roomnya',2,500000,48,NULL,NULL),(97,'Master King','penjelasan tentang roomnya',2,500000,49,NULL,NULL),(98,'Single','penjelasan tentang roomnya',2,500000,49,NULL,NULL),(99,'Primary','penjelasan tentang roomnya',2,500000,50,NULL,NULL),(100,'Secondary','penjelasan tentang roomnya',2,500000,50,NULL,NULL),(101,'Main','penjelasan tentang roomnya',2,500000,51,NULL,NULL),(102,'Single','penjelasan tentang roomnya',2,500000,51,NULL,NULL),(103,'Master','penjelasan tentang roomnya',2,500000,52,NULL,NULL),(104,'Secondary','penjelasan tentang roomnya',2,500000,52,NULL,NULL),(105,'King','penjelasan tentang roomnya',2,500000,53,NULL,NULL),(106,'Master','penjelasan tentang roomnya',2,500000,53,NULL,NULL),(107,'Master','penjelasan tentang roomnya',2,500000,54,NULL,NULL),(108,'Single','penjelasan tentang roomnya',2,500000,54,NULL,NULL),(109,'King','penjelasan tentang roomnya',2,500000,55,NULL,NULL),(110,'Twin','penjelasan tentang roomnya',2,500000,55,NULL,NULL),(111,'King','penjelasan tentang roomnya',2,500000,56,NULL,NULL),(112,'Single','penjelasan tentang roomnya',2,500000,56,NULL,NULL),(113,'Deluxe','penjelasan tentang roomnya',2,500000,57,NULL,NULL),(114,'Suite','penjelasan tentang roomnya',2,500000,57,NULL,NULL),(115,'Horizon','penjelasan tentang roomnya',2,500000,58,NULL,NULL),(116,'Twin Deluxe','penjelasan tentang roomnya',2,500000,58,NULL,NULL),(117,'Executive','penjelasan tentang roomnya',2,500000,59,NULL,NULL),(118,'Twin','penjelasan tentang roomnya',2,500000,59,NULL,NULL),(119,'Deluxe King','penjelasan tentang roomnya',2,500000,60,NULL,NULL),(120,'Executive','penjelasan tentang roomnya',2,500000,60,NULL,NULL),(121,'Double','penjelasan tentang roomnya',2,500000,61,NULL,NULL),(122,'Master','penjelasan tentang roomnya',2,500000,61,NULL,NULL),(123,'Premier','penjelasan tentang roomnya',2,500000,62,NULL,NULL),(124,'Premier Plus','penjelasan tentang roomnya',2,500000,62,NULL,NULL),(125,'Queen','penjelasan tentang roomnya',2,500000,63,NULL,NULL),(126,'Twin','penjelasan tentang roomnya',2,500000,63,NULL,NULL),(127,'Main','penjelasan tentang roomnya',2,500000,64,NULL,NULL),(128,'Single','penjelasan tentang roomnya',2,500000,64,NULL,NULL),(129,'Studio','penjelasan tentang roomnya',2,500000,65,NULL,NULL),(130,'Studio Plus','penjelasan tentang roomnya',2,500000,65,NULL,NULL),(131,'Primary','penjelasan tentang roomnya',2,500000,66,NULL,NULL),(132,'Secondary','penjelasan tentang roomnya',2,500000,66,NULL,NULL),(133,'Studio East','penjelasan tentang roomnya',2,500000,67,NULL,NULL),(134,'Studio West','penjelasan tentang roomnya',2,500000,67,NULL,NULL),(135,'Master','penjelasan tentang roomnya',2,500000,68,NULL,NULL),(136,'Secondary','penjelasan tentang roomnya',2,500000,68,NULL,NULL),(137,'Main Room','penjelasan tentang roomnya',2,500000,69,NULL,NULL),(138,'Second','penjelasan tentang roomnya',2,500000,69,NULL,NULL),(139,'Family','penjelasan tentang roomnya',2,500000,70,NULL,NULL),(140,'Master','penjelasan tentang roomnya',2,500000,70,NULL,NULL),(141,'Master','penjelasan tentang roomnya',2,500000,71,NULL,NULL),(142,'Queen','penjelasan tentang roomnya',2,500000,71,NULL,NULL),(143,'Master','penjelasan tentang roomnya',2,500000,72,NULL,NULL),(144,'Secondary','penjelasan tentang roomnya',2,500000,72,NULL,NULL),(145,'Executive','penjelasan tentang roomnya',2,500000,73,NULL,NULL),(146,'Junior','penjelasan tentang roomnya',2,500000,73,NULL,NULL),(147,'Deluxe King','penjelasan tentang roomnya',2,500000,74,NULL,NULL),(148,'Executive King','penjelasan tentang roomnya',2,500000,74,NULL,NULL),(149,'King','penjelasan tentang roomnya',2,500000,75,NULL,NULL),(150,'Twin','penjelasan tentang roomnya',2,500000,75,NULL,NULL),(151,'President','penjelasan tentang roomnya',2,500000,76,NULL,NULL),(152,'Suite','penjelasan tentang roomnya',2,500000,76,NULL,NULL),(153,'Deluxe','penjelasan tentang roomnya',2,500000,77,NULL,NULL),(154,'Paviliun','penjelasan tentang roomnya',2,500000,77,NULL,NULL),(155,'Master','penjelasan tentang roomnya',2,500000,78,NULL,NULL),(156,'Twin','penjelasan tentang roomnya',2,500000,78,NULL,NULL),(157,'Master','penjelasan tentang roomnya',2,500000,79,NULL,NULL),(158,'Secondary','penjelasan tentang roomnya',2,500000,79,NULL,NULL),(159,'Master','penjelasan tentang roomnya',2,500000,80,NULL,NULL),(160,'Secondary','penjelasan tentang roomnya',2,300000,80,NULL,NULL);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_accommodation`
--

DROP TABLE IF EXISTS `room_accommodation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_accommodation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_accommodation`
--

LOCK TABLES `room_accommodation` WRITE;
/*!40000 ALTER TABLE `room_accommodation` DISABLE KEYS */;
INSERT INTO `room_accommodation` VALUES (1,'Total guests'),(2,'Free breakfast'),(3,'Refrigerator'),(4,'Air conditioning'),(5,'Cable TV'),(6,'Bathtub'),(7,'Shower'),(8,'Heater'),(9,'Jacuzzi'),(10,'Hairdryer'),(11,'In-room safe'),(12,'Bathrobe'),(13,'Desk'),(14,'Free WiFi'),(15,'LAN Internet'),(16,'Smoking room'),(17,'Non-Smoking room');
/*!40000 ALTER TABLE `room_accommodation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_blocked_dates`
--

DROP TABLE IF EXISTS `room_blocked_dates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_blocked_dates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_blocked_date` date DEFAULT NULL,
  `end_blocked_date` date DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `room_blocked_dates_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_blocked_dates`
--

LOCK TABLES `room_blocked_dates` WRITE;
/*!40000 ALTER TABLE `room_blocked_dates` DISABLE KEYS */;
INSERT INTO `room_blocked_dates` VALUES (1,'2023-04-25','2023-04-30','',1);
/*!40000 ALTER TABLE `room_blocked_dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_connector`
--

DROP TABLE IF EXISTS `room_connector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_connector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `room_accommodation_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `room_accommodation_id` (`room_accommodation_id`),
  CONSTRAINT `room_connector_ibfk_27` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `room_connector_ibfk_28` FOREIGN KEY (`room_accommodation_id`) REFERENCES `room_accommodation` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_connector`
--

LOCK TABLES `room_connector` WRITE;
/*!40000 ALTER TABLE `room_connector` DISABLE KEYS */;
INSERT INTO `room_connector` VALUES (58,NULL,14),(59,NULL,13),(60,1,9),(61,1,14);
/*!40000 ALTER TABLE `room_connector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_image`
--

DROP TABLE IF EXISTS `room_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) DEFAULT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `room_image_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=370 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_image`
--

LOCK TABLES `room_image` WRITE;
/*!40000 ALTER TABLE `room_image` DISABLE KEYS */;
INSERT INTO `room_image` VALUES (1,'apartment-bali-badung-citadines-executive-2-1.webp',1),(2,'apartment-bali-badung-citadines-onebedroom-3-1.webp',2),(3,'apartment-bali-badung-coast-onebedroom-3-1.webp',3),(4,'apartment-bali-badung-coast-studio-2-1.webp',4),(5,'apartment-bali-legian-suji-onebedroom-3-1.webp',5),(6,'apartment-bali-legian-suji-studioqueen-2-1.webp',6),(7,'apartment-bali-denpasar-thevinhill-ondebedroom-3-1.webp',7),(8,'apartment-bali-denpasar-thevinhill-standard-2-1.webp',8),(9,'guesthouse-bali-ubud-authenticvibes-superior-2-1.webp',9),(10,'guesthouse-bali-ubud-authenticvibes-twin-3-1.webp',10),(11,'guesthouse-bali-sukasada-fireplace-comfy-2-1.webp',11),(12,'guesthouse-bali-sukasada-fireplace-elegant-3-1.webp',12),(13,'guesthouse-bali-kuta-gardenmahe-large-3-1.webp',13),(14,'guesthouse-bali-kuta-gardenmahe-medium-2-1.webp',14),(15,'guesthouse-bali-kuta-melasti-king-3-1.webp',15),(16,'guesthouse-bali-kuta-melasti-master-2-1.webp',16),(17,'hotel-bali-kuta-aston-family-2-1.webp',17),(18,'hotel-bali-kuta-aston-premier-3-1.webp',18),(19,'hotel-bali-seminyak-potatohead-resident-3-1.webp',19),(20,'hotel-bali-seminyak-potatohead-studio-2-1.webp',20),(21,'hotel-bali-badung-swissbell-deluxe-2-1.webp',21),(22,'hotel-bali-badung-swissbell-suite-3-1.webp',22),(23,'hotel-bali-nusadua-theapurva-deluxe-2-1.webp',23),(24,'hotel-bali-nusadua-theapurva-juniorsuite-3-1.webp',24),(25,'villa-bali-ubud-hideaway-master-3-1.webp',25),(26,'villa-bali-ubud-hideaway-superiortwin-2-1.webp',26),(27,'villa-bali-ubud-stunning-master-3-1.webp',27),(28,'villa-bali-ubud-stunning-queen-2-1.webp',28),(29,'villa-bali-kuta-uluwatusurf-deluxe-3-1.webp',29),(30,'villa-bali-kuta-uluwatusurf-onebedroom-2-1.webp',30),(31,'villa-bali-kubutambahan-wisa-deluxe-2-1.webp',31),(32,'villa-bali-kubutambahan-wisa-superking-3-1.webp',32),(33,'apartment-bandung-buahbatu-emeraldapartel-deluxe-3-1.webp',33),(34,'apartment-bandung-buahbatu-emeraldapartel-onebedroom-2-1.webp',34),(35,'apartment-bandung-cicendo-gateway-onebedroom-3-1.webp',35),(36,'apartment-bandung-cicendo-gateway-studio-2-1.webp',36),(37,'apartment-bandung-antapani-tamansarinarel-onebedroom-3-1.webp',37),(38,'apartment-bandung-antapani-tamansarinarel-studio-2-1.webp',38),(39,'apartment-bandung-batununggal-thesuitesmetro-onebedroom-3-1.webp',39),(40,'apartment-bandung-batununggal-thesuitesmetro-studio-2-1.webp',40),(41,'guesthouse-bandung-cimenyan-incognito-master-2-1.webp',41),(42,'guesthouse-bandung-cimenyan-incognito-twin-3-1.webp',42),(43,'guesthouse-bandung-dagopakar-jendelapakar-king-3-1.webp',43),(44,'guesthouse-bandung-dagopakar-jendelapakar-superking-2-1.webp',44),(45,'guesthouse-bandung-dago-syllo2-king-3-1.webp',45),(46,'guesthouse-bandung-dago-syllo2-queen-2-1.webp',46),(47,'guesthouse-bandung-cimenyan-yucca-master-2-1.webp',47),(48,'guesthouse-bandung-cimenyan-yucca-twin-3-1.webp',48),(49,'hotel-bandung-setiabudi-gaia-club-3-1.webp',49),(50,'hotel-bandung-setiabudi-gaia-deluxe-2-1.webp',50),(51,'hotel-bandung-pasirkaliki-hilton-deluxe-3-1.webp',51),(52,'hotel-bandung-pasirkaliki-hilton-queen-2-1.webp',52),(53,'hotel-bandung-dagopakar-intercontinental-standard-2-1.webp',53),(54,'hotel-bandung-dagopakar-intercontinental-twin-3-1.webp',54),(55,'hotel-bandung-juanda-marriot-king-3-1.webp',55),(56,'hotel-bandung-juanda-marriot-twinbed-2-1.webp',56),(57,'villa-bandung-dago-bumiandung-king-3-1.webp',57),(58,'villa-bandung-dago-bumiandung-queen-2-1.webp',58),(59,'villa-bandung-lembang-derossa-lite-3-1.webp',59),(60,'villa-bandung-lembang-derossa-superior-2-1.webp',60),(61,'villa-bandung-ciater-miracle-queen-3-1.webp',61),(62,'villa-bandung-ciater-miracle-suite-2-1.webp',62),(63,'villa-bandung-cibodas-thelodge-campervan-2-1.webp',63),(64,'villa-bandung-cibodas-thelodge-superior-3-1.webp',64),(65,'apartment-jakarta-karet-batavia-deluxe-3-1.webp',65),(66,'apartment-jakarta-karet-batavia-superior-2-1.webp',66),(67,'apartment-jakarta-kbybaru-botanica-master-2-1.webp',67),(68,'apartment-jakarta-kbybaru-botanica-secondary-3-1.webp',68),(69,'apartment-jakarta-gandaria-gandariaheights-master-3-1.webp',69),(70,'apartment-jakarta-gandaria-gandariaheights-secondary-2-1.webp',70),(71,'apartment-jakarta-jatinegara-thehive-primary-3-1.webp',71),(72,'apartment-jakarta-jatinegara-thehive-secondary-2-1.webp',72),(73,'guesthouse-jakarta-senayan-mkhouse-double-2-1.webp',73),(74,'guesthouse-jakarta-senayan-mkhouse-queen-3-1.webp',74),(75,'guesthouse-jakarta-rempoa-rumahbumi-single-2-1.jpg',75),(76,'guesthouse-jakarta-rempoa-rumahbumi-singlelong-3-1.jpg',76),(77,'guesthouse-jakarta-durensawit-rumahperdana-adult-3-1.webp',77),(78,'guesthouse-jakarta-durensawit-rumahperdana-kid-2-1.webp',78),(79,'guesthouse-jakarta-kembangan-westhouse-master-2-1.webp',79),(80,'guesthouse-jakarta-kembangan-westhouse-suite-3-1.webp',80),(81,'hotel-jakarta-mangkuluhur-artotel-king-3-1.webp',81),(82,'hotel-jakarta-mangkuluhur-artotel-twin-2-1.webp',82),(83,'hotel-jakarta-pasarbaru-borobudur-clubsuite-3-1.webp',83),(84,'hotel-jakarta-pasarbaru-borobudur-twin-2-1.webp',84),(85,'hotel-jakarta-senayan-mulia-juniorsuite-3-1.webp',85),(86,'hotel-jakarta-senayan-mulia-signature-2-1.webp',86),(87,'hotel-jakarta-sudirman-thelangham-deluxeking-2-1.webp',87),(88,'hotel-jakarta-sudirman-thelangham-skylineking-3-1.webp',88),(89,'villa-jakarta-kbybaru-kasandra-family-2-1.webp',89),(90,'villa-jakarta-kbybaru-kasandra-king-3-1.webp',90),(91,'villa-jakarta-pondokaren-littlebali-master-2-1.webp',91),(92,'villa-jakarta-pondokaren-littlebali-masterpavilion-3-1.webp',92),(93,'villa-jakarta-pesanggrahan-nuri-queen-3-1.webp',93),(94,'villa-jakarta-pesanggrahan-nuri-twin-2-1.webp',94),(95,'villa-jakarta-pesanggrahan-rumatata-master-2-1.webp',95),(96,'villa-jakarta-pesanggrahan-rumatata-suite-3-1.jpeg',96),(97,'apartment-surabaya-dukuhpakis-ciputra-masterking-2-1.webp',97),(98,'apartment-surabaya-dukuhpakis-ciputra-single-3-1.webp',98),(99,'apartment-surabaya-sambikerep-orchard-primary-2-1.webp',99),(100,'apartment-surabaya-sambikerep-orchard-secondary-3-1.webp',100),(101,'apartment-surabaya-wiyung-pakuwon-main-2-1.webp',101),(102,'apartment-surabaya-wiyung-pakuwon-single-3-1.webp',102),(103,'apartment-surabaya-wiyung-rosebay-master-2-1.webp',103),(104,'apartment-surabaya-wiyung-rosebay-secondary-3-1.webp',104),(105,'guesthouse-surabaya-asemrowo-ayyub-king-3-1.webp',105),(106,'guesthouse-surabaya-asemrowo-ayyub-master-2-1.webp',106),(107,'guesthouse-surabaya-lakarsantri-cheerful-master-2-1.webp',107),(108,'guesthouse-surabaya-lakarsantri-cheerful-single-3-1.webp',108),(109,'guesthouse-surabaya-wonokromo-kebonsari-king-3-1.webp',109),(110,'guesthouse-surabaya-wonokromo-kebonsari-twin-2-1.webp',110),(111,'guesthouse-surabaya-sambikerep-natura-king-2-1.webp',111),(112,'guesthouse-surabaya-sambikerep-natura-single-3-1.jpeg',112),(113,'hotel-surabaya-genteng-doubletree-deluxe-2-1.webp',113),(114,'hotel-surabaya-genteng-doubletree-suite-3-1.webp',114),(115,'hotel-surabaya-sawahan-shangrila-horizon-3-1.webp',115),(116,'hotel-surabaya-sawahan-shangrila-twindeluxe-2-1.webp',116),(117,'hotel-surabaya-sukomanunggal-vasa-executive-3-1.webp',117),(118,'hotel-surabaya-sukomanunggal-vasa-twin-2-1.webp',118),(119,'hotel-surabaya-genteng-wyndam-deluxeking-2-1.webp',119),(120,'hotel-surabaya-genteng-wyndam-executive-3-1.webp',120),(121,'villa-surabaya-sambikerep-esayuri-double-3-1.jpeg',121),(122,'villa-surabaya-sambikerep-esayuri-master-2-1.webp',122),(123,'villa-surabaya-sukolilo-kertajaya-premier-2-1.webp',123),(124,'villa-surabaya-sukolilo-kertajaya-premierplus-3-1.webp',124),(125,'villa-surabaya-dukuhpakis-raka-queen-3-1.webp',125),(126,'villa-surabaya-dukuhpakis-raka-twin-2-1.webp',126),(127,'villa-surabaya-tandes-rumamanis-main-2-1.webp',127),(128,'villa-surabaya-tandes-rumamanis-single-3-1.jpeg',128),(129,'apartment-yogyakarta-depok-jowoklutuk-studio-2-1.webp',129),(130,'apartment-yogyakarta-depok-jowoklutuk-studioplus-3-1.webp',130),(131,'apartment-yogyakarta-merapi-roten-primary-2-1.webp',131),(132,'apartment-yogyakarta-merapi-roten-secondary-3-1.webp',132),(133,'apartment-yogyakarta-depok-studentcastle-studioeast-2-1.webp',133),(134,'apartment-yogyakarta-depok-studentcastle-studiowest-3-1.webp',134),(135,'apartment-yogyakarta-depok-v-master-2-1.webp',135),(136,'apartment-yogyakarta-depok-v-secondary-3-1.webp',136),(137,'guesthouse-yogyakarta-depok-chipmunk-mainroom-2-1.webp',137),(138,'guesthouse-yogyakarta-depok-chipmunk-second-3-1.webp',138),(139,'guesthouse-yogyakarta-depok-omahtentrem-family-3-1.webp',139),(140,'guesthouse-yogyakarta-depok-omahtentrem-master-2-1.webp',140),(141,'guesthouse-yogyakarta-kasihan-riverside-master-2-1.webp',141),(142,'guesthouse-yogyakarta-kasihan-riverside-queen-3-1.webp',142),(143,'guesthouse-yogyakarta-sewon-tasteful-master-2-1.webp',143),(144,'guesthouse-yogyakarta-sewon-tasteful-secondary-3-1.webp',144),(145,'hotel-yogyakarta-adisucipto-ambarrukmo-executive-3-1.webp',145),(146,'hotel-yogyakarta-adisucipto-ambarrukmo-junior-2-1.webp',146),(147,'hotel-yogyakarta-malioboro-elroyale-deluxeking-2-1.webp',147),(148,'hotel-yogyakarta-malioboro-elroyale-executiveking-3-1.webp',148),(149,'hotel-yogyakarta-ngaglik-hyatt-king-2-1.webp',149),(150,'hotel-yogyakarta-ngaglik-hyatt-twin-3-1.webp',150),(151,'hotel-yogyakarta-depok-lafayette-president-2-1.webp',151),(152,'hotel-yogyakarta-depok-lafayette-suite-3-1.webp',152),(153,'villa-yogyakarta-kasihan-portum-deluxe-3-1.jpeg',153),(154,'villa-yogyakarta-kasihan-portum-paviliun-2-1.webp',154),(155,'villa-yogyakarta-mlati-teduh-master-2-1.webp',155),(156,'villa-yogyakarta-mlati-teduh-twin-3-1.webp',156),(157,'villa-yogyakarta-sewon-tembi-master-2-1.webp',157),(158,'villa-yogyakarta-sewon-tembi-secondary-3-1.webp',158),(159,'villa-yogyakarta-depok-tibra-master-2-1.webp',159),(160,'villa-yogyakarta-depok-tibra-secondary-3-1.webp',160),(161,'apartment-bali-badung-citadines-executive-2-2.webp',1),(162,'apartment-bali-badung-citadines-onebedroom-3-2.webp',2),(163,'apartment-bali-badung-coast-onebedroom-3-2.webp',3),(164,'apartment-bali-badung-coast-studio-2-2.webp',4),(165,'apartment-bali-legian-suji-onebedroom-3-2.webp',5),(166,'apartment-bali-legian-suji-studioqueen-2-2.webp',6),(167,'apartment-bali-denpasar-thevinhill-ondebedroom-3-2.webp',7),(168,'apartment-bali-denpasar-thevinhill-standard-2-2.webp',8),(169,'guesthouse-bali-ubud-authenticvibes-superior-2-2.webp',9),(170,'guesthouse-bali-ubud-authenticvibes-twin-3-2.webp',10),(171,'guesthouse-bali-sukasada-fireplace-comfy-2-2.jpeg',11),(172,'guesthouse-bali-sukasada-fireplace-elegant-3-2.webp',12),(173,'guesthouse-bali-kuta-gardenmahe-large-3-2.webp',13),(174,'guesthouse-bali-kuta-gardenmahe-medium-2-2.webp',14),(175,'guesthouse-bali-kuta-melasti-king-3-2.webp',15),(176,'guesthouse-bali-kuta-melasti-master-2-2.webp',16),(177,'hotel-bali-kuta-aston-family-2-2.webp',17),(178,'hotel-bali-kuta-aston-premier-3-2.webp',18),(179,'hotel-bali-seminyak-potatohead-resident-3-2.webp',19),(180,'hotel-bali-seminyak-potatohead-studio-2-2.webp',20),(181,'hotel-bali-badung-swissbell-deluxe-2-2.webp',21),(182,'hotel-bali-badung-swissbell-suite-3-2.webp',22),(183,'hotel-bali-nusadua-theapurva-deluxe-2-2.webp',23),(184,'hotel-bali-nusadua-theapurva-juniorsuite-3-2.webp',24),(185,'villa-bali-ubud-hideaway-master-3-2.webp',25),(186,'villa-bali-ubud-hideaway-superiortwin-2-2.webp',26),(187,'villa-bali-ubud-stunning-master-3-2.webp',27),(188,'villa-bali-ubud-stunning-queen-2-2.webp',28),(189,'villa-bali-kuta-uluwatusurf-deluxe-3-2.webp',29),(190,'villa-bali-kuta-uluwatusurf-onebedroom-2-2.webp',30),(191,'villa-bali-kubutambahan-wisa-deluxe-2-2.webp',31),(192,'villa-bali-kubutambahan-wisa-superking-3-2.webp',32),(193,'apartment-bandung-buahbatu-emeraldapartel-deluxe-3-2.webp',33),(194,'apartment-bandung-buahbatu-emeraldapartel-onebedroom-2-2.webp',34),(195,'apartment-bandung-cicendo-gateway-onebedroom-3-2.webp',35),(196,'apartment-bandung-cicendo-gateway-studio-2-2.webp',36),(197,'apartment-bandung-antapani-tamansarinarel-onebedroom-3-2.webp',37),(198,'apartment-bandung-antapani-tamansarinarel-studio-2-2.webp',38),(199,'apartment-bandung-batununggal-thesuitesmetro-onebedroom-3-2.webp',39),(200,'apartment-bandung-batununggal-thesuitesmetro-studio-2-2.webp',40),(201,'guesthouse-bandung-cimenyan-incognito-master-2-2.webp',41),(202,'guesthouse-bandung-cimenyan-incognito-twin-3-2.webp',42),(203,'guesthouse-bandung-dagopakar-jendelapakar-king-3-2.webp',43),(204,'guesthouse-bandung-dagopakar-jendelapakar-superking-2-2.webp',44),(205,'guesthouse-bandung-dago-syllo2-king-3-2.webp',45),(206,'guesthouse-bandung-dago-syllo2-queen-2-2.webp',46),(207,'guesthouse-bandung-cimenyan-yucca-master-2-2.webp',47),(208,'guesthouse-bandung-cimenyan-yucca-twin-3-2.webp',48),(209,'hotel-bandung-setiabudi-gaia-club-3-2.webp',49),(210,'hotel-bandung-setiabudi-gaia-deluxe-2-2.webp',50),(211,'hotel-bandung-pasirkaliki-hilton-deluxe-3-2.webp',51),(212,'hotel-bandung-pasirkaliki-hilton-queen-2-2.webp',52),(213,'hotel-bandung-dagopakar-intercontinental-standard-2-2.webp',53),(214,'hotel-bandung-dagopakar-intercontinental-twin-3-2.webp',54),(215,'hotel-bandung-juanda-marriot-king-3-2.webp',55),(216,'hotel-bandung-juanda-marriot-twinbed-2-2.webp',56),(217,'villa-bandung-dago-bumiandung-king-3-2.webp',57),(218,'villa-bandung-dago-bumiandung-queen-2-2.webp',58),(219,'villa-bandung-lembang-derossa-lite-3-2.webp',59),(220,'villa-bandung-lembang-derossa-superior-2-2.webp',60),(221,'villa-bandung-ciater-miracle-queen-3-2.webp',61),(222,'villa-bandung-ciater-miracle-suite-2-2.webp',62),(223,'villa-bandung-cibodas-thelodge-campervan-2-2.webp',63),(224,'villa-bandung-cibodas-thelodge-superior-3-2.webp',64),(225,'apartment-jakarta-karet-batavia-deluxe-3-2.webp',65),(226,'apartment-jakarta-karet-batavia-superior-2-2.webp',66),(227,'apartment-jakarta-kbybaru-botanica-master-2-2.webp',67),(228,'apartment-jakarta-kbybaru-botanica-secondary-3-2.webp',68),(229,'apartment-jakarta-gandaria-gandariaheights-master-3-2.webp',69),(230,'apartment-jakarta-gandaria-gandariaheights-secondary-2-2.webp',70),(231,'apartment-jakarta-jatinegara-thehive-primary-3-2.webp',71),(232,'apartment-jakarta-jatinegara-thehive-secondary-2-2.webp',72),(233,'guesthouse-jakarta-senayan-mkhouse-double-2-2.webp',73),(234,'guesthouse-jakarta-senayan-mkhouse-queen-3-2.webp',74),(235,'guesthouse-jakarta-rempoa-rumahbumi-single-2-2.jpg',75),(236,'guesthouse-jakarta-rempoa-rumahbumi-singlelong-3-2.jpg',76),(237,'guesthouse-jakarta-durensawit-rumahperdana-adult-3-2.webp',77),(238,'guesthouse-jakarta-durensawit-rumahperdana-kid-2-2.webp',78),(239,'guesthouse-jakarta-kembangan-westhouse-master-2-2.webp',79),(240,'guesthouse-jakarta-kembangan-westhouse-suite-3-2.webp',80),(241,'hotel-jakarta-mangkuluhur-artotel-king-3-2.webp',81),(242,'hotel-jakarta-mangkuluhur-artotel-twin-2-2.webp',82),(243,'hotel-jakarta-pasarbaru-borobudur-clubsuite-3-2.webp',83),(244,'hotel-jakarta-pasarbaru-borobudur-twin-2-2.webp',84),(245,'hotel-jakarta-senayan-mulia-juniorsuite-3-2.webp',85),(246,'hotel-jakarta-senayan-mulia-signature-2-2.webp',86),(247,'hotel-jakarta-sudirman-thelangham-deluxeking-2-2.webp',87),(248,'hotel-jakarta-sudirman-thelangham-skylineking-3-2.webp',88),(249,'villa-jakarta-kbybaru-kasandra-family-2-2.webp',89),(250,'villa-jakarta-kbybaru-kasandra-king-3-2.webp',90),(251,'villa-jakarta-pondokaren-littlebali-master-2-2.webp',91),(252,'villa-jakarta-pondokaren-littlebali-masterpavilion-3-2.webp',92),(253,'villa-jakarta-pesanggrahan-nuri-queen-3-2.webp',93),(254,'villa-jakarta-pesanggrahan-nuri-twin-2-2.webp',94),(255,'villa-jakarta-pesanggrahan-rumatata-master-2-2.webp',95),(256,'villa-jakarta-pesanggrahan-rumatata-suite-3-2.jpeg',96),(257,'apartment-surabaya-dukuhpakis-ciputra-masterking-2-2.webp',97),(258,'apartment-surabaya-dukuhpakis-ciputra-single-3-2.webp',98),(259,'apartment-surabaya-sambikerep-orchard-primary-2-2.webp',99),(260,'apartment-surabaya-sambikerep-orchard-secondary-3-2.webp',100),(261,'apartment-surabaya-wiyung-pakuwon-main-2-2.webp',101),(262,'apartment-surabaya-wiyung-pakuwon-single-3-2.webp',102),(263,'apartment-surabaya-wiyung-rosebay-master-2-2.webp',103),(264,'apartment-surabaya-wiyung-rosebay-secondary-3-2.webp',104),(265,'guesthouse-surabaya-asemrowo-ayyub-king-3-2.webp',105),(266,'guesthouse-surabaya-asemrowo-ayyub-master-2-2.webp',106),(267,'guesthouse-surabaya-lakarsantri-cheerful-master-2-2.webp',107),(268,'guesthouse-surabaya-lakarsantri-cheerful-single-3-2.webp',108),(269,'guesthouse-surabaya-wonokromo-kebonsari-king-3-2.webp',109),(270,'guesthouse-surabaya-wonokromo-kebonsari-twin-2-2.webp',110),(271,'guesthouse-surabaya-sambikerep-natura-king-2-2.webp',111),(272,'guesthouse-surabaya-sambikerep-natura-single-3-2.jpeg',112),(273,'hotel-surabaya-genteng-doubletree-deluxe-2-2.webp',113),(274,'hotel-surabaya-genteng-doubletree-suite-3-2.webp',114),(275,'hotel-surabaya-sawahan-shangrila-horizon-3-2.webp',115),(276,'hotel-surabaya-sawahan-shangrila-twindeluxe-2-2.webp',116),(277,'hotel-surabaya-sukomanunggal-vasa-executive-3-2.webp',117),(278,'hotel-surabaya-sukomanunggal-vasa-twin-2-2.webp',118),(279,'hotel-surabaya-genteng-wyndam-deluxeking-2-2.webp',119),(280,'hotel-surabaya-genteng-wyndam-executive-3-2.webp',120),(281,'villa-surabaya-sambikerep-esayuri-double-3-2.jpeg',121),(282,'villa-surabaya-sambikerep-esayuri-master-2-2.webp',122),(283,'villa-surabaya-sukolilo-kertajaya-premier-2-2.webp',123),(284,'villa-surabaya-sukolilo-kertajaya-premierplus-3-2.webp',124),(285,'villa-surabaya-dukuhpakis-raka-queen-3-2.webp',125),(286,'villa-surabaya-dukuhpakis-raka-twin-2-2.webp',126),(287,'villa-surabaya-tandes-rumamanis-main-2-2.webp',127),(288,'villa-surabaya-tandes-rumamanis-single-3-2.jpeg',128),(289,'apartment-yogyakarta-depok-jowoklutuk-studio-2-2.webp',129),(290,'apartment-yogyakarta-depok-jowoklutuk-studioplus-3-2.webp',130),(291,'apartment-yogyakarta-merapi-roten-primary-2-2.webp',131),(292,'apartment-yogyakarta-merapi-roten-secondary-3-2.webp',132),(293,'apartment-yogyakarta-depok-studentcastle-studioeast-2-2.webp',133),(294,'apartment-yogyakarta-depok-studentcastle-studiowest-3-2.webp',134),(295,'apartment-yogyakarta-depok-v-master-2-2.webp',135),(296,'apartment-yogyakarta-depok-v-secondary-3-2.webp',136),(297,'guesthouse-yogyakarta-depok-chipmunk-mainroom-2-2.webp',137),(298,'guesthouse-yogyakarta-depok-chipmunk-second-3-2.webp',138),(299,'guesthouse-yogyakarta-depok-omahtentrem-family-3-2.webp',139),(300,'guesthouse-yogyakarta-depok-omahtentrem-master-2-2.webp',140),(301,'guesthouse-yogyakarta-kasihan-riverside-master-2-2.webp',141),(302,'guesthouse-yogyakarta-kasihan-riverside-queen-3-2.webp',142),(303,'guesthouse-yogyakarta-sewon-tasteful-master-2-2.webp',143),(304,'guesthouse-yogyakarta-sewon-tasteful-secondary-3-2.webp',144),(305,'hotel-yogyakarta-adisucipto-ambarrukmo-executive-3-2.webp',145),(306,'hotel-yogyakarta-adisucipto-ambarrukmo-junior-2-2.webp',146),(307,'hotel-yogyakarta-malioboro-elroyale-deluxeking-2-2.webp',147),(308,'hotel-yogyakarta-malioboro-elroyale-executiveking-3-2.webp',148),(309,'hotel-yogyakarta-ngaglik-hyatt-king-2-2.webp',149),(310,'hotel-yogyakarta-ngaglik-hyatt-twin-3-2.webp',150),(311,'hotel-yogyakarta-depok-lafayette-president-2-2.webp',151),(312,'hotel-yogyakarta-depok-lafayette-suite-3-2.webp',152),(313,'villa-yogyakarta-kasihan-portum-deluxe-3-2.jpeg',153),(314,'villa-yogyakarta-kasihan-portum-paviliun-2-2.webp',154),(315,'villa-yogyakarta-mlati-teduh-master-2-2.webp',155),(316,'villa-yogyakarta-mlati-teduh-twin-3-2.webp',156),(317,'villa-yogyakarta-sewon-tembi-master-2-2.webp',157),(318,'villa-yogyakarta-sewon-tembi-secondary-3-2.webp',158),(319,'villa-yogyakarta-depok-tibra-master-2-2.webp',159),(320,'villa-yogyakarta-depok-tibra-secondary-3-2.webp',160);
/*!40000 ALTER TABLE `room_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Confirmed'),(2,'Paid'),(3,'Cancel'),(4,'Waiting Payment'),(5,'On Going'),(6,'Stop'),(7,'Waiting Approval'),(8,'Rejected'),(9,'Disabled By Tenant');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tenant`
--

DROP TABLE IF EXISTS `tenant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tenant` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `picture_path` text,
  `email` varchar(250) NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `phone_number` bigint NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'unconfirmed',
  `otp_code` int DEFAULT NULL,
  `otp_created_at` datetime NOT NULL,
  `ktp_path` text,
  `role` varchar(50) NOT NULL DEFAULT 'tenant',
  `users_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tenant_email_unique` (`email`),
  KEY `users_id` (`users_id`),
  CONSTRAINT `tenant_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tenant`
--

LOCK TABLES `tenant` WRITE;
/*!40000 ALTER TABLE `tenant` DISABLE KEYS */;
INSERT INTO `tenant` VALUES ('1','Gilang','Ramadhan','','tenantmaster@gmail.com','JI. Cemara Raya Blok 27 No. 4 Perumnas 1 RT/RW 04 07 Kelurahan Karawaci Baru,  Kecamatan Karawaci Kota Tangerang 15116','$2b$10$i2X7fpOEwKB7FgxogsUEKeOvLg7jqiWi/72ifteKqNsWRBcjeye2m',82213738218,'confirmed',14356,'2023-02-21 14:16:48','available','tenant',NULL,'2023-02-21 14:16:48','2023-03-22 04:12:08'),('1c6c05e4-c4d8-449d-99ba-399cf1115724','lecturer','tester',NULL,'lecturer@gmail.com',NULL,'$2b$10$1tIEeHBo0S762ejr92nTcOXyCgpScZOSBusr9L70hLulafUWVFz76',8888888888,'confirmed',18708,'2023-04-03 20:25:26','Public/images/PIMG-1680528326334394680986.png','tenant',NULL,'2023-04-03 20:25:26','2023-04-03 20:29:51'),('2','anjar','jtp','','tester123@gmail.com','jauh juga','tes12345',8888,'confirmed',12345,'2023-02-21 14:16:48','','tenant',NULL,'2023-02-21 14:16:48','2023-02-21 14:16:48'),('615ae9d6-6b38-426d-88cb-0d9136249a40','ginanjar','jtp',NULL,'ginanjar@gmail.com',NULL,'$2b$10$vI2WSP7Pw1ATKP3KOo1G1.21jWgO0j/IOS4botw2i95dvCpLPj/v6',888888888888,'confirmed',15670,'2023-03-20 04:13:38','Public/images/PIMG-1679285618822753513621.png','tenant',NULL,'2023-03-20 04:13:38','2023-03-20 04:13:38'),('83bf2df0-e1d0-462c-a3cd-84df9bfb624f','Gilang','Ramadhan',NULL,'gilang.ramadhan011297@gmail.com',NULL,'$2b$10$zTPO5hDB2k3HeVWFPUrNQ.1NQa8YwF94C/nAlRN8fTfd0u9s3OXPi',88888888,'confirmed',13186,'2023-03-29 19:32:30','Public/images/PIMG-1680093150033490281508.png','tenant',NULL,'2023-03-29 19:32:30','2023-03-29 19:34:06');
/*!40000 ALTER TABLE `tenant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tenant_details`
--

DROP TABLE IF EXISTS `tenant_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tenant_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture_path` text,
  `tenant_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `tenant_details_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tenant_details`
--

LOCK TABLES `tenant_details` WRITE;
/*!40000 ALTER TABLE `tenant_details` DISABLE KEYS */;
INSERT INTO `tenant_details` VALUES (1,'','1'),(3,NULL,'2'),(4,'Public/images/PIMG-1679113719914872300549.png',NULL),(5,NULL,'615ae9d6-6b38-426d-88cb-0d9136249a40'),(6,NULL,'83bf2df0-e1d0-462c-a3cd-84df9bfb624f'),(7,NULL,'1c6c05e4-c4d8-449d-99ba-399cf1115724');
/*!40000 ALTER TABLE `tenant_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `room_id` int NOT NULL,
  `status_id` int NOT NULL DEFAULT '4',
  `total_price` int NOT NULL,
  `check_in` datetime NOT NULL,
  `check_out` datetime NOT NULL,
  `expired` datetime NOT NULL,
  `image_path` text,
  `total_guest` int NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `transactions_ibfk_31` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `transactions_ibfk_32` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (65,'5890b6f4-54fb-4877-8d00-92e7727913e0',1,2,2100000,'2023-03-17 00:00:00','2023-03-20 00:00:00','2023-03-17 15:56:02','Public/images/PIMG-1679061395941509826873.png',2,'20230317208438','2023-03-17 13:56:02','2023-03-20 17:49:58'),(66,'5890b6f4-54fb-4877-8d00-92e7727913e0',1,7,2100000,'2023-03-17 00:00:00','2023-03-20 00:00:00','2023-03-17 15:56:02','Public/images/PIMG-1679061395941509826873.png',2,'20230317202354','2023-03-17 13:56:02','2023-03-17 13:56:35'),(67,'9beaa852-6017-4127-8dba-6c7d0f147184',18,7,1500000,'2023-03-19 00:00:00','2023-03-22 00:00:00','2023-03-18 06:32:20','Public/images/PIMG-1679115203359774148783.png',2,'2023031811334','2023-03-18 04:32:20','2023-03-18 04:53:23'),(68,'9beaa852-6017-4127-8dba-6c7d0f147184',1,4,4900000,'2023-03-24 00:00:00','2023-03-31 00:00:00','2023-03-18 08:55:07',NULL,1,'20230318139891','2023-03-18 06:55:07','2023-03-18 06:55:07'),(69,'9beaa852-6017-4127-8dba-6c7d0f147184',3,4,1500000,'2023-03-19 00:00:00','2023-03-22 00:00:00','2023-03-18 08:55:41',NULL,2,'20230318139229','2023-03-18 06:55:41','2023-03-18 06:55:41'),(70,'9beaa852-6017-4127-8dba-6c7d0f147184',3,3,1500000,'2023-03-19 00:00:00','2023-03-22 00:00:00','2023-03-18 08:55:41',NULL,2,'20230318132328','2023-03-18 06:55:41','2023-03-19 16:02:01'),(71,'9beaa852-6017-4127-8dba-6c7d0f147184',28,4,6500000,'2023-03-18 00:00:00','2023-03-31 00:00:00','2023-03-18 16:25:12',NULL,2,'20230318211454','2023-03-18 14:25:12','2023-03-18 14:25:12'),(72,'9beaa852-6017-4127-8dba-6c7d0f147184',28,4,6500000,'2023-03-18 00:00:00','2023-03-31 00:00:00','2023-03-18 16:25:12',NULL,2,'20230318211915','2023-03-18 14:25:12','2023-03-18 14:25:12'),(73,'9beaa852-6017-4127-8dba-6c7d0f147184',12,3,1500000,'2023-03-26 00:00:00','2023-03-29 00:00:00','2023-03-19 19:21:45',NULL,1,'20230320003072','2023-03-19 17:21:45','2023-03-19 18:31:28'),(75,'9beaa852-6017-4127-8dba-6c7d0f147184',4,3,1500000,'2023-03-20 00:00:00','2023-03-23 00:00:00','2023-03-19 20:37:32',NULL,2,'20230320012163','2023-03-19 18:37:32','2023-03-19 18:49:21'),(76,'5890b6f4-54fb-4877-8d00-92e7727913e0',6,2,500000,'2023-03-20 00:00:00','2023-03-21 00:00:00','2023-03-20 17:12:47','Public/images/PIMG-1679326812292567511937.png',1,'2023032022548','2023-03-20 15:12:47','2023-03-21 04:39:42'),(77,'5890b6f4-54fb-4877-8d00-92e7727913e0',5,3,2000000,'2023-03-21 00:00:00','2023-03-25 00:00:00','2023-03-21 06:29:51',NULL,2,'2023032111524','2023-03-21 04:29:51','2023-03-21 04:30:52'),(78,'5890b6f4-54fb-4877-8d00-92e7727913e0',5,3,2000000,'2023-03-21 00:00:00','2023-03-25 00:00:00','2023-03-21 06:29:51',NULL,2,'20230321114584','2023-03-21 04:29:51','2023-03-21 04:30:52'),(79,'5890b6f4-54fb-4877-8d00-92e7727913e0',10,7,1500000,'2023-03-21 00:00:00','2023-03-24 00:00:00','2023-03-21 06:31:16','Public/images/PIMG-1679373097774505877825.png',2,'20230321111912','2023-03-21 04:31:16','2023-03-21 04:31:37'),(90,'0857535a-e1d8-4d73-977b-49ec64d6213d',3,2,3500000,'2023-03-22 07:00:00','2023-03-29 07:00:00','2023-03-22 13:31:58','Public/images/PIMG-1679462589907861651196.png',1,'20230322119281','2023-03-22 11:31:58','2023-03-22 15:05:51'),(91,'5890b6f4-54fb-4877-8d00-92e7727913e0',2,3,450000,'2023-03-27 00:00:00','2023-03-28 00:00:00','2023-03-28 01:08:32',NULL,1,'20230327236598','2023-03-27 23:08:32','2023-03-27 23:23:03'),(92,'5890b6f4-54fb-4877-8d00-92e7727913e0',1,2,1050000,'2023-03-28 00:00:00','2023-04-01 00:00:00','2023-03-30 02:29:36',NULL,2,'20230330006295','2023-03-30 00:29:36','2023-03-30 00:29:48'),(94,'5890b6f4-54fb-4877-8d00-92e7727913e0',1,3,630000,'2023-04-12 00:00:00','2023-04-13 00:00:00','2023-03-31 00:09:21',NULL,2,'20230330227291','2023-03-30 22:09:21','2023-03-30 22:09:42'),(95,'5890b6f4-54fb-4877-8d00-92e7727913e0',1,3,630000,'2023-04-12 00:00:00','2023-04-13 00:00:00','2023-03-31 00:09:21',NULL,2,'20230330228869','2023-03-30 22:09:21','2023-03-30 22:09:42'),(96,'578c2b80-0582-48fd-81e4-350c54d5ea03',160,3,900000,'2023-04-01 00:00:00','2023-04-04 00:00:00','2023-04-01 12:00:20',NULL,1,'20230401104179','2023-04-01 10:00:20','2023-04-01 10:00:50'),(97,'578c2b80-0582-48fd-81e4-350c54d5ea03',160,3,2100000,'2023-04-01 00:00:00','2023-04-08 00:00:00','2023-04-01 12:01:50',NULL,1,'20230401105976','2023-04-01 10:01:50','2023-04-01 10:04:47'),(98,'578c2b80-0582-48fd-81e4-350c54d5ea03',125,3,1000000,'2023-04-01 00:00:00','2023-04-03 00:00:00','2023-04-02 00:32:33',NULL,1,'2023040122670','2023-04-01 22:32:33','2023-04-01 22:42:41');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions_history`
--

DROP TABLE IF EXISTS `transactions_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transactions_id` int NOT NULL,
  `status_id` int NOT NULL DEFAULT '4',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transactions_id` (`transactions_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `transactions_history_ibfk_31` FOREIGN KEY (`transactions_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transactions_history_ibfk_32` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions_history`
--

LOCK TABLES `transactions_history` WRITE;
/*!40000 ALTER TABLE `transactions_history` DISABLE KEYS */;
INSERT INTO `transactions_history` VALUES (63,65,8,'2023-03-17 13:56:02','2023-03-20 17:49:58'),(64,66,4,'2023-03-17 13:56:02','2023-03-17 13:56:02'),(65,67,4,'2023-03-18 04:32:20','2023-03-18 04:32:20'),(66,68,4,'2023-03-18 06:55:07','2023-03-18 06:55:07'),(67,69,4,'2023-03-18 06:55:41','2023-03-18 06:55:41'),(68,70,4,'2023-03-18 06:55:41','2023-03-18 06:55:41'),(69,71,4,'2023-03-18 14:25:12','2023-03-18 14:25:12'),(70,72,4,'2023-03-18 14:25:12','2023-03-18 14:25:12'),(71,73,4,'2023-03-19 17:21:45','2023-03-19 17:21:45'),(73,75,4,'2023-03-19 18:37:32','2023-03-19 18:37:32'),(74,76,2,'2023-03-20 15:12:47','2023-03-21 04:39:42'),(75,77,4,'2023-03-21 04:29:51','2023-03-21 04:29:51'),(76,78,4,'2023-03-21 04:29:51','2023-03-21 04:29:51'),(77,79,4,'2023-03-21 04:31:16','2023-03-21 04:31:16'),(88,90,2,'2023-03-22 11:31:58','2023-03-22 15:05:51'),(89,91,4,'2023-03-27 23:08:32','2023-03-27 23:08:32'),(90,92,4,'2023-03-30 00:29:36','2023-03-30 00:29:36'),(92,94,4,'2023-03-30 22:09:21','2023-03-30 22:09:21'),(93,95,4,'2023-03-30 22:09:21','2023-03-30 22:09:21'),(94,96,4,'2023-04-01 10:00:20','2023-04-01 10:00:20'),(95,97,4,'2023-04-01 10:01:50','2023-04-01 10:01:50'),(96,98,4,'2023-04-01 22:32:33','2023-04-01 22:32:33');
/*!40000 ALTER TABLE `transactions_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Apartment'),(2,'Guest House'),(3,'Hotel'),(4,'Villa');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'unconfirmed',
  `email` varchar(250) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `phone_number` bigint DEFAULT NULL,
  `otp_code` int DEFAULT NULL,
  `otp_created_at` datetime DEFAULT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `isFromGoogle` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0857535a-e1d8-4d73-977b-49ec64d6213d','Marcus','Ramadhan','confirmed','marcusrashford@emyu.com','$2b$10$7ZxIenQOLTvQztz28.a/W.qtM7/gdbKewp6aKjJfZEa6CAg5QbeIe',8212121212,13984,'2023-03-21 16:13:41','user','2023-03-21 16:13:41','2023-03-26 00:00:33',NULL,0),('367c3ca1-8ab4-404f-a7d7-abdbde1d7617','tester123','tester134123','confirmed','tester12321312@gmail.com','$2b$10$Zw7lqQuIQHWHtULrUpWdROtAIYq5riUgIj4p2zl.vsPgUECzrZJAG',8888888888,13266,'2023-03-14 08:45:31','user','2023-03-14 08:45:31','2023-03-18 14:33:04',NULL,NULL),('578c2b80-0582-48fd-81e4-350c54d5ea03','Gilang','Ramadhan','confirmed','gilang.ramadhan36@yahoo.co.id',NULL,NULL,NULL,NULL,'user','2023-04-01 09:58:02','2023-04-01 09:58:02','yaIfhljU3WaIDEGRO5d8HPXklfR2',1),('5890b6f4-54fb-4877-8d00-92e7727913e0','Gilang','Ramadhan','confirmed','gilang.ramadhan011297@gmail.com','$2b$10$Rw6KDFH8g8jl5Z9APqG9t.DWHzaArHbTBSh3UEFGwSC5VJBy6TbDu',82213738206,NULL,NULL,'user','2023-03-17 13:54:34','2023-03-21 14:54:54','sCs5o8h2xzf4I3Pl0lEA1rQHBhk2',1),('9beaa852-6017-4127-8dba-6c7d0f147184','tester','123','confirmed','tester123123@gmail.com','$2b$10$la1Ku96A4lzcIpWyiqV.h.Hl.H6kM6GncCTOuscfCoF71xZMmzI8e',82213738218,11864,'2023-03-10 09:02:05','user','2023-03-10 09:02:05','2023-03-19 14:49:39',NULL,NULL),('a85f3b9d-576c-4965-8942-f6117d7f6d5a','User','Master','confirmed','usermaster@gmail.com','$2b$10$VGKwZOxQRM5goz/t5MdxZuLoVFFrnQu93zS2DJ6qaTMaFmaJYrdWS',8222222222,12494,'2023-03-29 19:24:31','user','2023-03-29 19:24:31','2023-03-29 19:25:00',NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_details`
--

DROP TABLE IF EXISTS `users_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `picture_path` text,
  `users_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`),
  CONSTRAINT `users_details_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_details`
--

LOCK TABLES `users_details` WRITE;
/*!40000 ALTER TABLE `users_details` DISABLE KEYS */;
INSERT INTO `users_details` VALUES (1,'Male','','2023-03-01 00:00:00','','9beaa852-6017-4127-8dba-6c7d0f147184'),(7,NULL,NULL,NULL,NULL,'367c3ca1-8ab4-404f-a7d7-abdbde1d7617'),(16,'Male','JI. Cemara Raya Blok 27 No. 4 Perumnas 1 RT/RW 04 07 Kelurahan Karawaci Baru,  Kecamatan Karawaci Kota Tangerang 15116','1997-12-09 00:00:00','','5890b6f4-54fb-4877-8d00-92e7727913e0'),(20,'Male','JI. Cemara Raya Blok 27 No. 4 Perumnas 1 RT/RW 04 07 Kelurahan Karawaci Baru,  Kecamatan Karawaci Kota Tangerang 15116','2023-03-27 00:00:00','','0857535a-e1d8-4d73-977b-49ec64d6213d'),(21,NULL,NULL,NULL,NULL,'a85f3b9d-576c-4965-8942-f6117d7f6d5a'),(22,NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/AGNmyxY52JPj_TcVCSGQaZq9ffV2YldVrAIZ5P-K0Gi1=s96-c','578c2b80-0582-48fd-81e4-350c54d5ea03');
/*!40000 ALTER TABLE `users_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-03 23:06:59
