CREATE PROCEDURE [portal].[InsertRelation] @Relation VARCHAR(20)
AS

INSERT INTO dbo.relation
VALUES (@Relation)

