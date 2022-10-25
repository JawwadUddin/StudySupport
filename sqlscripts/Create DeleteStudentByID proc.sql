CREATE PROCEDURE [portal].[DeleteStudentByID] @StudentID INT
AS 
DELETE FROM students WHERE student_id = @StudentID
