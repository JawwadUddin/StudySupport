USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectStudentScoresByTestID]    Script Date: 02/06/2023 18:44:42 ******/
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
