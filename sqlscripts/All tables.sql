--CREATE TABLE sessionSlots (
--	session_slot_id INT IDENTITY(1,1) PRIMARY KEY,
--	session_time VARCHAR(11)
--)

--INSERT INTO sessionSlots (session_time)
--VALUES 
--	('10:00-12.00'),
--	('12:00-14:00')

--CREATE TABLE sessionTables (
--	session_table_id INT IDENTITY(1,1) PRIMARY KEY,
--	session_table VARCHAR(20)
--)

--INSERT INTO sessionTables (session_table)
--VALUES
--	('A'),
--	('B'),
--	('C'),
--	('D'),
--	('E'),
--	('F'),
--	('G'),
--	('H')

--CREATE TABLE sessionDates (
--	session_date_id INT IDENTITY(1,1) PRIMARY KEY,
--	session_date DATE
--)

--CREATE TABLE syllabus (
--	syllabus_id INT IDENTITY(1,1),
--	syllabus_name VARCHAR(50)
--	PRIMARY KEY(syllabus_id)
--)

--INSERT INTO syllabus VALUES ('GCSE MATHS HIGHER'), ('GCSE MATHS FOUNDATION')

--CREATE TABLE tests (
--	test_id INT IDENTITY(1,1),
--	test_name VARCHAR(50),
--	syllabus_id INT,
--	mock BIT,
--	PRIMARY KEY(test_id),
--	CONSTRAINT FK_tests_syllabus FOREIGN KEY (syllabus_id) REFERENCES syllabus(syllabus_id) ON DELETE CASCADE
--)

--CREATE TABLE topics (
--	topic_id INT IDENTITY(1,1),
--	topic_name VARCHAR(50),
--	syllabus_id INT,
--	PRIMARY KEY(topic_id),
--	CONSTRAINT FK_topics_syllabus FOREIGN KEY (syllabus_id) REFERENCES syllabus(syllabus_id) ON DELETE CASCADE
--)

--CREATE TABLE questions (
--	question_id INT IDENTITY(1,1),
--	test_id INT,
--	topic_id INT, 
--	difficulty VARCHAR(10),
--	marks INT,
--	PRIMARY KEY(question_id),
--	CONSTRAINT FK_questions_tests FOREIGN KEY (test_id) REFERENCES tests(test_id),
--	CONSTRAINT FK_questions_topics FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
--)

--CREATE TABLE scores (
--	score_id INT IDENTITY(1,1),
--	student_id INT,
--	question_id INT,
--	marks_received INT,
--	test_date DATE,
--	PRIMARY KEY(score_id),
--	CONSTRAINT FK_scores_students FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
--	CONSTRAINT FK_scores_questions FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
--)

--CREATE TABLE testComments (
--	test_comment_id INT IDENTITY(1,1),
--	test_id INT,
--	student_id INT,
--	comment VARCHAR(400),
--	PRIMARY KEY(test_comment_id),
--	CONSTRAINT FK_testComments_tests FOREIGN KEY (test_id) REFERENCES tests(test_id) ON DELETE CASCADE,
--	CONSTRAINT FK_testComments_students FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
--)

--CREATE TABLE rate (
--	rate_id INT IDENTITY(1,1),
--	student_id INT,
--	rate DECIMAL(5,3),
--	rateDate DATE,
--	PRIMARY KEY (rate_id),
--	CONSTRAINT FK_rate_students FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
--)

--CREATE TABLE level (
--	level_id INT IDENTITY(1,1),
--	level varchar(10),
--	PRIMARY KEY (level_id)
--)

--INSERT INTO LEVEL 
--VALUES ('KS2'), ('11+') , ('KS3'), ('GCSE'), ('A-LEVEL')

--CREATE TABLE relation (
--	relation_id int IDENTITY(1,1) PRIMARY KEY,
--	relation_to_child VARCHAR(20)
--)

--INSERT INTO relation
--VALUES
--	('father'),
--	('mother'),
--	('brother'),
--	('sister'),
--	('grandfather'),
--	('grandmother'),
--	('uncle'),
--	('aunt'),
--	('cousin')

