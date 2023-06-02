USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectStudentTestComment]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentTestComment] 
(
	@StudentID INT, 
	@TestID INT
)
AS
SELECT * from testComments WHERE student_id = @StudentID AND test_id = @TestID

GO
