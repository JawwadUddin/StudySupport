USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertStudentScores]    Script Date: 02/06/2023 18:44:42 ******/
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