--CREATE TABLE family (
--	family_id INT IDENTITY(1,1),
--	full_name VARCHAR(30),
--	address VARCHAR(35),
--	post_code VARCHAR(8),
--	mobile VARCHAR(11),
--	email VARCHAR(40),
--	ec_full_name VARCHAR(30),
--	ec_relation_id INT,
--	ec_address VARCHAR(50),
--	ec_post_code VARCHAR(8),
--	ec_mobile VARCHAR(11),
--	notes VARCHAR(100),
--	PRIMARY KEY(family_id),
--	CONSTRAINT FK_family_relation FOREIGN KEY (ec_relation_id) REFERENCES relation(relation_id),
--)

--CREATE TABLE students (
--	student_id INT IDENTITY(1,1),
--	family_id INT,
--	PRIMARY KEY(student_id),
--	CONSTRAINT FK_students_family FOREIGN KEY (family_id) REFERENCES family(family_id) ON DELETE CASCADE,
--	full_name VARCHAR(30),
--	DOB DATE,
--	school_year INT,
--	school_name VARCHAR(50),
--	medical_info VARCHAR(100),
--	notes VARCHAR(100)
--)

--ALTER TABLE students
--ADD level_id INT

--ALTER TABLE students
--ADD CONSTRAINT FK_students_level FOREIGN KEY (level_id) REFERENCES level(level_id)

--CREATE TABLE studentSessions (
--	student_session_id INT IDENTITY(1,1),
--	student_id INT,
--	session_date_id INT,
--	session_table_id INT,
--	session_slot_id INT,
--	attendance BIT,
--	compensation_id INT,
--	full_session BIT,
--	PRIMARY KEY(student_session_id),
--	CONSTRAINT FK_studentSessions_students FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
--	CONSTRAINT FK_studentSessions_sessionTables FOREIGN KEY (session_table_id) REFERENCES sessionTables(session_table_id),
--	CONSTRAINT FK_studentSessions_sessionDates FOREIGN KEY (session_date_id) REFERENCES sessionDates(session_date_id),
--	CONSTRAINT FK_studentSessions_sessionSlots FOREIGN KEY (session_slot_id) REFERENCES sessionSlots(session_slot_id),
--	CONSTRAINT FK_compensations_studentSessions FOREIGN KEY (compensation_id) REFERENCES studentSessions(student_session_id)
--)	

--CREATE TABLE invoices (
--	invoice_id INT IDENTITY(20000,1),
--	family_id int,
--	invoice_date date,
--	due_date date,
--	start_date date,
--	amount_due decimal(6,2),
--	PRIMARY KEY(invoice_id),
--	CONSTRAINT FK_invoices_family FOREIGN KEY (family_id) REFERENCES family(family_id) ON DELETE CASCADE
--)

--CREATE TABLE invoicesMisc (
--	invoice_misc_id INT IDENTITY(1,1),
--	invoice_id int,
--	description varchar(50),
--	rate decimal(5,2),
--	PRIMARY KEY (invoice_misc_id),
--	CONSTRAINT FK_invoicesMisc_invoices FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON DELETE CASCADE
--)

--CREATE TABLE paymentType 
--(
--	payment_type_id INT IDENTITY(1,1) PRIMARY KEY,
--	payment_type VARCHAR(20)
--)

--INSERT INTO paymentType (payment_type) VALUES ('Cash'), ('Bank Transfer')

--CREATE TABLE payment (
--	payment_id INT IDENTITY(20000,1),
--	family_id int,
--	invoice_id int,
--	payment_date date,
--	amount decimal(5,2),
--	payment_type_id INT,
--	PRIMARY KEY(payment_id),
--	CONSTRAINT FK_payment_family FOREIGN KEY (family_id) REFERENCES family(family_id) ON DELETE CASCADE,
--	CONSTRAINT FK_payment_paymentType FOREIGN KEY (payment_type_id) REFERENCES paymentType(payment_type_id)
--)


