CREATE PROCEDURE [portal].[DeleteTestByID] @TestID INT
AS
BEGIN

DELETE FROM questions
WHERE question_id IN
(SELECT question_id FROM questions WHERE test_id = @TestID)

DELETE FROM tests
WHERE test_id = @TestID

END