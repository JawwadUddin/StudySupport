CREATE PROCEDURE [portal].[DeleteQuestionByID] @QuestionID INT
AS
DELETE FROM questions 
WHERE question_id = @QuestionID