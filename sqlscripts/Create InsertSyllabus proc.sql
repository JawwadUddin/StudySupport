CREATE PROCEDURE [portal].[InsertSyllabus] 
(
	@SyllabusName VARCHAR(50),
	@JsonTopics VARCHAR(MAX),
	@SyllabusID INT OUTPUT
)
AS
BEGIN

DECLARE @InsertedSyllabusID AS TABLE (ID INT);

INSERT INTO syllabus (syllabus_name)
OUTPUT Inserted.syllabus_id
INTO @InsertedSyllabusID
VALUES (@SyllabusName)


DECLARE @NewSyllabusID AS INT = (SELECT TOP 1 ID FROM @InsertedSyllabusID)

INSERT INTO topics (topic_name, syllabus_id)
SELECT 
	temp.topic_name,
	@NewSyllabusID AS syllabus_id
	FROM
(SELECT * 
	FROM OPENJSON(@JsonTopics)
    WITH (  
        topic_name VARCHAR(10) '$.topicName'
		)) as temp

SELECT @SyllabusID = @NewSyllabusID

END