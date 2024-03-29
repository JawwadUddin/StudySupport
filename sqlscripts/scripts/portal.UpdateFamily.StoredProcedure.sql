USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateFamily]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateFamily]
	@FamilyID INT,
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
	@Notes VARCHAR(100)

AS

DECLARE @RelationID AS INT = (SELECT relation_id from relation WHERE relation_to_child = @ecRelation);

UPDATE family
SET full_name = @FullName,
	address = @Address,
	post_code = @PostCode,
	mobile = @Mobile,
	email = @Email,
	ec_full_name = @ecFullName,
	ec_relation_id = @RelationID,
	ec_address = @ecAddress,
	ec_post_code = @ecPostCode,
	ec_mobile = @ecMobile,
	notes = @Notes
WHERE family_id = @FamilyID
GO
