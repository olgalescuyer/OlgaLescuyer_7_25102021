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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (4,'bla',NULL,NULL,'2021-11-27 15:08:09',2),(5,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 17:15:12',26),(6,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 17:47:08',26),(8,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 17:51:37',26),(9,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 17:55:56',26),(10,'new new new title title','new text','new image','2021-11-27 17:58:35',26),(13,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 18:03:07',26),(14,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 18:04:17',26),(15,'new new new title title title','new text','new image','2021-11-27 18:07:41',26),(16,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 18:08:14',26),(17,'new title','new text','new image','2021-11-27 18:24:55',26),(18,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 18:29:07',26),(19,'LOREM IPSUM lorem lorem','Lorem ipsum dolor ','','2021-11-29 11:04:24',26);
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'toto','dubois','dubois.toto@groupomania.fr','123456',0),(2,'john','doe','doe.john@groupomania.fr','AZERTY',0),(5,'admin','moderateur','admin@groupomania.fr','passadmin',1),(6,'emilie','martin','martin.emilie@groupomania.fr','$2b$10$p4/SYLER0WJ5UQkOEMZdrulHxEMMTnyynlexXv9TNs3gA9pGZbDAu',NULL),(11,'bob','martin',' martin.bob@groupomania.fr','$2b$10$a2msnSQlk6Ss38L5aLJnpebkPx.2YVkvtjucJXQs.phwfrL9lF2qC',NULL),(15,'isaac','asimov','asimov.isaac@groupomania.fr','$2b$10$z9h2B.F8dGKLBJafQxB1Ae.1yerqTo//TL9c9/8lCOfB509.2PncC',NULL),(16,'chantal','asimov','asimov.chantal@groupomania.ru','$2b$10$v62Fkakj15RKx.y8y19hIujPL2J.BBY1D8NZt8LpXPlm2yFpFGigq',NULL),(18,'chantal','asimov','asimov.chantald@groupomania.ru','$2b$10$NlmKjWzrQ43nDOaZMQDLR.muOVnYQmHXraT/s/nhpnty/zgPOwqJ.',NULL),(19,'chantal','asimov','asimov.chantald@free.fr','$2b$10$5.jDxtwXWhDyE0Q2fJNXde//cqrFUmN9.D0O0JehJUsMxYw.6PQkW',NULL),(20,'sanchez','vasilisa','sanchez.vasilisa@groupomania.fr','$2b$10$amBLqYjQUecMEHoUMACnsOpO4JTs3kGBELPmQ/3QEvTmd/5HZ1bE6',NULL),(21,'charlotte','martin','sanchez.marina@groupomania.fr','$2b$10$g2yQPctELtZv.7btrdH6Bu9m7W3tbHx2bfEf3lgux1BdJPRjMQb3y',NULL),(23,'jean-luc','martin','martin.bob@groupomania.fr','$2b$10$d8EcyGYOsvhD4bBQcTZWK.QsxXW/NTBWhuCR9bpAT3mY7ZANx0yfS',NULL),(26,'bill','smith','smith.bill@groupomania.fr','$2b$10$GccZoKF0yCI.a3D26fG9QOulgW.MULiybHiXxiFaN.PnUW37SL07S',NULL),(27,'chuck','norris','norris.chuck@groupomania.fr','$2b$10$TwYLgprN.0.5UuZAEd9B.O.6rFtRY3XvMlabCuR9cjTLo2XyRTWw2',NULL),(30,'Benoît','Péric','peric.benoît@groupomania.fr','$2b$10$kO9Ln9oJSgB8Et3AkPkse.2oYI.eicbGCUs8o.H5eA2KKlupCgtbq',NULL),(31,'Cril','Fisher','fisher.cril@groupomania.fr','$2b$10$dOZNGMlFnRA6QGpdzAvgTux.7P3rDganbjL4wMrXHPIFleefq1SIu',NULL);
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

-- Dump completed on 2021-12-03  8:51:28
