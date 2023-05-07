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
	post_code VARCHAR(8),
	mobile VARCHAR(11),
	email VARCHAR(40),
	ec_full_name VARCHAR(30),
	ec_relation_id INT,
	ec_address VARCHAR(50),
	ec_post_code VARCHAR(8),
	ec_mobile VARCHAR(11),
	notes VARCHAR(100),
	PRIMARY KEY(family_id),
	CONSTRAINT FK_family_relation FOREIGN KEY (ec_relation_id) REFERENCES relation(relation_id),
)

--look up table for school

--DROPPED DUE TO DB STRUCTURE CHANGES
CREATE TABLE school (
	school_id int IDENTITY(1,1) PRIMARY KEY,
	school_name VARCHAR(50)
)

CREATE TABLE students (
	student_id INT IDENTITY(1,1),
	family_id INT,
	PRIMARY KEY(student_id),
	CONSTRAINT FK_students_family FOREIGN KEY (family_id) REFERENCES family(family_id) ON DELETE CASCADE,
	full_name VARCHAR(30),
	DOB DATE,
	school_year INT,
	school_name VARCHAR(50),
	medical_info VARCHAR(100),
	notes VARCHAR(100)
)

create table testDate (
	DOB date
)


insert into testDate 
values (CAST('03/25/2018' AS DATE))
--note: date inserts into sql must be of the form 'mm/dd/yyyy'
insert into testDate
values ('12/19/2020')

--to return a date in the form: 'dd/MM/yyyy' use format
select FORMAT(DOB, 'dd/MM/yyyy') as dob from testDate



-- ALL TABLES FOR TESTS RELATED STUFF

--Dropped level table - no longer being used
CREATE TABLE level (
	level_id INT IDENTITY(1,1) PRIMARY KEY,
	level_name VARCHAR(20)
)

INSERT INTO level
VALUES 
	('KS2'),
	('KS3'),
	('GCSE HIGHER'),
	('GCSE FOUNDATION'),
	('A-LEVEL')

--Dropped subject table - no longer being used
CREATE TABLE subject (
	subject_id INT IDENTITY(1,1) PRIMARY KEY,
	subject_name VARCHAR(20)
)

INSERT INTO subject
VALUES 
	('MATH'),
	('SCIENCE'),
	('ENGLISH')


CREATE TABLE syllabus (
	syllabus_id INT IDENTITY(1,1),
	syllabus_name VARCHAR(50)
	--level_id INT,
	--subject_id INT,
	PRIMARY KEY(syllabus_id),
	--CONSTRAINT FK_syllabus_level FOREIGN KEY (level_id) REFERENCES level(level_id) ON DELETE CASCADE,
	--CONSTRAINT FK_syllabus_subject FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE
)

--create a maths syllabus (GCSE MATHS HIGHER, GCSE MATHS FOUNDATION) - no longer used
INSERT INTO syllabus (level_id, subject_id)
VALUES 
	(3,1),
	(4,1)

CREATE TABLE tests (
	test_id INT IDENTITY(1,1),
	test_name VARCHAR(50),
	syllabus_id INT,
	PRIMARY KEY(test_id),
	CONSTRAINT FK_tests_syllabus FOREIGN KEY (syllabus_id) REFERENCES syllabus(syllabus_id) ON DELETE CASCADE
)

CREATE TABLE topics (
	topic_id INT IDENTITY(1,1),
	topic_name VARCHAR(50),
	syllabus_id INT,
	PRIMARY KEY(topic_id),
	CONSTRAINT FK_topics_syllabus FOREIGN KEY (syllabus_id) REFERENCES syllabus(syllabus_id) ON DELETE CASCADE
)

-- insert all maths topics: first import the excel sheets into tables called tempHigher and tempFoundation, then use the following to add all the distinct topic names into topics for the math subject via a temp table
select distinct topic into #temp from tempHigher
UNION
select distinct topic from tempFoundation

alter table #temp add subject_id int

update #temp
set subject_id = (select subject_id from subject where subject_name='Math')

INSERT INTO topics 
select * from #temp


--continue creating the rest of the tables

CREATE TABLE questions (
	question_id INT IDENTITY(1,1),
	test_id INT,
	topic_id INT, 
	difficulty VARCHAR(10),
	marks INT,
	PRIMARY KEY(question_id),
	CONSTRAINT FK_questions_tests FOREIGN KEY (test_id) REFERENCES tests(test_id),
	CONSTRAINT FK_questions_topics FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
)

