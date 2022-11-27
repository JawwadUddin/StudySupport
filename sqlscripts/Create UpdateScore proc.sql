CREATE PROCEDURE [portal].[UpdateScore] 
(
	@ScoreID INT,
	@MarksReceived INT
)
AS
UPDATE scores
SET marks_received = @MarksReceived
WHERE scores.score_id = @ScoreID