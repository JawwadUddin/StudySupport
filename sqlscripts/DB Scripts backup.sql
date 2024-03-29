USE [studysupport]
GO
/****** Object:  User [guestuser]    Script Date: 08/02/2023 14:38:35 ******/
CREATE USER [guestuser] FOR LOGIN [guestuser] WITH DEFAULT_SCHEMA=[portal]
GO
/****** Object:  DatabaseRole [PortalUser]    Script Date: 08/02/2023 14:38:35 ******/
CREATE ROLE [PortalUser]
GO
ALTER ROLE [PortalUser] ADD MEMBER [guestuser]
GO
/****** Object:  Schema [portal]    Script Date: 08/02/2023 14:38:35 ******/
CREATE SCHEMA [portal]
GO
/****** Object:  Table [dbo].[compensations]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[compensations](
	[compensation_id] [int] IDENTITY(1,1) NOT NULL,
	[student_session_id] [int] NULL,
	[session_date_id] [int] NULL,
	[session_table_id] [int] NULL,
	[session_slot_id] [int] NULL,
	[attendance] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[compensation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[family]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[family](
	[family_id] [int] IDENTITY(1,1) NOT NULL,
	[full_name] [varchar](30) NULL,
	[address] [varchar](35) NULL,
	[post_code] [varchar](8) NULL,
	[mobile] [varchar](11) NULL,
	[email] [varchar](40) NULL,
	[ec_full_name] [varchar](30) NULL,
	[ec_relation_id] [int] NULL,
	[ec_address] [varchar](50) NULL,
	[ec_mobile] [varchar](11) NULL,
	[notes] [varchar](100) NULL,
	[ec_post_code] [varchar](8) NULL,
PRIMARY KEY CLUSTERED 
(
	[family_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[questions]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[questions](
	[question_id] [int] IDENTITY(1,1) NOT NULL,
	[test_id] [int] NULL,
	[topic_id] [int] NULL,
	[difficulty] [varchar](10) NULL,
	[marks] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[relation]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[relation](
	[relation_id] [int] IDENTITY(1,1) NOT NULL,
	[relation_to_child] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[relation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[scores]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[scores](
	[score_id] [int] IDENTITY(1,1) NOT NULL,
	[student_id] [int] NULL,
	[question_id] [int] NULL,
	[marks_received] [int] NULL,
	[test_date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[score_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sessionDates]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sessionDates](
	[session_date_id] [int] IDENTITY(1,1) NOT NULL,
	[session_date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[session_date_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sessionSlots]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sessionSlots](
	[session_slot_id] [int] IDENTITY(1,1) NOT NULL,
	[session_time] [varchar](11) NULL,
PRIMARY KEY CLUSTERED 
(
	[session_slot_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sessionTables]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sessionTables](
	[session_table_id] [int] IDENTITY(1,1) NOT NULL,
	[session_table] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[session_table_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[students]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[students](
	[student_id] [int] IDENTITY(1,1) NOT NULL,
	[family_id] [int] NULL,
	[full_name] [varchar](30) NULL,
	[DOB] [date] NULL,
	[school_year] [int] NULL,
	[medical_info] [varchar](100) NULL,
	[notes] [varchar](100) NULL,
	[school_name] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[student_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[studentSessions]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[studentSessions](
	[student_session_id] [int] IDENTITY(1,1) NOT NULL,
	[student_id] [int] NULL,
	[session_date_id] [int] NULL,
	[session_table_id] [int] NULL,
	[session_slot_id] [int] NULL,
	[attendance] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[student_session_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[syllabus]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[syllabus](
	[syllabus_id] [int] IDENTITY(1,1) NOT NULL,
	[syllabus_name] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[syllabus_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tempFoundation]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tempFoundation](
	[Topic no#] [float] NULL,
	[Topic] [nvarchar](255) NULL,
	[Name of Download] [nvarchar](255) NULL,
	[Downloaded?] [nvarchar](255) NULL,
	[Source] [nvarchar](255) NULL,
	[Book] [nvarchar](255) NULL,
	[Grade] [nvarchar](255) NULL,
	[Pages] [float] NULL,
	[F9] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tempHigher]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tempHigher](
	[Topic no#] [float] NULL,
	[Topic] [nvarchar](255) NULL,
	[Name of Download] [nvarchar](255) NULL,
	[Downloaded?] [nvarchar](255) NULL,
	[Source] [nvarchar](255) NULL,
	[Book] [nvarchar](255) NULL,
	[Grade] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[testComments]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[testComments](
	[test_comment_id] [int] IDENTITY(1,1) NOT NULL,
	[test_id] [int] NULL,
	[student_id] [int] NULL,
	[comment] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[test_comment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[testDate]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[testDate](
	[DOB] [date] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tests]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tests](
	[test_id] [int] IDENTITY(1,1) NOT NULL,
	[test_name] [varchar](50) NULL,
	[syllabus_id] [int] NULL,
	[mock] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[test_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[topics]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[topics](
	[topic_id] [int] IDENTITY(1,1) NOT NULL,
	[topic_name] [varchar](50) NULL,
	[syllabus_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[topic_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[compensations]  WITH CHECK ADD  CONSTRAINT [FK_compensations_sessionDates] FOREIGN KEY([session_date_id])
REFERENCES [dbo].[sessionDates] ([session_date_id])
GO
ALTER TABLE [dbo].[compensations] CHECK CONSTRAINT [FK_compensations_sessionDates]
GO
ALTER TABLE [dbo].[compensations]  WITH CHECK ADD  CONSTRAINT [FK_compensations_sessionSlots] FOREIGN KEY([session_slot_id])
REFERENCES [dbo].[sessionSlots] ([session_slot_id])
GO
ALTER TABLE [dbo].[compensations] CHECK CONSTRAINT [FK_compensations_sessionSlots]
GO
ALTER TABLE [dbo].[compensations]  WITH CHECK ADD  CONSTRAINT [FK_compensations_sessionTables] FOREIGN KEY([session_table_id])
REFERENCES [dbo].[sessionTables] ([session_table_id])
GO
ALTER TABLE [dbo].[compensations] CHECK CONSTRAINT [FK_compensations_sessionTables]
GO
ALTER TABLE [dbo].[compensations]  WITH CHECK ADD  CONSTRAINT [FK_compensations_studentSessions] FOREIGN KEY([student_session_id])
REFERENCES [dbo].[studentSessions] ([student_session_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[compensations] CHECK CONSTRAINT [FK_compensations_studentSessions]
GO
ALTER TABLE [dbo].[family]  WITH CHECK ADD  CONSTRAINT [FK_family_relation] FOREIGN KEY([ec_relation_id])
REFERENCES [dbo].[relation] ([relation_id])
GO
ALTER TABLE [dbo].[family] CHECK CONSTRAINT [FK_family_relation]
GO
ALTER TABLE [dbo].[questions]  WITH CHECK ADD  CONSTRAINT [FK_questions_tests] FOREIGN KEY([test_id])
REFERENCES [dbo].[tests] ([test_id])
GO
ALTER TABLE [dbo].[questions] CHECK CONSTRAINT [FK_questions_tests]
GO
ALTER TABLE [dbo].[questions]  WITH CHECK ADD  CONSTRAINT [FK_questions_topics] FOREIGN KEY([topic_id])
REFERENCES [dbo].[topics] ([topic_id])
GO
ALTER TABLE [dbo].[questions] CHECK CONSTRAINT [FK_questions_topics]
GO
ALTER TABLE [dbo].[scores]  WITH CHECK ADD  CONSTRAINT [FK_scores_questions] FOREIGN KEY([question_id])
REFERENCES [dbo].[questions] ([question_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[scores] CHECK CONSTRAINT [FK_scores_questions]
GO
ALTER TABLE [dbo].[scores]  WITH CHECK ADD  CONSTRAINT [FK_scores_students] FOREIGN KEY([student_id])
REFERENCES [dbo].[students] ([student_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[scores] CHECK CONSTRAINT [FK_scores_students]
GO
ALTER TABLE [dbo].[students]  WITH CHECK ADD  CONSTRAINT [FK_students_family] FOREIGN KEY([family_id])
REFERENCES [dbo].[family] ([family_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[students] CHECK CONSTRAINT [FK_students_family]
GO
ALTER TABLE [dbo].[studentSessions]  WITH CHECK ADD  CONSTRAINT [FK_studentSessions_sessionDates] FOREIGN KEY([session_date_id])
REFERENCES [dbo].[sessionDates] ([session_date_id])
GO
ALTER TABLE [dbo].[studentSessions] CHECK CONSTRAINT [FK_studentSessions_sessionDates]
GO
ALTER TABLE [dbo].[studentSessions]  WITH CHECK ADD  CONSTRAINT [FK_studentSessions_sessionSlots] FOREIGN KEY([session_slot_id])
REFERENCES [dbo].[sessionSlots] ([session_slot_id])
GO
ALTER TABLE [dbo].[studentSessions] CHECK CONSTRAINT [FK_studentSessions_sessionSlots]
GO
ALTER TABLE [dbo].[studentSessions]  WITH CHECK ADD  CONSTRAINT [FK_studentSessions_sessionTables] FOREIGN KEY([session_table_id])
REFERENCES [dbo].[sessionTables] ([session_table_id])
GO
ALTER TABLE [dbo].[studentSessions] CHECK CONSTRAINT [FK_studentSessions_sessionTables]
GO
ALTER TABLE [dbo].[studentSessions]  WITH CHECK ADD  CONSTRAINT [FK_studentSessions_students] FOREIGN KEY([student_id])
REFERENCES [dbo].[students] ([student_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[studentSessions] CHECK CONSTRAINT [FK_studentSessions_students]
GO
ALTER TABLE [dbo].[testComments]  WITH CHECK ADD  CONSTRAINT [FK_testComments_students] FOREIGN KEY([student_id])
REFERENCES [dbo].[students] ([student_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[testComments] CHECK CONSTRAINT [FK_testComments_students]
GO
ALTER TABLE [dbo].[testComments]  WITH CHECK ADD  CONSTRAINT [FK_testComments_tests] FOREIGN KEY([test_id])
REFERENCES [dbo].[tests] ([test_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[testComments] CHECK CONSTRAINT [FK_testComments_tests]
GO
ALTER TABLE [dbo].[tests]  WITH CHECK ADD  CONSTRAINT [FK_tests_syllabus] FOREIGN KEY([syllabus_id])
REFERENCES [dbo].[syllabus] ([syllabus_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tests] CHECK CONSTRAINT [FK_tests_syllabus]
GO
ALTER TABLE [dbo].[topics]  WITH CHECK ADD  CONSTRAINT [FK_topics_syllabus] FOREIGN KEY([syllabus_id])
REFERENCES [dbo].[syllabus] ([syllabus_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[topics] CHECK CONSTRAINT [FK_topics_syllabus]
GO
/****** Object:  StoredProcedure [portal].[DeleteFamilyByID]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteFamilyByID] @FamilyID INT
AS
DELETE FROM family WHERE family_id=@FamilyID
GO
/****** Object:  StoredProcedure [portal].[DeleteQuestionByID]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteQuestionByID] @QuestionID INT
AS
DELETE FROM questions 
WHERE question_id = @QuestionID
GO
/****** Object:  StoredProcedure [portal].[DeleteStudentByID]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteStudentByID] @StudentID INT
AS 
DELETE FROM students WHERE student_id = @StudentID
GO
/****** Object:  StoredProcedure [portal].[DeleteTestByID]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteTestByID] @TestID INT
AS
BEGIN

DELETE FROM questions
WHERE question_id IN
(SELECT question_id FROM questions WHERE test_id = @TestID)

DELETE FROM tests
WHERE test_id = @TestID

END
GO
/****** Object:  StoredProcedure [portal].[DeleteTopicByID]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteTopicByID] @TopicID INT
AS
DELETE FROM topics
WHERE topic_id = @TopicID
GO
/****** Object:  StoredProcedure [portal].[InsertFamily]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertFamily]
	@FullName VARCHAR(30),
	@Address VARCHAR(35),
	@PostCode VARCHAR(8),
	@Mobile VARCHAR(11),
	@Email VARCHAR(40),
	@ecFullName VARCHAR(30),
	@ecRelation VARCHAR(20),
	@ecAddress VARCHAR(50),
	@ecPostCode VARCHAR(8),
	@ecMobile VARCHAR(11),
	@Notes VARCHAR(100),
	@FamilyID INT OUTPUT
AS

DECLARE @InsertedFamilyID table (ID INT);
DECLARE @RelationID AS INT = (SELECT relation_id from relation WHERE relation_to_child = @ecRelation);

INSERT INTO family (full_name, address, post_code, mobile, email, ec_full_name, ec_relation_id, ec_address, ec_post_code, ec_mobile, notes)
OUTPUT INSERTED.family_id
INTO @InsertedFamilyID
VALUES (@FullName, @Address, @PostCode, @Mobile, @Email, @ecFullName, @RelationID, @ecAddress, @ecPostCode, @ecMobile, @Notes)

DECLARE @NewFamilyID INT = (SELECT TOP 1 ID FROM @InsertedFamilyID);

SELECT @FamilyID = @NewFamilyID
GO
/****** Object:  StoredProcedure [portal].[InsertQuestion]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertQuestion] 
(
	@TestID INT,
	@TopicID INT,
	@Difficulty VARCHAR(10),
	@Marks INT
)
AS
INSERT INTO dbo.questions (test_id, topic_id, difficulty, marks)
VALUES 
	(@TestID, @TopicID, @Difficulty, @Marks)
GO
/****** Object:  StoredProcedure [portal].[InsertRelation]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertRelation] @Relation VARCHAR(20)
AS

INSERT INTO dbo.relation
VALUES (@Relation)
GO
/****** Object:  StoredProcedure [portal].[InsertSchool]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertSchool] @School VARCHAR(50)
AS
INSERT INTO dbo.school
VALUES (@School)
GO
/****** Object:  StoredProcedure [portal].[InsertStudent]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertStudent] 
	@FamilyID INT,
	@FullName VARCHAR(30),
	@DOB DATE,
	@SchoolYear INT,
	@School VARCHAR(50),
	@MedicalInfo VARCHAR(100),
	@Notes VARCHAR(100),
	@StudentID INT OUTPUT
AS

DECLARE @InsertedStudentID AS TABLE (ID INT);

INSERT INTO dbo.students (family_id, full_name, DOB, school_year, school_name, medical_info, notes)
OUTPUT INSERTED.student_id
INTO @InsertedStudentID
VALUES (@FamilyID, @FullName, @DOB, @SchoolYear, @School, @MedicalInfo, @Notes)

DECLARE @NewStudentID AS INT = (SELECT TOP 1 ID FROM @InsertedStudentID);

SELECT @StudentID = @NewStudentID
GO
/****** Object:  StoredProcedure [portal].[InsertStudentScores]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertStudentScores] 
(
	@StudentID INT,
	@TestDate DATE,
	@JsonScores VARCHAR(MAX)
)
AS

BEGIN


INSERT INTO dbo.scores (student_id, question_id, marks_received, test_date)
SELECT
	@StudentID AS StudentID,
	temp.question_id,
	temp.marks_received,
	@TestDate AS test_date
	FROM 
	(SELECT * FROM OPENJSON(@JsonScores) 
		WITH (
			question_id INT '$.question_id',
			marks_received INT '$.marks_received'
		)
	) AS temp

END
GO
/****** Object:  StoredProcedure [portal].[InsertStudentTestComment]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertStudentTestComment] 
(
	@TestID INT,
	@StudentID INT,
	@Comment VARCHAR(MAX)
) 
AS
INSERT INTO dbo.testComments (test_id, student_id, comment)
VALUES (@TestID, @StudentID, @Comment)
GO
/****** Object:  StoredProcedure [portal].[InsertSyllabus]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertSyllabus] 
(
	@SyllabusName VARCHAR(50),
	@JsonTopics VARCHAR(MAX),
	@SyllabusID INT OUTPUT
)
AS
BEGIN

DECLARE @InsertedSyllabusID AS TABLE (ID INT);

INSERT INTO syllabus (syllabus_name)
OUTPUT Inserted.syllabus_id
INTO @InsertedSyllabusID
VALUES (@SyllabusName)


DECLARE @NewSyllabusID AS INT = (SELECT TOP 1 ID FROM @InsertedSyllabusID)

INSERT INTO topics (topic_name, syllabus_id)
SELECT 
	temp.topic_name,
	@NewSyllabusID AS syllabus_id
	FROM
(SELECT * 
	FROM OPENJSON(@JsonTopics)
    WITH (  
        topic_name VARCHAR(10) '$.topicName'
		)) as temp

SELECT @SyllabusID = @NewSyllabusID

END
GO
/****** Object:  StoredProcedure [portal].[InsertTest]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertTest]
(
	@TestName VARCHAR(50),
	@Type BIT,
	@SyllabusID INT,
	@JsonQuestions VARCHAR(MAX),
	@TestID INT OUTPUT
)
AS
BEGIN

DECLARE @InsertedTestID AS TABLE (ID INT);

INSERT INTO tests (test_name, syllabus_id, mock)
OUTPUT Inserted.test_id
INTO @InsertedTestID
VALUES (@TestName, @SyllabusID, @Type)

DECLARE @NewTestID AS INT = (SELECT TOP 1 ID FROM @InsertedTestID)

INSERT INTO dbo.questions (test_id, topic_id, difficulty, marks)
SELECT @NewTestID AS test_id, 
	temp.topic_id,
	temp.difficulty,
	temp.marks
	FROM
(SELECT * 
	FROM OPENJSON(@JsonQuestions)
    WITH (  
		topic_id int '$.topicID',
        difficulty VARCHAR(10) '$.difficulty',
        marks int '$.marks'
		)) as temp

SELECT @TestID = @NewTestID

END
GO
/****** Object:  StoredProcedure [portal].[InsertTopic]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertTopic] 
(
	@TopicName VARCHAR(50),
	@SyllabusID INT
)
AS
INSERT INTO topics (topic_name, syllabus_id)
VALUES (@TopicName, @SyllabusID)
GO
/****** Object:  StoredProcedure [portal].[SelectAllFamilies]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllFamilies]
AS
SELECT 
	family_id,
	full_name,
	address,
	post_code,
	mobile,
	email,
	ec_full_name,
	relation_to_child,
	ec_address,
	ec_post_code,
	ec_mobile,
	notes
FROM dbo.family f
LEFT JOIN dbo.relation r ON f.ec_relation_id = r.relation_id
GO
/****** Object:  StoredProcedure [portal].[SelectAllRelations]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllRelations]
AS
(
SELECT * FROM dbo.relation
)
GO
/****** Object:  StoredProcedure [portal].[SelectAllSchools]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllSchools]
AS
(
SELECT * FROM dbo.school
)
GO
/****** Object:  StoredProcedure [portal].[SelectAllStudents]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllStudents]
AS

SELECT 
	student_id,
	family_id,
	full_name,
	FORMAT(DOB, 'dd/MM/yyyy') AS DOB,
	school_year,
	school_name,
	medical_info,
	notes
FROM dbo.students s

GO
/****** Object:  StoredProcedure [portal].[SelectAllSyllabuses]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllSyllabuses]
AS
SELECT 
syllabus_id,
syllabus_name
FROM syllabus s
GO
/****** Object:  StoredProcedure [portal].[SelectAllTests]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllTests]
AS
SELECT 
	test_id,
	test_name,
	mock,
	t.syllabus_id,
	syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id
GO
/****** Object:  StoredProcedure [portal].[SelectFamilyByID]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectFamilyByID] @FamilyID INT
AS
SELECT 
	full_name,
	address,
	post_code,
	mobile,
	email,
	ec_full_name,
	relation_to_child,
	ec_address,
	ec_post_code,
	ec_mobile,
	notes
FROM dbo.family f
LEFT JOIN dbo.relation r ON f.ec_relation_id = r.relation_id
WHERE f.family_id = @FamilyID
GO
/****** Object:  StoredProcedure [portal].[SelectQuestionsForTest]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectQuestionsForTest] @TestID INT
AS
SELECT 
	question_id,
	test_id,
	q.topic_id,
	topic_name,
	difficulty,
	marks
FROM questions q
INNER JOIN topics t
ON q.topic_id = t.topic_id
WHERE test_id = @TestID
GO
/****** Object:  StoredProcedure [portal].[SelectRegister]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectRegister] @SessionDate DATE
AS 
BEGIN
SELECT
	d.session_date,
	sessions = (
		SELECT session_time, 
		tables = (
			SELECT session_table,
			students = (
				SELECT s.student_id, attendance, full_name 
				FROM studentSessions s
				INNER JOIN students st on s.student_id = st.student_id
					WHERE s.session_date_id = d.session_date_id 
					AND s.session_table_id = t.session_table_id
					AND s.session_slot_id = l.session_slot_id
				FOR JSON PATH
			)
			FROM sessionTables t 
			FOR JSON PATH
		)
		FROM sessionSlots l
		FOR JSON PATH
	) 
FROM sessionDates d
WHERE session_date = @SessionDate
FOR JSON PATH
END
GO
/****** Object:  StoredProcedure [portal].[SelectStudentByID]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentByID] @StudentID INT
AS

SELECT 
	student_id,
	family_id,
	full_name,
	FORMAT(DOB, 'dd/MM/yyyy') AS DOB,
	school_year,
	school_name,
	medical_info,
	notes
FROM dbo.students s 
WHERE s.student_id = @StudentID
GO
/****** Object:  StoredProcedure [portal].[SelectStudentScoresBySyllabusID]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentScoresBySyllabusID] @StudentID INT, @SyllabusID INT
AS
select score_id, s.question_id, marks_received, marks, topic_id, q.test_id from scores s
inner join questions q
on s.question_id = q.question_id
inner join tests t
on q.test_id = t.test_id
where student_id= @StudentID
and syllabus_id = @SyllabusID

GO
/****** Object:  StoredProcedure [portal].[SelectStudentScoresByTestID]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentScoresByTestID]
(
	@StudentID INT,
	@TestID INT
)
AS

BEGIN

SELECT 
	score_id,
	s.question_id,
	marks_received,
	marks,
	topic_name,
	difficulty
FROM dbo.scores s 
INNER JOIN dbo.questions q on q.question_id = s.question_id
INNER JOIN dbo.topics t on q.topic_id = t.topic_id
WHERE student_id = @StudentID
and test_id = @TestID

END
GO
/****** Object:  StoredProcedure [portal].[SelectStudentsOfFamily]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentsOfFamily] @FamilyID INT
AS 
(
SELECT * FROM students WHERE family_id = @FamilyID
)
GO
/****** Object:  StoredProcedure [portal].[SelectStudentTestComment]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentTestComment] 
(
	@StudentID INT, 
	@TestID INT
)
AS
SELECT * from testComments WHERE student_id = @StudentID AND test_id = @TestID

GO
/****** Object:  StoredProcedure [portal].[SelectStudentTestsCompleted]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentTestsCompleted] @StudentID INT
AS 
SELECT temp.test_id, test_name, syllabus_id, SUM(temp.marks_received) as marks_received,  SUM(temp.marks) as marks from 
(SELECT q.test_id, test_name, syllabus_id, marks, marks_received from scores s 
INNER JOIN questions q on s.question_id = q.question_id
INNER JOIN tests t on q.test_id = t.test_id
where student_id = @StudentID) as temp
GROUP BY test_id, test_name, syllabus_id

GO
/****** Object:  StoredProcedure [portal].[SelectStudentTestsCompletedBySyllabusID]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentTestsCompletedBySyllabusID] @StudentID INT, @SyllabusID INT
AS
begin
select distinct q.test_id, test_name, mock from scores s
inner join questions q on s.question_id = q.question_id
inner join tests t on q.test_id = t.test_id
where student_id = @StudentID and syllabus_id = @SyllabusID
end
GO
/****** Object:  StoredProcedure [portal].[SelectTestsBySyllabus]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectTestsBySyllabus] @SyllabusID INT
AS
SELECT 
	test_id,
	test_name,
	mock,
	syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id
WHERE t.syllabus_id = @SyllabusID
GO
/****** Object:  StoredProcedure [portal].[SelectTopicsBySyllabus]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [portal].[SelectTopicsBySyllabus] @SyllabusID INT
AS 
(
SELECT topic_id, topic_name FROM syllabus s 
INNER JOIN topics t on s.syllabus_id = t.syllabus_id
WHERE s.syllabus_id = @SyllabusID
)
GO
/****** Object:  StoredProcedure [portal].[SelectTopicsStudentTestedOn]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectTopicsStudentTestedOn]
(
	@SyllabusID INT,
	@StudentID INT
)
AS
BEGIN

select distinct topic_name, q.topic_id from scores s 
inner join questions q on s.question_id = q.question_id
inner join topics t on q.topic_id = t.topic_id
where student_id = @StudentID
and syllabus_id = @SyllabusID

END
GO
/****** Object:  StoredProcedure [portal].[UpdateFamily]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateFamily]
	@FamilyID INT,
	@FullName VARCHAR(30),
	@Address VARCHAR(35),
	@PostCode VARCHAR(8),
	@Mobile VARCHAR(11),
	@Email VARCHAR(40),
	@ecFullName VARCHAR(30),
	@ecRelation VARCHAR(20),
	@ecAddress VARCHAR(50),
	@ecPostCode VARCHAR(8),
	@ecMobile VARCHAR(11),
	@Notes VARCHAR(100)

AS

DECLARE @RelationID AS INT = (SELECT relation_id from relation WHERE relation_to_child = @ecRelation);

UPDATE family
SET full_name = @FullName,
	address = @Address,
	post_code = @PostCode,
	mobile = @Mobile,
	email = @Email,
	ec_full_name = @ecFullName,
	ec_relation_id = @RelationID,
	ec_address = @ecAddress,
	ec_post_code = @ecPostCode,
	ec_mobile = @ecMobile,
	notes = @Notes
WHERE family_id = @FamilyID
GO
/****** Object:  StoredProcedure [portal].[UpdateQuestion]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateQuestion] 
(
	@QuestionID INT,
	@TopicID INT,
	@Difficulty VARCHAR(10),
	@Marks INT
)
AS

UPDATE questions
SET topic_id = @TopicID,
	difficulty = @Difficulty,
	marks = @Marks
WHERE question_id = @QuestionID
GO
/****** Object:  StoredProcedure [portal].[UpdateRelation]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateRelation]
	@RelationID INT,
	@Relation VARCHAR(20)
AS 

UPDATE dbo.relation
SET relation_to_child = @Relation
WHERE relation_id = @RelationID
GO
/****** Object:  StoredProcedure [portal].[UpdateSchool]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateSchool]
	@SchoolID INT,
	@School VARCHAR(50)

AS

UPDATE dbo.school
SET school_name = @School
WHERE school_id = @SchoolID
GO
/****** Object:  StoredProcedure [portal].[UpdateScore]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateScore] 
(
	@ScoreID INT,
	@MarksReceived INT
)
AS
UPDATE scores
SET marks_received = @MarksReceived
WHERE scores.score_id = @ScoreID
GO
/****** Object:  StoredProcedure [portal].[UpdateStudent]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateStudent] 
	@StudentID INT,
	@FamilyID INT,
	@FullName VARCHAR(30),
	@DOB DATE,
	@SchoolYear INT,
	@School VARCHAR(50),
	@MedicalInfo VARCHAR(100),
	@Notes VARCHAR(100)
AS

UPDATE dbo.students
SET family_id = @FamilyID,
	full_name = @FullName,
	DOB = @DOB,
	school_year = @SchoolYear,
	school_name = @School,
	medical_info = @MedicalInfo,
	notes = @Notes
WHERE student_id = @StudentID
GO
/****** Object:  StoredProcedure [portal].[UpdateStudentScores]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateStudentScores] 
(
	@StudentID INT,
	@JsonScores VARCHAR(MAX)
)
AS

UPDATE dbo.scores
SET 
	marks_received = temp.marks_received
FROM 
(SELECT * FROM OPENJSON(@JsonScores) 
		WITH (
			score_id INT '$.score_id',
			marks_received INT '$.marks_received'
		)) AS temp
WHERE scores.score_id = temp.score_id
GO
/****** Object:  StoredProcedure [portal].[UpdateStudentTestComment]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateStudentTestComment]
(
	@TestCommentID INT,
	@Comment VARCHAR(MAX)
)
AS
UPDATE dbo.testComments
SET comment = @Comment
WHERE test_comment_id = @TestCommentID
GO
/****** Object:  StoredProcedure [portal].[UpdateTest]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateTest]
(
	@TestID INT,
	@Type BIT,
	@TestName VARCHAR(50),
	@JsonQuestions VARCHAR(MAX)
)
AS

UPDATE dbo.tests
SET test_name = @TestName,
	mock = @Type
WHERE test_id = @TestID

UPDATE questions
SET topic_id = temp.topic_id,
difficulty = temp.difficulty,
marks = temp.marks from questions q
INNER JOIN
(SELECT question_id, topic_id, difficulty, marks 
FROM OPENJSON(@JsonQuestions)
WITH (
	question_id INT '$.questionID',
	topic_id INT '$.topicID',
	difficulty VARCHAR(10) '$.difficulty',
    marks int '$.marks'
)) as temp ON q.question_id = temp.question_id

/*INSERT*/
INSERT INTO dbo.questions (test_id, topic_id, difficulty, marks)
SELECT @TestID as test_id, 
	temp.topic_id,
	temp.difficulty,
	temp.marks
	FROM
(SELECT * 
	FROM OPENJSON(@JsonQuestions)
    WITH (  
		question_id INT '$.questionID',
		topic_id int '$.topicID',
        difficulty VARCHAR(10) '$.difficulty',
        marks int '$.marks'
		)) as temp
WHERE temp.question_id IS NULL 
GO
/****** Object:  StoredProcedure [portal].[UpdateTopic]    Script Date: 08/02/2023 14:38:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateTopic] 
(
	@TopicID INT,
	@TopicName VARCHAR(50)
)
AS
UPDATE topics
SET topic_name = @TopicName
WHERE topic_id = @TopicID
GO
