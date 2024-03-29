USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectStudentScoresByTestID]    Script Date: 03/11/2022 15:54:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectStudentScoresByTestID]
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