CREATE TABLE `login` (
	`user_id` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`user_id`),
);

CREATE TABLE `registration` (
	`registration_id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phonenumber` INT(9) NOT NULL,
	`team` TEXT(255) NOT NULL,
	`position` varchar(255) NOT NULL,
	`message` varchar(255) NOT NULL,
	PRIMARY KEY (`registration_id`)
);


