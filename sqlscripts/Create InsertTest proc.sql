USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertTest]    Script Date: 27/11/2022 00:47:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[InsertTest]
(
	@TestName VARCHAR(50),
	@SyllabusID INT,
	@JsonQuestions VARCHAR(MAX),
	@TestID INT OUTPUT
)
AS
BEGIN

DECLARE @InsertedTestID AS TABLE (ID INT);

INSERT INTO tests (test_name, syllabus_id)
OUTPUT Inserted.test_id
INTO @InsertedTestID
VALUES (@TestName, @SyllabusID)

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