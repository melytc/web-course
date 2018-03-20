CREATE TABLE Users (
	fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    passwrd VARCHAR(50) NOT NULL
    
);

INSERT INTO Users(fName, lName, username, passwrd)
VALUES  ('Alfredo', 'Salazar', 'alfredo08', 'alfred90'),
		('Pamela', 'Rodriguez', 'thePam22', '22mapeht')
        ('Melissa', 'Treviño', 'melytc', 'meme');