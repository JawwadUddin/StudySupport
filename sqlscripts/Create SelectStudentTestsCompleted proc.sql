CREATE PROCEDURE [portal].[SelectStudentTestsCompleted] @StudentId INT
AS 
SELECT  DISTINCT q.test_id, test_name from scores s 
INNER JOIN questions q on s.question_id = q.question_id
INNER JOIN tests t on q.test_id = t.test_id
where student_id = @StudentId

