CREATE DATABASE  IF NOT EXISTS `mingeso`;
USE `mingeso`;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (

  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,

  `name` varchar(50) DEFAULT NULL
);
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (

  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
  `section` varchar(50) DEFAULT NULL
  
);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (

  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,

  `email` varchar(50) DEFAULT NULL, 

  `id_rol` int DEFAULT NULL,
  
  `id_class` int DEFAULT NULL,
  
  FOREIGN KEY (`id_rol`) REFERENCES `roles`(`id`),
  
  FOREIGN KEY (`id_classe`) REFERENCES `classes`(`id`)

);


DROP TABLE IF EXISTS `solutions`;
CREATE TABLE `solutions` (

  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
  `id_user` int NOT NULL,
  
  `script` text DEFAULT NULL,
  
   FOREIGN KEY (`id_user`) REFERENCES `users`(`id`)
);

DROP TABLE IF EXISTS `exercises`;
CREATE TABLE `exercises` (

  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
  `id_user` int NOT NULL,
  
  `name` varchar(50) DEFAULT NULL,

  `text` text DEFAULT NULL,
  
  `publicated` boolean DEFAULT false,
  
  FOREIGN KEY (`id_user`) REFERENCES `users`(`id`)
);
DROP TABLE IF EXISTS `test_cases`;
CREATE TABLE `test_cases` (

  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
  `id_exercise` int NOT NULL,
  
   FOREIGN KEY (`id_exercise`) REFERENCES `exercises`(`id`)
);
DROP TABLE IF EXISTS `outputs`;
CREATE TABLE `outputs` (

  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
  `id_test_case` int NOT NULL,
  
  `value` varchar(60) DEFAULT NULL,
  
  
   FOREIGN KEY (`id_test_case`) REFERENCES `test_cases`(`id`)
);
DROP TABLE IF EXISTS `inputs`;
CREATE TABLE `inputs` (

  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
  `id_output` int NOT NULL,
  
  `value` varchar(60) DEFAULT NULL,
  
   FOREIGN KEY (`id_output`) REFERENCES `outputs`(`id`)
);

