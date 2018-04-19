CREATE DATABASE MelissaTrevino;

USE MelissaTrevino;

CREATE TABLE Users (
    fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    passwrd VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE Orders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    burgerQuantity INT NOT NULL,
	burgerType VARCHAR(30) NOT NULL,
    breadType VARCHAR(30) NOT NULL,
    burgerSize VARCHAR(10) NOT NULL,
    addCondiments VARCHAR(50) NOT NULL,
	addToppings VARCHAR(50) NOT NULL,
	addSauces VARCHAR(50) NOT NULL,
	addFries VARCHAR(6) NOT NULL
);

CREATE TABLE Comment(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
	commentText text NOT NULL,
	FOREIGN KEY(username) REFERENCES Users(username)
);

INSERT INTO 'Users' ('fName', 'lName', 'username', 'passwrd', 'email') VALUES
('Alfredo', 'Salazar', 'alfredo08', '2hkHyq9/i9luCd29u88IRbFQ+QLhbjnDaSn05bhnyW8=', 'alfredo@salazar.com'),
('Axel', 'Suarez', 'axel.srz', 't8AnBYRWiK/r+DEVZPev2qYwkggS6fofImrxr7aUuHI=', 'axel.srz@gmail.com'),
('Hector', 'Rincon', 'hecerinc', '5os1N1MF6o1DhvqwMB8sJpwro6nK2sTyCFMyn+Xu4EU=', 'hecerinc@me.com'),
('Jessica', 'Treviño', 'jessygirl', 'FoMp4s02LhuwE9pJRzrtd+6D3OIs9zqVjXDYhdIzFoc=', 'jessy@me.com'),
('Melissa', 'Treviño', 'melytc', '6cf5itK5eIOBxtZReNVjD2cI0n3Kuebvwr2WVszWuQo=', 'mely.trevic@gmail.com');
		
INSERT INTO Comment(username, commentText)
VALUES  ('melytc', "The most delicious burger I have ever tasted. Great service!"),
        ('axel.srz', "It has quality, a good price, a great taste, and its served as you decide. What else you want?"),
        ('alfredo08', "Came all the way from Notradame to taste these delicious hamburgers. (I am now planning to live over here :) )");