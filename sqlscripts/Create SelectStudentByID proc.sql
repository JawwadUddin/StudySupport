USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectStudentByID]    Script Date: 30/09/2023 19:26:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectStudentByID] @StudentID INT
AS

SELECT 
	student_id,
	family_id,
	first_name,
	last_name,
	FORMAT(DOB, 'dd/MM/yyyy') AS DOB,
	school_year,
	school_name,
	medical_info,
	notes,
	level_id
FROM dbo.students s 
WHERE s.student_id = @StudentID
