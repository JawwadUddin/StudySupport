USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateStudentScores]    Script Date: 02/06/2023 18:44:42 ******/
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
