CREATE PROCEDURE [portal].[DeleteFamilyByID] @FamilyID INT
AS
DELETE FROM family WHERE family_id=@FamilyID