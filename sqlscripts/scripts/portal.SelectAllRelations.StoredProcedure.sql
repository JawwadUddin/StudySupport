USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectAllRelations]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllRelations]
AS
(
SELECT * FROM dbo.relation
)
GO
