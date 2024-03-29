USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectAllStudents]    Script Date: 30/09/2023 19:25:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectAllStudents]
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
	notes
FROM dbo.students s

