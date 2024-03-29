USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectStudentTestsCompletedBySyllabusID]    Script Date: 19/01/2023 14:45:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectStudentTestsCompletedBySyllabusID] @StudentID INT, @SyllabusID INT
AS
begin
select distinct q.test_id, test_name, mock from scores s
inner join questions q on s.question_id = q.question_id
inner join tests t on q.test_id = t.test_id
where student_id = @StudentID and syllabus_id = @SyllabusID
end