CREATE PROCEDURE [portal].[UpdateStudentTestComment]
(
	@TestCommentID INT,
	@Comment VARCHAR(MAX)
)
AS
UPDATE dbo.testComments
SET comment = @Comment
WHERE test_comment_id = @TestCommentID