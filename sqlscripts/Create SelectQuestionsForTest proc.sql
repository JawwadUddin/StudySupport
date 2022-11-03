CREATE PROCEDURE [portal].[SelectQuestionsForTest] @TestID INT
AS
SELECT 
	question_id,
	test_id,
	q.topic_id,
	topic_name,
	difficulty,
	marks
FROM questions q
INNER JOIN topics t
ON q.topic_id = t.topic_id
WHERE test_id = @TestID

