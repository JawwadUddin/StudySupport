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
	level_id INT,
	subject_id INT,
	PRIMARY KEY(syllabus_id),
	CONSTRAINT FK_syllabus_level FOREIGN KEY (level_id) REFERENCES level(level_id) ON DELETE CASCADE,
	CONSTRAINT FK_syllabus_subject FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE
)

--create a maths syllabus (GCSE MATHS HIGHER, GCSE MATHS FOUNDATION)
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
	subject_id INT,
	PRIMARY KEY(topic_id),
	CONSTRAINT FK_topics_subject FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE
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

