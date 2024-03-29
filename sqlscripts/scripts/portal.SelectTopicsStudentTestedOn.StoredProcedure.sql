USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectTopicsStudentTestedOn]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectTopicsStudentTestedOn]
(
	@SyllabusID INT,
	@StudentID INT
)
AS
BEGIN

select distinct topic_name, q.topic_id from scores s 
inner join questions q on s.question_id = q.question_id
inner join topics t on q.topic_id = t.topic_id
where student_id = @StudentID
and syllabus_id = @SyllabusID

END
GO
