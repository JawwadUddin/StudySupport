CREATE PROCEDURE [portal].[UpdateRelation]
	@RelationID INT,
	@Relation VARCHAR(20)
AS 

UPDATE dbo.relation
SET relation_to_child = @Relation
WHERE relation_id = @RelationID
