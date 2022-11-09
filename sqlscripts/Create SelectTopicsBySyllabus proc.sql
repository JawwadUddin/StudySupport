CREATE PROCEDURE [portal].[SelectTopicsBySyllabus] @SyllabusID INT
AS 
(
SELECT topic_id, topic_name FROM syllabus s 
INNER JOIN topics t on s.subject_id = t.subject_id
WHERE syllabus_id = @SyllabusID
)