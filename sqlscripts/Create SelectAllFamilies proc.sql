USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectAllFamilies]    Script Date: 16/11/2022 15:16:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectAllFamilies]
AS
SELECT 
	family_id,
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