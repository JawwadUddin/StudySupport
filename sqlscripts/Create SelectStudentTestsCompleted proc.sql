USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectStudentTestsCompleted]    Script Date: 10/11/2022 12:42:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectStudentTestsCompleted] @StudentID INT
AS 
SELECT temp.test_id, test_name, syllabus_id, SUM(temp.marks_received) as marks_received,  SUM(temp.marks) as marks from 
(SELECT q.test_id, test_name, syllabus_id, marks, marks_received from scores s 
INNER JOIN questions q on s.question_id = q.question_id
INNER JOIN tests t on q.test_id = t.test_id
where student_id = @StudentID) as temp
GROUP BY test_id, test_name, syllabus_id

