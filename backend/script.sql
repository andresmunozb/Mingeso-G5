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
  
	`name` varchar(50) DEFAULT NULL
  
);

DROP TABLE IF EXISTS `careers`;
CREATE TABLE `careers` (

	`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
	`name` varchar(50) DEFAULT NULL
  
);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (

	`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,

	`id_rol` int DEFAULT NULL,
  
	`id_class` int DEFAULT NULL,
  
	`id_career` int DEFAULT NULL,
  
	`email` varchar(50) DEFAULT NULL, 
  
	FOREIGN KEY (`id_rol`) REFERENCES `roles`(`id`),
  
	FOREIGN KEY (`id_class`) REFERENCES `classes`(`id`),
  
	FOREIGN KEY (`id_career`) REFERENCES `careers`(`id`)

);

DROP TABLE IF EXISTS `exercises`;
CREATE TABLE `exercises` (

	`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
	`id_user` int NOT NULL,
  
	`title` varchar(50) DEFAULT NULL,

	`description` text DEFAULT NULL,
  
	`published` boolean DEFAULT 0,

	`function_name` varchar(50) DEFAULT NULL,
  
	FOREIGN KEY (`id_user`) REFERENCES `users`(`id`)
);

DROP TABLE IF EXISTS `solutions`;
CREATE TABLE `solutions` (

	`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
	`id_user` int NOT NULL,
  
	`id_exercise` int NOT NULL,
  
	`script` text DEFAULT NULL,
    
    `language` varchar(50) DEFAULT NULL,
    
	FOREIGN KEY (`id_user`) REFERENCES `users`(`id`),
   
	FOREIGN KEY (`id_exercise`) REFERENCES `exercises`(`id`)
);


DROP TABLE IF EXISTS `test_cases`;
CREATE TABLE `test_cases` (

	`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  
	`id_exercise` int NOT NULL,
    
  `input` text DEFAULT NULL,
    
  `output` text DEFAULT NULL,
  
	FOREIGN KEY (`id_exercise`) REFERENCES `exercises`(`id`)
);




