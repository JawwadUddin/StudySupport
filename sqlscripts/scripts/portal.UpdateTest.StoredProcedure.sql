USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateTest]    Script Date: 02/06/2023 18:44:42 ******/
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
