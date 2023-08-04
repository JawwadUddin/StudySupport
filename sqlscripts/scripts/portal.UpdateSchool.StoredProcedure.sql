USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateSchool]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateSchool]
	@SchoolID INT,
	@School VARCHAR(50)

AS

UPDATE dbo.school
SET school_name = @School
WHERE school_id = @SchoolID
GO
