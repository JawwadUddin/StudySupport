USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectStudentsOfFamily]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentsOfFamily] @FamilyID INT
AS 
(
SELECT * FROM students WHERE family_id = @FamilyID
)
GO
