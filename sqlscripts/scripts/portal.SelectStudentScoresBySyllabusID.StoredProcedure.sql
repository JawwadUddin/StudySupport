USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectStudentScoresBySyllabusID]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentScoresBySyllabusID] @StudentID INT, @SyllabusID INT
AS
select score_id, s.question_id, marks_received, marks, topic_id, q.test_id from scores s
inner join questions q
on s.question_id = q.question_id
inner join tests t
on q.test_id = t.test_id
where student_id= @StudentID
and syllabus_id = @SyllabusID

GO
