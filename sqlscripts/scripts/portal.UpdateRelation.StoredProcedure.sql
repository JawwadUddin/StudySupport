USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateRelation]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateRelation]
	@RelationID INT,
	@Relation VARCHAR(20)
AS 

UPDATE dbo.relation
SET relation_to_child = @Relation
WHERE relation_id = @RelationID
GO
