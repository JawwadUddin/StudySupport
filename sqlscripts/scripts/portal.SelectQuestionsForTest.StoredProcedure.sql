USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectQuestionsForTest]    Script Date: 02/06/2023 18:44:42 ******/
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
