USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertSchool]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertSchool] @School VARCHAR(50)
AS
INSERT INTO dbo.school
VALUES (@School)
GO
