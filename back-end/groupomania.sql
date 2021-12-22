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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_or_not`
--

LOCK TABLES `like_or_not` WRITE;
/*!40000 ALTER TABLE `like_or_not` DISABLE KEYS */;
INSERT INTO `like_or_not` VALUES (15,64,45,0),(16,64,45,1),(17,65,45,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (4,'bla',NULL,NULL,'2021-11-27 15:08:09',2),(5,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 17:15:12',26),(6,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 17:47:08',26),(8,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 17:51:37',26),(9,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 17:55:56',26),(10,'new new new title title','new text','new image','2021-11-27 17:58:35',26),(13,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 18:03:07',26),(14,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 18:04:17',26),(15,'new new new title title title','new text','new image','2021-11-27 18:07:41',26),(16,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 18:08:14',26),(17,'new title','new text','new image','2021-11-27 18:24:55',26),(18,'LOREM IPSUM','Lorem ipsum dolor ','','2021-11-27 18:29:07',26),(19,'LOREM IPSUM lorem lorem','Lorem ipsum dolor ','','2021-11-29 11:04:24',26),(20,'Nouvel posr','bla bla  ','','2021-12-03 11:34:31',26),(26,'bla','description','http://localhost:3000/images/christmas-cat.jpg1638775504629.jpg','2021-12-06 08:24:22',47),(38,'bla','description','http://localhost:3000/images/christmas-cat.jpg1638810309886.jpg','2021-12-06 18:05:09',47),(42,'bla','description','http://localhost:3000/images/cat.jpg1639634545534.jpg','2021-12-16 07:02:25',64),(45,'bla','description','http://localhost:3000/images/cat.jpg1639637692328.jpg','2021-12-16 07:54:52',64),(46,'blananashvcgsfc','description','http://localhost:3000/images/catcat.jpg1639638084529.jpg','2021-12-16 07:58:50',64),(47,'bla','description','http://localhost:3000/images/christmas-cat.jpg1640183009775.jpg','2021-12-22 15:23:29',74),(48,'super titre','super text','http://localhost:3000/images/christmas-cat.jpg1640183092284.jpg','2021-12-22 15:24:52',74),(49,'chat','super chat','http://localhost:3000/images/catcat.jpg1640184118695.jpg','2021-12-22 15:41:58',74),(50,'chat','super chat','http://localhost:3000/images/panda_1f43c.png1640184185681.png','2021-12-22 15:43:05',74),(51,'chat','super chat','http://localhost:3000/images/unicorn_1f984.png1640184522923.png','2021-12-22 15:48:42',74);
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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'toto','dubois','dubois.toto@groupomania.fr','123456',0),(2,'john','doe','doe.john@groupomania.fr','AZERTY',0),(5,'admin','moderateur','admin@groupomania.fr','passadmin',1),(6,'emilie','martin','martin.emilie@groupomania.fr','$2b$10$p4/SYLER0WJ5UQkOEMZdrulHxEMMTnyynlexXv9TNs3gA9pGZbDAu',NULL),(11,'bob','martin',' martin.bob@groupomania.fr','$2b$10$a2msnSQlk6Ss38L5aLJnpebkPx.2YVkvtjucJXQs.phwfrL9lF2qC',NULL),(15,'isaac','asimov','asimov.isaac@groupomania.fr','$2b$10$z9h2B.F8dGKLBJafQxB1Ae.1yerqTo//TL9c9/8lCOfB509.2PncC',NULL),(16,'chantal','asimov','asimov.chantal@groupomania.ru','$2b$10$v62Fkakj15RKx.y8y19hIujPL2J.BBY1D8NZt8LpXPlm2yFpFGigq',NULL),(18,'chantal','asimov','asimov.chantald@groupomania.ru','$2b$10$NlmKjWzrQ43nDOaZMQDLR.muOVnYQmHXraT/s/nhpnty/zgPOwqJ.',NULL),(19,'chantal','asimov','asimov.chantald@free.fr','$2b$10$5.jDxtwXWhDyE0Q2fJNXde//cqrFUmN9.D0O0JehJUsMxYw.6PQkW',NULL),(20,'sanchez','vasilisa','sanchez.vasilisa@groupomania.fr','$2b$10$amBLqYjQUecMEHoUMACnsOpO4JTs3kGBELPmQ/3QEvTmd/5HZ1bE6',NULL),(21,'charlotte','martin','sanchez.marina@groupomania.fr','$2b$10$g2yQPctELtZv.7btrdH6Bu9m7W3tbHx2bfEf3lgux1BdJPRjMQb3y',NULL),(23,'jean-luc','martin','martin.bob@groupomania.fr','$2b$10$d8EcyGYOsvhD4bBQcTZWK.QsxXW/NTBWhuCR9bpAT3mY7ZANx0yfS',NULL),(26,'####','!!!','dupon.jean-sabastien','$2b$10$GccZoKF0yCI.a3D26fG9QOulgW.MULiybHiXxiFaN.PnUW37SL07S',NULL),(27,'chuck','norris','norris.chuck@groupomania.fr','$2b$10$TwYLgprN.0.5UuZAEd9B.O.6rFtRY3XvMlabCuR9cjTLo2XyRTWw2',NULL),(30,'Benoît','Péric','peric.benoît@groupomania.fr','$2b$10$kO9Ln9oJSgB8Et3AkPkse.2oYI.eicbGCUs8o.H5eA2KKlupCgtbq',NULL),(31,'Cril','Fisher','fisher.cril@groupomania.fr','$2b$10$dOZNGMlFnRA6QGpdzAvgTux.7P3rDganbjL4wMrXHPIFleefq1SIu',NULL),(33,'Teresa','May','may.teresa@groupomania.fr','$2b$10$qCmCPTffM6fH8dNvOmAkFOGMcvXRaf5iey/jJ3pc8muW2wEZfcaU6',NULL),(37,'George','Paten','paten.george@groupomania.fr','$2b$10$BZaJLkT67PLOkPJ25GR/RO.5flAQATVt5FfO148SErIKubU5n3qgy',NULL),(40,'Gwen','Miller','miller.gwen@groupomania.fr','$2b$10$h34V1AQyS8/LE4GVjowE2uW2ndWyWtYpCaq.YnJIMyghsGsVZob52',NULL),(47,'insignia','blabla','$2b$10$.tbv/zRicNaHp.UZC13ZV.FRu28YPI/hpheIVnajpMg.RFu4tgtaa','insignia@groupomania.fr',NULL),(48,'Stéphan','Desa','$2b$10$bXo335f6cebZIH7RVo706OGCoAMoKqmELGrDmmqCrBTttL72wVM9i','desa.stephan@groupomania.fr',NULL),(49,'wendell','urth','$2b$10$02ItOrb6mQrpZTr8WoA2E.Hp2ZjY2Y1yaRIhQZ4BgxuJPZJLC9pza','urth.wendell@groupomania.fr',NULL),(50,'insignia','blabla','11111qsNBn::','insignia.eugenie@groupomania.fr',NULL),(51,'bruno','martin','insignia.eugenie@groupomania.fr','$2b$10$Cdt2.7.WG8UvkPITe4aj2eHPTmYUO1l98/H5bZ4N1zVoLRFr3GZz2',NULL),(53,'newName','Hércule','martin.hercule@groupomania.fr','$2b$10$pIYa3maN/DhS0uAmxUDkfuqNWIgJwO2rXqKThk5FUC6J1DMDs9zgi',NULL),(62,'carl','vasiliev','carl.vas@groupomania.fr','$2b$10$ZC3MRYv.JyAQfl2m7zA4quJf146o7S8jRse1t2SO0JtlPXVWpPXO.',NULL),(64,'andrew','harlan','harlan.andrew@groupomania.fr','$2b$10$zMOsxQswODLiB8fxYBRy5O1yJPUIDEjo99aCVKDZb4UykAJvw/pnm',NULL),(65,'max','grand','grand.max@groupomania.fr','$2b$10$TMfY6zWYWn3VRNr.l7yEp.iHCM8MoO/Ln8xI9otM3zULoIibxoxJ2',NULL),(66,'li','cooper','cooper.li@groupomania.fr','$2b$10$8Q0WYhVwBXK.kcszpnROaeOGMEdaftVX2yVLPjx5shcDXEZbhfQMe',NULL),(69,'lolo','mimimi','fffff@mail.ru','$2b$10$YY.WnCHLbBeC9s1zThBJ0erjeYcyYERxtD4Fr7Cig7/tCmoCiaY7K',NULL),(74,'lolo','mimin','mimin.lolo@groupomania.fr','$2b$10$n775juGDR/GONt5xRRymiO3r4wBfTEw0Ncabhpnmnp4PeX6SvahTe',NULL),(75,'Nelson','Mndela','fffff@groupomania.fr','$2b$10$aXiRN2T/a00sF5cNZ2Nk9ORNz4far4rX7V48DFxh29AdsIgchZqNa',NULL),(76,'Nélson','Mândela','mandela@groupomania.fr','$2b$10$h2VbaD6qeGcBkpsZv17Dfec.68hZrOsRoLCnSXXxn1XwMl3vPFDu2',NULL),(78,'will','smith','smith@groupomania.fr','$2b$10$ii56UPTDQIIUDbADUtIYEOoObIpR7uq4rvMak04SOnOFmBpBhLqXW',NULL);
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

-- Dump completed on 2021-12-22 16:15:43
