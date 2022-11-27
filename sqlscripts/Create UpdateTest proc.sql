USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateTest]    Script Date: 24/11/2022 11:39:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[UpdateTest]
(
	@TestID INT,
	@TestName VARCHAR(50),
	@JsonQuestions VARCHAR(MAX)
)
AS

UPDATE dbo.tests
SET test_name = @TestName
WHERE test_id = @TestID


/*UPDATE*/
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

