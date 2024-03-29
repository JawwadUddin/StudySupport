USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateStudentTestComment]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateStudentTestComment]
(
	@TestCommentID INT,
	@Comment VARCHAR(MAX)
)
AS
UPDATE dbo.testComments
SET comment = @Comment
WHERE test_comment_id = @TestCommentID
GO
