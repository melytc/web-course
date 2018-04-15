CREATE TABLE Users (
	fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    username VARCHAR(250) NOT NULL PRIMARY KEY,
    passwrd VARCHAR(250) NOT NULL
    
);

INSERT INTO Users(fName, lName, username, passwrd)
VALUES  ('Alfredo', 'Salazar', 'alfredo08', 'alfred90'),
		('Pamela', 'Rodriguez', 'thePam22', '22mapeht');

CREATE TABLE Items(
	item VARCHAR(30) NOT NULL PRIMARY KEY,
	quantity INT NOT NULL
);

CREATE TABLE Cart(
	orderId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(250) NOT NULL,
	item VARCHAR(30) NOT NULL,
	quantity INT NOT NULL,
	status CHAR(1) NOT NULL,
	FOREIGN KEY (username) 
		REFERENCES Users (username)
		ON DELETE CASCADE,
	FOREIGN KEY (item) 
		REFERENCES Items (item)
		ON DELETE CASCADE
);

INSERT INTO Items(item, quantity)
VALUES ("IPHONE 6 PLUS", 19);

INSERT INTO Cart(username, item, quantity, status)
VALUES ("alfredo08", "IPHONE 6 PLUS", 1, 'P');

INSERT INTO Cart(username, item, quantity, status)
VALUES ("alfredo08", "IPHONE 6 PLUS", 6, 'B');

INSERT INTO Cart(username, item, quantity, status)
VALUES ("alfredo08", "IPHONE 6 PLUS", 1, 'C');