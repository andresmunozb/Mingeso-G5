INSERT INTO `roles` ( `name`) VALUES 
('administrator'),
('coordinator'),
('teacher'),
('student');

INSERT INTO `classes` (`name`) VALUES
('B-2');
INSERT INTO `careers` (`name`) VALUES
('Ingeniería Civil Informática');

INSERT INTO `users` ( `email`,`id_rol`,`id_class`,`id_career`)VALUES 
('diego.mellis@usach.cl', 1,NULL,NULL),
('andres.munoz.b@usach.cl', 2,NULL,NULL),
('leiser.mahu@usach.cl',4,1,1),
('barbara.sarmiento@usach.cl',4,1,1);







