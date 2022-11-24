CREATE PROCEDURE [portal].[InsertQuestion] 
(
	@TestID INT,
	@TopicID INT,
	@Difficulty VARCHAR(10),
	@Marks INT
)
AS
INSERT INTO dbo.questions (test_id, topic_id, difficulty, marks)
VALUES 
	(@TestID, @TopicID, @Difficulty, @Marks)