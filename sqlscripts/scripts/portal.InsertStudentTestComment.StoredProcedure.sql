USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertStudentTestComment]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertStudentTestComment] 
(
	@TestID INT,
	@StudentID INT,
	@Comment VARCHAR(MAX)
) 
AS
INSERT INTO dbo.testComments (test_id, student_id, comment)
VALUES (@TestID, @StudentID, @Comment)
GO
