CREATE PROCEDURE [portal].[UpdateTopic] 
(
	@TopicID INT,
	@TopicName VARCHAR(50)
)
AS
UPDATE topics
SET topic_name = @TopicName
WHERE topic_id = @TopicID