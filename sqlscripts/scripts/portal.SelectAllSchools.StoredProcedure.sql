USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectAllSchools]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllSchools]
AS
(
SELECT * FROM dbo.school
)
GO
