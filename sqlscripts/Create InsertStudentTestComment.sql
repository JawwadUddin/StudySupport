CREATE PROCEDURE [portal].[InsertStudentTestComment] 
(
	@TestID INT,
	@StudentID INT,
	@Comment VARCHAR(MAX)
) 
AS
INSERT INTO dbo.testComments (test_id, student_id, comment)
VALUES (@TestID, @StudentID, @Comment)