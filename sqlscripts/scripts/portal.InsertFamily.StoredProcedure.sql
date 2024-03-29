USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertFamily]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertFamily]
	@FullName VARCHAR(30),
	@Address VARCHAR(35),
	@PostCode VARCHAR(8),
	@Mobile VARCHAR(11),
	@Email VARCHAR(40),
	@ecFullName VARCHAR(30),
	@ecRelation VARCHAR(20),
	@ecAddress VARCHAR(50),
	@ecPostCode VARCHAR(8),
	@ecMobile VARCHAR(11),
	@Notes VARCHAR(100),
	@FamilyID INT OUTPUT
AS

DECLARE @InsertedFamilyID table (ID INT);
DECLARE @RelationID AS INT = (SELECT relation_id from relation WHERE relation_to_child = @ecRelation);

INSERT INTO family (full_name, address, post_code, mobile, email, ec_full_name, ec_relation_id, ec_address, ec_post_code, ec_mobile, notes)
OUTPUT INSERTED.family_id
INTO @InsertedFamilyID
VALUES (@FullName, @Address, @PostCode, @Mobile, @Email, @ecFullName, @RelationID, @ecAddress, @ecPostCode, @ecMobile, @Notes)

DECLARE @NewFamilyID INT = (SELECT TOP 1 ID FROM @InsertedFamilyID);

SELECT @FamilyID = @NewFamilyID
GO
