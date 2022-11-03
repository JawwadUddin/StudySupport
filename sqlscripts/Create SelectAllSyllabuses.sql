CREATE PROCEDURE [portal].[SelectAllSyllabuses]
AS
SELECT 
syllabus_id,
s.level_id,
s.subject_id,
level_name + ' ' + subject_name as syllabus_name
FROM syllabus s
INNER JOIN level l 
ON s.level_id = l.level_id
INNER JOIN subject sb
ON S.subject_id = sb.subject_id