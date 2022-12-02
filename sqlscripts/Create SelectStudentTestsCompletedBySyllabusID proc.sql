CREATE PROCEDURE [portal].[SelectStudentTestsCompletedBySyllabusID] @StudentID INT, @SyllabusID INT
AS
select distinct q.test_id, test_name from scores s
inner join questions q
on s.question_id = s.question_id
inner join tests t
on q.test_id = t.test_id
where student_id = @StudentID
and syllabus_id = @SyllabusID