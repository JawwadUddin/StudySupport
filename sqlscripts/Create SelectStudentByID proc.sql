CREATE PROCEDURE [portal].[SelectStudentByID] @StudentID INT
AS

SELECT 
	student_id,
	family_id,
	full_name,
	FORMAT(DOB, 'dd/MM/yyyy') AS DOB,
	school_year,
	school_name,
	medical_info,
	notes
FROM dbo.students s
WHERE s.student_id = @StudentID
