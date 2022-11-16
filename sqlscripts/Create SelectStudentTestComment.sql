CREATE PROCEDURE [portal].[SelectStudentTestComment] 
(
	@StudentID INT, 
	@TestID INT
)
AS
SELECT * from testComments WHERE student_id = @StudentID AND test_id = @TestID
