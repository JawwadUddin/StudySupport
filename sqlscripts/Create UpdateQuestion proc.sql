CREATE PROCEDURE [portal].[UpdateQuestion] 
(
	@QuestionID INT,
	@TopicID INT,
	@Difficulty VARCHAR(10),
	@Marks INT
)
AS

UPDATE questions
SET topic_id = @TopicID,
	difficulty = @Difficulty,
	marks = @Marks
WHERE question_id = @QuestionID
