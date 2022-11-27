CREATE PROCEDURE [portal].[SelectTestsBySyllabus] @SyllabusID INT
AS
SELECT 
	test_id,
	test_name,
	level_name + ' ' + subject_name as syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id
INNER JOIN level l
ON s.level_id = l.level_id
INNER JOIN subject sb
ON s.subject_id = sb.subject_id
WHERE t.syllabus_id = @SyllabusID