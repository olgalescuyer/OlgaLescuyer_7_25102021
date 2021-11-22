-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `like_or_not`
--

DROP TABLE IF EXISTS `like_or_not`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_or_not` (
  `l_id` int unsigned NOT NULL AUTO_INCREMENT,
  `l_fk_user_id` int unsigned DEFAULT NULL,
  `l_fk_post_id` int unsigned DEFAULT NULL,
  `l_choice` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`l_id`),
  KEY `l_fk_user_id` (`l_fk_user_id`),
  KEY `l_fk_post_id` (`l_fk_post_id`),
  CONSTRAINT `like_or_not_ibfk_1` FOREIGN KEY (`l_fk_user_id`) REFERENCES `user` (`u_id`) ON DELETE CASCADE,
  CONSTRAINT `like_or_not_ibfk_2` FOREIGN KEY (`l_fk_post_id`) REFERENCES `post` (`p_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_or_not`
--

LOCK TABLES `like_or_not` WRITE;
/*!40000 ALTER TABLE `like_or_not` DISABLE KEYS */;
/*!40000 ALTER TABLE `like_or_not` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `p_id` int unsigned NOT NULL AUTO_INCREMENT,
  `p_title` varchar(255) NOT NULL,
  `p_text` varchar(255) DEFAULT NULL,
  `p_image` varchar(255) DEFAULT NULL,
  `p_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `p_fk_user_id` int unsigned NOT NULL,
  PRIMARY KEY (`p_id`),
  KEY `p_fk_user_id` (`p_fk_user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`p_fk_user_id`) REFERENCES `user` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (2,'LOREM IPSUM','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ',NULL,'2021-11-19 17:11:39',4),(3,'Lorem ipsum',NULL,NULL,'2021-11-19 17:16:10',4);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `u_id` int unsigned NOT NULL AUTO_INCREMENT,
  `u_first_name` varchar(255) NOT NULL,
  `u_last_name` varchar(255) NOT NULL,
  `u_email` varchar(255) NOT NULL,
  `u_password` varchar(320) NOT NULL,
  `u_admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_email_UNIQUE` (`u_email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'toto','dubois','dubois.toto@groupomania.fr','123456',0),(2,'john','doe','jonh.doe@groupomania.fr','AZERTY',0),(4,'jane','smith','smith.jane@groupomania@fr','wxcvb',0),(5,'admin','moderateur','admin@groupomania','passadmin',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-22 11:02:24
