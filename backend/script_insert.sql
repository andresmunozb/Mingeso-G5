INSERT INTO `roles` ( `name`) VALUES 
('admin'),
('teacher'),
('student');

INSERT INTO `classes` (`name`) VALUES
('B-2');
INSERT INTO `careers` (`name`) VALUES
('Ingeniería Civil Informática'),
('Ingeniería Civil Eléctrica');

INSERT INTO `users` ( `email`,`id_rol`,`id_class`,`id_career`)VALUES 
('diego.mellis@usach.cl', 3,NULL,NULL),
('andres.munoz.b@usach.cl', 1,NULL,NULL),
('af.munoz19@gmail.com', 2,NULL,NULL),
('leiser.mahu@usach.cl',1,NULL,NULL),
('leiser.mahu@gmail.com',1,NULL,NULL);


INSERT INTO `exercises` ( `id_user`,`title`,`description`,`published`,`function_name`)VALUES
(1,'Palindromos','Description 1',false,'palindromo(a)');
