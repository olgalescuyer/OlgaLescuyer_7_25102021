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
) ENGINE=InnoDB AUTO_INCREMENT=616 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_or_not`
--

LOCK TABLES `like_or_not` WRITE;
/*!40000 ALTER TABLE `like_or_not` DISABLE KEYS */;
INSERT INTO `like_or_not` VALUES (586,127,315,-1),(589,127,294,-1),(593,127,321,-1),(597,127,322,1),(603,156,339,1),(604,156,340,-1),(605,156,322,-1),(606,156,319,1),(607,127,340,1),(608,127,341,-1),(609,127,339,-1),(610,127,314,1),(612,156,341,1),(613,127,343,1),(614,127,344,1),(615,127,345,-1);
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
) ENGINE=InnoDB AUTO_INCREMENT=346 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (294,'lorem ','lorem ipsum\n',NULL,'2022-03-22 16:04:40',127),(314,'acid cat','','http://localhost:3000/images/cat-acid_1648563053484.gif','2022-03-29 16:10:53',127),(315,'lorem','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam','http://localhost:3000/images/cat_1648563126360.jpg','2022-03-29 16:11:38',127),(316,'cde','wqamm','http://localhost:3000/images/cat2_1648565450499.jpg','2022-03-29 16:12:53',127),(317,'titre','text','http://localhost:3000/images/caaat_1648563360942.jpg','2022-03-29 16:16:01',127),(318,'acid cat','textttbb','http://localhost:3000/images/cat-acid_1648567363474.gif','2022-03-29 17:12:12',127),(319,'At vero eos et accusamus et iusto odio','Et harum quidem rerum facilis est et expedita distinctio.',NULL,'2022-03-29 17:24:38',127),(321,'lorem lorem','lorem ipsumxszcde','http://localhost:3000/images/caaat_1648621338105.jpg','2022-03-30 08:22:08',127),(322,'Sed ut perspiciatis unde omnis','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto\n','http://localhost:3000/images/christmas-cat_1649576605327.jpg','2022-03-30 09:19:09',127),(329,'lorem ipsum','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',NULL,'2022-04-05 15:01:21',127),(339,'cat','summer cat','http://localhost:3000/images/summer-cat_1649512952844.jpg','2022-04-09 16:01:48',156),(340,'Lorem ipsum dolor sit amet','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ','http://localhost:3000/images/face-cat_1649513778099.jpg','2022-04-09 16:14:36',156),(341,'fat cat','ipsum','http://localhost:3000/images/fat-cat_1649517613468.gif','2022-04-09 16:23:37',127),(343,'cat','halloween','http://localhost:3000/images/halloween-cat_1649576530481.jpg','2022-04-10 09:28:36',127),(344,'xsz','wqa','http://localhost:3000/images/cat3_1649576518784.jpg','2022-04-10 09:36:49',127),(345,'cat','','http://localhost:3000/images/cat1_1649576231980.gif','2022-04-10 09:37:12',127);
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
  `u_avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_email_UNIQUE` (`u_email`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'toto','dubois','dubois.toto@groupomania.fr','123456',0,NULL),(2,'john','doe','doe.john@groupomania.fr','AZERTY',0,NULL),(5,'admin','moderateur','admin@groupomania.fr','passadmin',1,NULL),(6,'emilie','martin','martin.emilie@groupomania.fr','$2b$10$p4/SYLER0WJ5UQkOEMZdrulHxEMMTnyynlexXv9TNs3gA9pGZbDAu',NULL,NULL),(11,'bob','martin',' martin.bob@groupomania.fr','$2b$10$a2msnSQlk6Ss38L5aLJnpebkPx.2YVkvtjucJXQs.phwfrL9lF2qC',NULL,NULL),(15,'isaac','asimov','asimov.isaac@groupomania.fr','$2b$10$z9h2B.F8dGKLBJafQxB1Ae.1yerqTo//TL9c9/8lCOfB509.2PncC',NULL,NULL),(16,'chantal','asimov','asimov.chantal@groupomania.ru','$2b$10$v62Fkakj15RKx.y8y19hIujPL2J.BBY1D8NZt8LpXPlm2yFpFGigq',NULL,NULL),(18,'chantal','asimov','asimov.chantald@groupomania.ru','$2b$10$NlmKjWzrQ43nDOaZMQDLR.muOVnYQmHXraT/s/nhpnty/zgPOwqJ.',NULL,NULL),(19,'chantal','asimov','asimov.chantald@free.fr','$2b$10$5.jDxtwXWhDyE0Q2fJNXde//cqrFUmN9.D0O0JehJUsMxYw.6PQkW',NULL,NULL),(20,'sanchez','vasilisa','sanchez.vasilisa@groupomania.fr','$2b$10$amBLqYjQUecMEHoUMACnsOpO4JTs3kGBELPmQ/3QEvTmd/5HZ1bE6',NULL,NULL),(21,'charlotte','martin','sanchez.marina@groupomania.fr','$2b$10$g2yQPctELtZv.7btrdH6Bu9m7W3tbHx2bfEf3lgux1BdJPRjMQb3y',NULL,NULL),(23,'jean-luc','martin','martin.bob@groupomania.fr','$2b$10$d8EcyGYOsvhD4bBQcTZWK.QsxXW/NTBWhuCR9bpAT3mY7ZANx0yfS',NULL,NULL),(26,'####','!!!','dupon.jean-sabastien','$2b$10$GccZoKF0yCI.a3D26fG9QOulgW.MULiybHiXxiFaN.PnUW37SL07S',NULL,NULL),(27,'chuck','norris','norris.chuck@groupomania.fr','$2b$10$TwYLgprN.0.5UuZAEd9B.O.6rFtRY3XvMlabCuR9cjTLo2XyRTWw2',NULL,NULL),(30,'Benoît','Péric','peric.benoît@groupomania.fr','$2b$10$kO9Ln9oJSgB8Et3AkPkse.2oYI.eicbGCUs8o.H5eA2KKlupCgtbq',NULL,NULL),(31,'Cril','Fisher','fisher.cril@groupomania.fr','$2b$10$dOZNGMlFnRA6QGpdzAvgTux.7P3rDganbjL4wMrXHPIFleefq1SIu',NULL,NULL),(33,'Teresa','May','may.teresa@groupomania.fr','$2b$10$qCmCPTffM6fH8dNvOmAkFOGMcvXRaf5iey/jJ3pc8muW2wEZfcaU6',NULL,NULL),(37,'George','Paten','paten.george@groupomania.fr','$2b$10$BZaJLkT67PLOkPJ25GR/RO.5flAQATVt5FfO148SErIKubU5n3qgy',NULL,NULL),(40,'Gwen','Miller','miller.gwen@groupomania.fr','$2b$10$h34V1AQyS8/LE4GVjowE2uW2ndWyWtYpCaq.YnJIMyghsGsVZob52',NULL,NULL),(47,'insignia','blabla','$2b$10$.tbv/zRicNaHp.UZC13ZV.FRu28YPI/hpheIVnajpMg.RFu4tgtaa','insignia@groupomania.fr',NULL,NULL),(48,'Stéphan','Desa','$2b$10$bXo335f6cebZIH7RVo706OGCoAMoKqmELGrDmmqCrBTttL72wVM9i','desa.stephan@groupomania.fr',NULL,NULL),(49,'wendell','urth','$2b$10$02ItOrb6mQrpZTr8WoA2E.Hp2ZjY2Y1yaRIhQZ4BgxuJPZJLC9pza','urth.wendell@groupomania.fr',NULL,NULL),(50,'insignia','blabla','11111qsNBn::','insignia.eugenie@groupomania.fr',NULL,NULL),(51,'bruno','martin','insignia.eugenie@groupomania.fr','$2b$10$Cdt2.7.WG8UvkPITe4aj2eHPTmYUO1l98/H5bZ4N1zVoLRFr3GZz2',NULL,NULL),(53,'newName','Hércule','martin.hercule@groupomania.fr','$2b$10$pIYa3maN/DhS0uAmxUDkfuqNWIgJwO2rXqKThk5FUC6J1DMDs9zgi',NULL,NULL),(62,'carl','vasiliev','carl.vas@groupomania.fr','$2b$10$ZC3MRYv.JyAQfl2m7zA4quJf146o7S8jRse1t2SO0JtlPXVWpPXO.',NULL,NULL),(64,'andrew','harlan','harlan.andrew@groupomania.fr','$2b$10$zMOsxQswODLiB8fxYBRy5O1yJPUIDEjo99aCVKDZb4UykAJvw/pnm',NULL,NULL),(65,'max','grand','grand.max@groupomania.fr','$2b$10$TMfY6zWYWn3VRNr.l7yEp.iHCM8MoO/Ln8xI9otM3zULoIibxoxJ2',NULL,NULL),(66,'li','cooper','cooper.li@groupomania.fr','$2b$10$8Q0WYhVwBXK.kcszpnROaeOGMEdaftVX2yVLPjx5shcDXEZbhfQMe',NULL,NULL),(69,'lolo','mimimi','fffff@mail.ru','$2b$10$YY.WnCHLbBeC9s1zThBJ0erjeYcyYERxtD4Fr7Cig7/tCmoCiaY7K',NULL,NULL),(75,'Nelson','Mndela','fffff@groupomania.fr','$2b$10$aXiRN2T/a00sF5cNZ2Nk9ORNz4far4rX7V48DFxh29AdsIgchZqNa',NULL,NULL),(76,'Nélson','Mândela','mandela@groupomania.fr','$2b$10$h2VbaD6qeGcBkpsZv17Dfec.68hZrOsRoLCnSXXxn1XwMl3vPFDu2',NULL,NULL),(78,'will','smith','smith@groupomania.fr','$2b$10$ii56UPTDQIIUDbADUtIYEOoObIpR7uq4rvMak04SOnOFmBpBhLqXW',NULL,NULL),(79,'lol','cooper','cooper.lol@groupomania.fr','$2b$10$tyQhbKclhyeycwhmU6qx6./EaAtLEH3ytfl.k2DaoVzyoeGVS8Zr2',NULL,NULL),(80,'Ted','Long','long.ted@groupomania.fr','$2b$10$W.YGio8eagog3XVTU/4LX.XoDgW0PKwc0VWBWKSeJgFwnvENXX5qq',NULL,NULL),(81,'nicolas','keidge','keidge.nicolas@groupomania.fr','$2b$10$scLzUfXIt3isOtLXei.lQOv.A6eFUjn68l71ZLfxutxXn917tu40i',NULL,NULL),(83,'James','Gleick','gleick.james@groupomania.fr','$2b$10$CtvlJ3h9VnKYVxOulKdXGOQpqRtf6QCGQV6vcFsSR8OFpol.FAsOu',NULL,NULL),(84,'philippe','breton','breton.philippe@groupomania.fr','$2b$10$DUjHEIpUP7g2wlBfrvLG/OChE9.qK8QVAJpxlJnI5VWiQ2PYMUZ3.',NULL,NULL),(85,'lolo','lolo','lolo.lolo@groupomania.fr','$2b$10$VxOsVHD2ghqz0FdXIvS4oOCqIdqK6aAEajgXYg1cB3GGjVvb8QnMm',NULL,NULL),(86,'hannah','arendt','hanna.arendt@groupomania.fr','$2b$10$kt0P/e8WrNmnqIwPa5WhAOgSUxkJmP2h0yZjAM8ddS9NWzCNr3oD2',NULL,NULL),(87,'aditya','bhargava','bhargava.aditya@groupomania.fr','$2b$10$ILncOEohUO7ITrJRWUOlW.jabzpILnTF3.JRoK1B8WYTc5eLrIOJO',NULL,NULL),(88,'pierre','pompidor','pompidor.pierre@groupomania.fr','$2b$10$ZlzT40Ru7lip0dk3Iw7wFeqvRauk/3zH8kW6h6O9Ds.im8VFMoJ6C',NULL,NULL),(89,'dominique','colombani','colombani.dom@groupomania.fr','$2b$10$HoqeMqzogXsd7rrII2fNgunhAkxG45Q18plBytDZTXMT3omtcn4lS',NULL,NULL),(90,'edward','herman','herman.ed@groupomania.fr','$2b$10$TtkNQ33Am1AkJO5iEiAmKexxLCNVEK0A4.C0qvL7iD/I2.2eVkx3.',NULL,NULL),(91,'momo','mimi','mimi.momo@groupomania.fr','$2b$10$DdXfsFiOu7pLbqrTDnpK2eJnBszNpvffT4JUC95l1h3XURwWPXC6y',NULL,NULL),(92,'scott','chacon','chacon.scott@groupomania.fr','$2b$10$dT1ajQj.8o2v8BVcR5CkKObumaezcHtOSJL22zgwD.k3e8/e34GKa',NULL,NULL),(93,'jones','darren','darren.jones@groupomania.fr','$2b$10$T7tI5yg9GBQfq.fCZkcEIOfJj9Pz5lqY3w9leVxX8NegbqxUINcLG',NULL,NULL),(94,'christophe','aubry','aubry.christophe@groupomania.fr','$2b$10$cs3TYzyr9H3dfGkTLv0HKO0bTAfh/wace5zxLT5h8IE0vKeN.b66m',NULL,NULL),(95,'samuel','dauzon','dauzon.samuel@groupomania.fr','$2b$10$X0xKKQPDzZt5lMJX4KNQPuakR6zGa2J0RbJlTg9pP8xLfI5aDshDm',NULL,NULL),(96,'mii','lo','lo.mii@groupomania.fr','$2b$10$SUPCkBNeV3Fjyz6ShqqaVOUr6/6k57VMb3NYFNOMPz3B3S1rd4o32',NULL,NULL),(97,'jon','duckett','duckett.jon@groupomania.fr','$2b$10$s88zVUm6dqrOnlklJclqUOzhzHz9vEfPjDV6CZCfG4Gm5QuaIDKSO',NULL,NULL),(98,'jonh','wiley','wiley.jonh@groupomania.fr','$2b$10$4PpuuiIJCN.vRlytWpBhN.rw6gGdfjsGC7dk29bZdDpwr58kFDYdG',NULL,NULL),(99,'sennor','twicell','twicell.sennor@groupomania.fr','$2b$10$CokXICMX3sqOPZ2DW/f50eqhj372TMjB4ZIyqQ0eWSXqgHg/PCHPS',NULL,NULL),(100,'hilda','monne','monne.hilda@groupomania.fr','$2b$10$faXCzGxH5HamG8kiCzESv.12OBvOs2b2Yz1rbBjYH4TOcZX8aKNmi',NULL,NULL),(101,'devi-en','hurrien','hurrien.devi-en@groupomania.fr','$2b$10$li8WrEMODyxVTvYDH02tCeatG2gVm01UEp4T2brSiXmEAI4TfzbZu',NULL,NULL),(102,'henri','perkin','perkin.henri@groupomania.fr','$2b$10$6J7DNfsAubav.fvaEZW3G.COR4lJA6HlzkMqEIPSmQWLqtxsAIn1C',0,NULL),(103,'anne','villelaur','villelaur.anne@groupomania.fr','$2b$10$SObpk9pnYFaJiAC4I7dGmOzYm2GoxFaqclrDHedc950weRnwiGHSS',0,NULL),(104,'karim','friha','friha.karim@groupomania.fr','$2b$10$7oui6cGng1s.4OwvSVZxgOIdGkXmxsg3aEHSBl/IdT3Olp19b7Xtm',0,NULL),(105,'marie','blachère','blachere.marie@groupomania.fr','$2b$10$lxhWpoD1rhbP9gS0h6xc/.JUZpNEvFMkX4j2tujRPx5T.sO7m.99u',0,NULL),(106,'marie','térèse','terese.marie@groupomania.fr','$2b$10$4gO1U5m2MXBanYZT8oDMi.yxlyEWS8e883Czc50oMsI.mSCEcY1LW',0,NULL),(107,'laurent','mind','mind.laurent@groupomania.fr','$2b$10$Bc.XIB7wKH.sTyL5LkpqfeV3V4oqN6Pkh7qVPsYINwrCjy2cUJvDe',0,NULL),(108,'laurent','mind','mind@groupomania.fr','$2b$10$5QZlD/YoCXNW9czgaaSf0OvhT4/yk8RxwzIhNWx1Khp2LHYcjWgkK',0,NULL),(109,'laurent','mind','mid@groupomania.fr','$2b$10$DnJSYtPtzSSWO6OK533AOObG.2TNrj/HWAalc41rlReHAuYLOfstC',0,NULL),(110,'laurent','mind','mlaurent@groupomania.fr','$2b$10$F4H1HTMqT6ai75KIWrLxDu9zvzGX07ggMczCf405acOvRP19vmZym',0,NULL),(111,'laurent','mind','laurent@groupomania.fr','$2b$10$jtylLA0MdikBVQJDdfPIHeZ2AsSmtpto6sew8PPGiDACFyMWloqdy',0,NULL),(112,'laurent','mind','lauret@groupomania.fr','$2b$10$h1g.u9BWGZg5iAnXLonTZOHwoRbw2Oy5CVOw7bJl0RcCbJhUNk98G',0,NULL),(114,'laurent','mind','laret@groupomania.fr','$2b$10$HTYZt4fxuTm.pxZTthEF7OJPN2pkOfKibvmsOPbBYwkQo0EQNIxtS',0,NULL),(115,'momo','mp','mp.momo@groupomania.fr','$2b$10$7GXH.WyjIvnQqNpkm3qvw.LVaCLf43oU0DNXAl6rWQEr2f8F0lpKW',0,NULL),(116,'momo','mp','mp.mom@groupomania.fr','$2b$10$5.VXjTbQdBLfuzCrzGng3ext6adNq5RddcJGyl.wOHZDqJYxLagsS',0,NULL),(117,'momo','mp','mp.momqqq@groupomania.fr','$2b$10$Mtm4DmJWFaXkOjnnNjc4aOSWbl0gW5ud4MqcP0E4.uReBkn8bKtMO',0,NULL),(118,'momo','mp','mp.momqq@groupomania.fr','$2b$10$s/gff2KLq71UkodqFapg1uYJ7hKAo/QxW2CBDbZttEb03bbJZSeQy',0,NULL),(119,'momo','mp','mp.momq@groupomania.fr','$2b$10$Nli8mVC/51Jz0nLFs2mXzOJbiBXDwqbcLSlL0zedD4o9rX5Li/CIa',0,NULL),(120,'momo','mp','mpoo.momq@groupomania.fr','$2b$10$OBIoLH7AaSc8ZzrL.gGbguqeMk.Ot8z/BZZbWLtetYDjC5Om2ngTa',0,NULL),(121,'momo','mp','mpoo.momqhh@groupomania.fr','$2b$10$d3efNb7Xtx9k6XPaJlG1HeyFDjRGKg1JkeOo2K9NgxT5BcV9KJvCK',0,NULL),(122,'momo','mp','mpoovv.momqhh@groupomania.fr','$2b$10$gZlktCgLViarywbwLN4MZ.R8QC4h1VTsBuSudVI9la77uyrrt1Dz.',0,NULL),(123,'momo','mp','mpoovv.movvmqhh@groupomania.fr','$2b$10$Msu1q6dNhwNN3QoupHxmbuHudCFf2OwsoJ5ApNqurveXFMYxUqYMK',0,NULL),(124,'momo','mp','mpvv.movvmqhh@groupomania.fr','$2b$10$qCGaldi0IGC8xmNFgDHaC.UBlmPF23.A.Bfcwlb2iOhvYC9iSNn06',0,NULL),(125,'momo','mp','mpvv.movvqhh@groupomania.fr','$2b$10$AfrmcGSWz2W8F8cB499kv.zAaHoakQWGsZQ8YJN2VDq0BUhB1w8iW',0,NULL),(126,'momo','mp','pvv.movvqhh@groupomania.fr','$2b$10$pzvHg5dI0pQf5YAjdkpSseJOGvfH.vhsjmY0QPEo60WWk3WVZOnIq',0,NULL),(127,'Leonidas Admin','Prime ','prime.leonidas@groupomania.fr','$2b$10$LEGj1aynsSzExSJ0m/3bE.GZMOnkawp/qfPflmKp.tpVMvtIRdUWm',1,NULL),(128,'amanda','grey','grey.amanda@groupomania.fr','$2b$10$U2ix/QM4XcU81QS3kyvfJe0yD89HDmFYjyxyRTEQHSxOE9lu1Pcvq',0,NULL),(129,'marchall','zebatinsky','zebatinsky.marchall@groupomania.fr','$2b$10$Zo7gbQgkCDcZwCgT7D5MA.ab.ZVeLKqJbkKQreEN/EREeTWimqCMe',0,NULL),(130,'marchall','sebatinsky','sebatinsky.marchall@groupomania.fr','$2b$10$R3xIJOHoESOc0Zj6Xy2ht.1EV1JbuezQ9kC8ie6kv8KCZ7VzDfyue',0,NULL),(131,'alexander','adell','adell.alexander@groupomania.fr','$2b$10$ARpqyixQpCbRoLuB4Eavxuy2ljldScOAnAGRCD7O7TMRZggwh0Zf.',0,NULL),(132,'bertran','lupov','lupov.bertran@groupomania.fr','$2b$10$caMoSSPvOP6N6kH7MJPrNOD3/d6P0kVlGFKDtvWdejmKh5qyO2ulC',0,NULL),(133,'edith','fellowes','fellows.edith@groupomania.fr','$2b$10$tkLx1.lPtBjKIvHGbRWh8exP0jI1mUcvSQgmAO4Y.uHdu.VpF/pFS',0,NULL),(134,'multivac','microvac','multivac@groupomania.fr','$2b$10$Bn9wE.FPvLX07m8TYgCP7ONzpRChkEDGKuV51Bi2YZY4kKrXcBay6',0,NULL),(135,'multivac','microvac','multivac.microvac@groupomania.fr','$2b$10$BBD7t0g./gU6TNU9sAVd4.bNK1zJ5rRU6WKZDStsvF5/pr6F2UX4e',0,NULL),(136,'ac','galactique','galactique@groupomania.fr','$2b$10$qBI/KDthJW26CKAte2uJM./6FTW9tds.PKV6w5J7D7cb75nOHMdRq',0,NULL),(137,'ac','universel','universel@groupomania.fr','$2b$10$mFnNUh02z4VYp7YjxmN9BOkhYUckD/eqVsxf0g.fwtOM6sqW5JNKm',0,NULL),(138,'agnia','barto','barto.agnia@groupomania.fr','$2b$10$/nZycZABKGnHwj1y0hExMOBOeeTFExfstqzjbvbzDdcqNhIn.abTK',0,NULL),(140,'temps','eternel','eternel@groupomania.fr','$2b$10$dFl0DEdSehyirxp8cs2KC.BQW2KCQzQynA2Ki4nj4ATgJrBhqOUdm',0,NULL),(141,'thomas','manne','manne.thomas@groupomania.fr','$2b$10$ugm5rKgKaTMQrvfI2jk.Fudoa7XHa/Vj3dq4H4RUQ8en4X4HpuIlS',0,NULL),(142,'noys','tech','tech.noys@groupomania.fr','$2b$10$Ig.UV2u.u/65LznOAaiA0OtbZmWYCYd0JMdCEOB0KtaNO3i2jmu.C',0,NULL),(143,'karen','souza','souza.karen@groupomania.fr','$2b$10$5tpmTU3wqfVSA5feF.shjuTKKLDO1eERVDM/o4ghd4NpmEZmSpjT.',0,NULL),(144,'noys','twissel','twisell.noys@groupomania.fr','$2b$10$e6E67UIZqVDrzDUgyAi/s.YLlNauL6iJbB/g6EXVliNotHsBQO78m',0,NULL),(145,'sonia','sonia','sonia@groupomania.fr','$2b$10$NzUMHnTS76YqocIga.gQ1emenWenEIvfarAZKHKZemgrq9mUI/NRu',0,NULL),(146,'lancelot','jennings','jennings.lancelot@groupomania.fr','$2b$10$rMttfFJNlpJUShkf8U4pbO/F69UqoxJI623OhtQcPSGsbfw0YkrgS',0,NULL),(147,'ol','lolo','o.jhl@groupomania.fr','$2b$10$byNtpd35pYRTEpuRgPw9yuI1YwzZrsUfna0y6Zwm96NR2xiUHY/rS',0,NULL),(150,'samuel','dauzon','ddauzon.samuel@groupomania.fr','$2b$10$u90qXEodK.O8aDhYy9F0kucDdZn9K1GTFxIGfFeqwFhoC7vfApTZG',0,NULL),(151,'mimi','lili','mimi.lili@groupomania.fr','$2b$10$IPCGFUB1HW04G5n9FqQ1auQTKvjSt1UiJpo6.//asP61qGQ3ZLptu',0,NULL),(152,'elodie','momo','momo@groupomania.fr','azerty',0,NULL),(153,'tim','coock','coock.tim@groupomania.fr','$2b$10$CNkREqibpISiUYKqniF3D.toLUcTihh8i3wd4m5sg3WjxSRkIu.0W',0,NULL),(156,'lolol','mimin','mimin.lolo@groupomania.fr','$2b$10$e2k5ilSSZCPDkgO2piWdAONqUp.Lb8MQCyUBsXHztSp8QPNNXfMUW',0,NULL);
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

-- Dump completed on 2022-04-10  9:51:31
