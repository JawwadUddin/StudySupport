USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateStudentScores]    Script Date: 03/11/2022 13:42:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[UpdateStudentScores] 
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
WHERE student_id = @StudentID
AND scores.score_id = temp.score_id