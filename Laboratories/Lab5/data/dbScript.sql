CREATE DATABASE MelissaTrevino;

CREATE TABLE Users (
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
        ('axel.srz', "It has quality, a good price, a great taste, and it's served as you decide. What else you want?"),
        ('alfredo08', "Came all the way from Notradame to taste these delicious hamburgers. (I'm now planning to live over here :) )");