CREATE TABLE scores (
	score_id INT IDENTITY(1,1),
	student_id INT,
	question_id INT,
	marks_received INT,
	test_date DATE,
	PRIMARY KEY(score_id),
	CONSTRAINT FK_scores_students FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
	CONSTRAINT FK_scores_questions FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
)

CREATE TABLE testComments (
	test_comment_id INT IDENTITY(1,1),
	test_id INT,
	student_id INT,
	comments VARCHAR(MAX),
	PRIMARY KEY(test_comment_id),
	CONSTRAINT FK_testComments_tests FOREIGN KEY (test_id) REFERENCES tests(test_id) ON DELETE CASCADE,
	CONSTRAINT FK_testComments_students FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
)

--INCREMENT 3 TABLES:

CREATE TABLE sessionSlots (
	session_slot_id INT IDENTITY(1,1) PRIMARY KEY,
	session_time VARCHAR(11)
)

INSERT INTO sessionSlots (session_time)
VALUES 
	('10:00-12.00'),
	('12:00-14:00')

CREATE TABLE sessionTables (
	session_table_id INT IDENTITY(1,1) PRIMARY KEY,
	session_table VARCHAR(20)
)

INSERT INTO sessionTables (session_table)
VALUES
	('A'),
	('B'),
	('C'),
	('D'),
	('E'),
	('F'),
	('G'),
	('H')

CREATE TABLE sessionDates (
	session_date_id INT IDENTITY(1,1) PRIMARY KEY,
	session_date DATE
)

INSERT INTO sessionDates (session_date)
VALUES 
	('02/04/2023'),
	('02/05/2023'),
	('02/11/2023'),
	('02/12/2023'),
	('02/18/2023'),
	('02/19/2023'),
	('02/25/2023'),
	('02/26/2023')

CREATE TABLE studentSessions (
	student_session_id INT IDENTITY(1,1),
	student_id INT,
	session_date_id INT,
	session_table_id INT,
	session_slot_id INT,
	attendance BIT,
	compensation_id INT
	PRIMARY KEY(student_session_id),
	CONSTRAINT FK_studentSessions_students FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
	CONSTRAINT FK_studentSessions_sessionTables FOREIGN KEY (session_table_id) REFERENCES sessionTables(session_table_id),
	CONSTRAINT FK_studentSessions_sessionDates FOREIGN KEY (session_date_id) REFERENCES sessionDates(session_date_id),
	CONSTRAINT FK_studentSessions_sessionSlots FOREIGN KEY (session_slot_id) REFERENCES sessionSlots(session_slot_id),
	CONSTRAINT FK_compensations_studentSessions FOREIGN KEY (compensation_id) REFERENCES studentSessions(student_session_id)
)																													 
																													 

INSERT INTO studentSessions (student_id, session_date_id, session_table_id, session_slot_id)
VALUES 
	(1016, 1, 1, 1),
	(1016, 2, 1, 1),
	(1018, 1, 1, 1),
	(1018, 2, 1, 1),
	(1019, 1, 2, 2),
	(1019, 2, 2, 1),
	(1023, 1, 2, 1),
	(1023, 2, 2, 2),
	(1026, 1, 3, 1),
	(1026, 2, 3, 2),
	(1031, 1, 2, 1),
	(1031, 1, 1, 2),
	(1032, 1, 3, 2),
	(1032, 2, 3, 2),
	(2033, 1, 1, 2),
	(2033, 2, 3, 1)



--INCREMENT 4 TABLES + CHANGES:

ALTER TABLE studentSessions
ADD full_session BIT

CREATE TABLE level (
	level_id INT IDENTITY(1,1),
	level varchar(10),
	PRIMARY KEY (level_id)
)

INSERT INTO LEVEL 
VALUES ('KS2'), ('11+') , ('KS3'), ('GCSE'), ('A-LEVEL')

ALTER TABLE students
ADD level_id INT

ALTER TABLE students
ADD CONSTRAINT FK_students_level FOREIGN KEY (level_id) REFERENCES level(level_id)


CREATE TABLE rate (
	rate_id INT IDENTITY(1,1),
	student_id INT,
	rate DECIMAL(5,3),
	PRIMARY KEY (rate_id),
	CONSTRAINT FK_rate_students FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
)