USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectFamilyByID]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectFamilyByID] @FamilyID INT
AS
SELECT 
	full_name,
	address,
	post_code,
	mobile,
	email,
	ec_full_name,
	relation_to_child,
	ec_address,
	ec_post_code,
	ec_mobile,
	notes
FROM dbo.family f
LEFT JOIN dbo.relation r ON f.ec_relation_id = r.relation_id
WHERE f.family_id = @FamilyID
GO
