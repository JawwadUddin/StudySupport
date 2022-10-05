CREATE PROCEDURE [portal].[InsertFamily]
	@FullName VARCHAR(30),
	@Address VARCHAR(35),
	@City VARCHAR(25),
	@PostCode VARCHAR(8),
	@Mobile VARCHAR(11),
	@Email VARCHAR(40),
	@ecFullName VARCHAR(30),
	@ecRelation VARCHAR(20),
	@ecAddress VARCHAR(50),
	@ecMobile VARCHAR(11),
	@Notes VARCHAR(100),
	@FamilyID INT OUTPUT
AS

DECLARE @InsertedFamilyID TABLE (ID INT);
DECLARE @RelationID AS INT = (SELECT relation_id from relation WHERE relation_to_child = @ecRelation);

INSERT INTO family (full_name, address, city, post_code, mobile, email, ec_full_name, ec_relation_id, ec_mobile, notes)
OUTPUT INSERTED.family_id
INTO @InsertedFamilyID
VALUES (@FullName, @Address, @City, @PostCode, @Mobile, @Email, @ecFullName, @RelationID, @ecMobile, @Notes)

DECLARE @NewFamilyID INT = (SELECT TOP 1 ID FROM @InsertedFamilyID);

SELECT @FamilyID = @NewFamilyID