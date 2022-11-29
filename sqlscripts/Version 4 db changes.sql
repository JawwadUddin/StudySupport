--Modifying all tables and constraints in light of db Version 4 changes

ALTER TABLE syllabus
DROP CONSTRAINT FK_syllabus_level

ALTER TABLE syllabus
DROP CONSTRAINT FK_syllabus_subject

ALTER TABLE topics
DROP CONSTRAINT FK_topics_subject

DROP TABLE level
DROP TABLE subject

ALTER TABLE topics
DROP COLUMN subject_id

ALTER TABLE topics 
ADD syllabus_id INT

ALTER TABLE topics
ADD CONSTRAINT FK_topics_syllabus FOREIGN KEY (syllabus_id) REFERENCES syllabus(syllabus_id) ON DELETE CASCADE

ALTER TABLE syllabus
DROP COLUMN level_id

ALTER TABLE syllabus
DROP COLUMN subject_id

ALTER TABLE syllabus
ADD syllabus_name VARCHAR(50)

UPDATE syllabus
SET syllabus_name = 'GCSE MATHS HIGHER'
WHERE syllabus_id = 1

UPDATE syllabus
SET syllabus_name = 'GCSE MATHS FOUNDATION'
WHERE syllabus_id = 2

--DROP FK_questions_topics --> delete all topics ---> re-insert them with their syllabus_id --> RE CREATE FK_questions_topics
ALTER TABLE questions
DROP CONSTRAINT FK_questions_topics

delete from topics

INSERT INTO topics (topic_name, syllabus_id)
SELECT Topic, 1 AS Syllabus_id from tempHigher

INSERT INTO topics (topic_name, syllabus_id)
SELECT Topic, 2 AS Syllabus_id from tempFoundation

delete from questions
delete from tests

ALTER TABLE questions
ADD CONSTRAINT FK_questions_topics FOREIGN KEY (topic_id) REFERENCES topics(topic_id)

-- update all relevant procs

ALTER PROCEDURE [portal].[SelectAllSyllabuses]
AS
SELECT 
syllabus_id,
syllabus_name
FROM syllabus s


ALTER PROCEDURE [portal].[SelectTestsBySyllabus] @SyllabusID INT
AS
SELECT 
	test_id,
	test_name,
	syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id
WHERE t.syllabus_id = @SyllabusID


ALTER PROCEDURE [portal].[SelectTopicsBySyllabus] @SyllabusID INT
AS 
(
SELECT topic_id, topic_name FROM syllabus s 
INNER JOIN topics t on s.syllabus_id = t.syllabus_id
WHERE s.syllabus_id = @SyllabusID
)
