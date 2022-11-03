CREATE PROCEDURE [portal].[SelectAllTests]
AS
SELECT 
	test_id,
	test_name,
	t.syllabus_id,
	level_name + ' ' + subject_name as syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id
INNER JOIN level l
ON s.level_id = l.level_id
INNER JOIN subject sb
ON s.subject_id = sb.subject_id