CREATE PROCEDURE [portal].[SelectAllStudent]
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
LEFT JOIN dbo.school sc on s.school_id = sc.school_id

