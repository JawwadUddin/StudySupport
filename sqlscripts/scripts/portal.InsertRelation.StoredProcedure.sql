USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertRelation]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertRelation] @Relation VARCHAR(20)
AS

INSERT INTO dbo.relation
VALUES (@Relation)
GO
