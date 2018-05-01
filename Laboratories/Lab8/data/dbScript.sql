CREATE DATABASE MelissaTrevino;

USE MelissaTrevino;

CREATE TABLE Users(
	fName VARCHAR(30) NOT NULL,
	lName VARCHAR(30) NOT NULL,
	username VARCHAR(50) NOT NULL PRIMARY KEY,
	passwrd VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL
);

CREATE TABLE Comment(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	commentText text NOT NULL,
	FOREIGN KEY(username) REFERENCES Users(username)
);

INSERT INTO Users(fName, lName, username, passwrd, email)
VALUES  ('Alfredo', 'Salazar', 'alfredo08', 'alfred90', 'alfredo@salazar.com'),
		('Pamela', 'Rodriguez', 'thePam22', '22mapeht', 'pam@hotmail.com'),
		('Melissa', 'Treviño', 'melytc', 'meme', 'melytc@gmail.com'),
		('Axel', 'Suárez', 'axel.srz', 'axel', 'axel.srz@gmail.com');

INSERT INTO Comment(username, commentText)
VALUES  ('melytc', "The most delicious burger I have ever tasted. Great service!"),
		('axel.srz', "It has quality, a good price, a great taste, and its served as you decide. What else you want?"),
		('alfredo08', "Came all the way from Notradame to taste these delicious hamburgers. (Im now planning to live over here :) )");

-- Orders functionality
CREATE TABLE Burgers(
	type VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO Burgers(type)
VALUES("Hamburger"), ("Cheese Burger"), ("Bacon Burger"), ("Bacon Cheese Burger");

CREATE TABLE Bread(
	type VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO Bread(type)
VALUES("Wholemeal"), ("White"), ("Rye");

CREATE TABLE Sizes(
	type VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO Sizes(type)
VALUES("small"), ("medium"), ("large");

CREATE TABLE Sauces(
	type VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO Sauces(type)
VALUES("Mr. Burgers Specialty"),("Steak Sauce"),("BBQ Sauce"),("Hot Sauce"),("Honey Mustard"),("Ranch"),("Chipotle"),("Olive");

CREATE TABLE Orders(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	addFries int(11) NOT NULL,
	quantity int(11) NOT NULL,
	burgerType VARCHAR(50) NOT NULL,
	breadType VARCHAR(50) NOT NULL,
	size VARCHAR(50) NOT NULL,
	sauce VARCHAR(50),
	FOREIGN KEY(username) REFERENCES Users(username),
    FOREIGN KEY (burgerType) REFERENCES Burgers(type),
    FOREIGN KEY (breadType) REFERENCES Bread(type),
    FOREIGN KEY (size) REFERENCES Sizes(type),
    FOREIGN KEY (sauce) REFERENCES Sauces(type)
);

CREATE TABLE OrderCondiments(
	idOrder INT UNSIGNED NOT NULL,
	idCondiment VARCHAR(50) NOT NULL,
	FOREIGN KEY (idOrder) REFERENCES Orders(id)
);

CREATE TABLE OrderToppings(
	idOrder INT UNSIGNED NOT NULL,
	idTopping VARCHAR(50) NOT NULL,
	FOREIGN KEY (idOrder) REFERENCES Orders(id)
);