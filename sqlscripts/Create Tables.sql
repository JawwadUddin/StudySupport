CREATE DATABASE studysupport;

--look up table for the relation betwen family and emergency contact
CREATE TABLE relation (
	relation_id int IDENTITY(1,1) PRIMARY KEY,
	relation_to_student VARCHAR(20)
)

INSERT INTO relation
VALUES
	('father'),
	('mother'),
	('brother'),
	('sister'),
	('grandfather'),
	('grandmother'),
	('uncle'),
	('aunt'),
	('cousin')

CREATE TABLE family (
	family_id INT IDENTITY(1,1),
	full_name VARCHAR(30),
	address VARCHAR(35),
	city VARCHAR(25),
	post_code VARCHAR(8),
	mobile VARCHAR(11),
	email VARCHAR(40),
	ec_full_name VARCHAR(30),
	ec_relation_id INT,
	ec_address VARCHAR(50),
	ec_mobile VARCHAR(11),
	notes VARCHAR(100),
	PRIMARY KEY(family_id),
	CONSTRAINT FK_family_relation FOREIGN KEY (ec_relation_id) REFERENCES relation(relation_id),
)

insert into family(full_name, city, mobile)
values 
	('Jawwad family', 'London', '123'),
	('Maher family', 'Greater', '493'),
	('Mo family', 'Leyton', '992')

--look up table for school
CREATE TABLE school (
	school_id int IDENTITY(1,1) PRIMARY KEY,
	school_name VARCHAR(50)
)

CREATE TABLE students (
	student_id INT IDENTITY(1,1),
	family_id INT,
	PRIMARY KEY(student_id),
	CONSTRAINT FK_students_family FOREIGN KEY (family_id) REFERENCES family(family_id),
	full_name VARCHAR(30),
	DOB DATE,
	school_year INT,
	school_id INT,
	CONSTRAINT FK_students_school FOREIGN KEY (school_id) REFERENCES school(school_id),
	medical_info VARCHAR(100),
	notes VARCHAR(100)
)

