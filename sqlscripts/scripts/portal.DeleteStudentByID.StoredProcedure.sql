USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[DeleteStudentByID]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteStudentByID] @StudentID INT
AS 
DELETE FROM students WHERE student_id = @StudentID
GO
