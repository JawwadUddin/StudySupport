CREATE PROCEDURE [portal].[SelectAllFamilies]
AS
SELECT 
	family_id,
	full_name,
	address,
	city,
	post_code,
	mobile,
	email,
	ec_full_name,
	relation_to_child,
	ec_address,
	ec_mobile,
	notes
FROM dbo.family f
LEFT JOIN dbo.relation r ON f.ec_relation_id = r.relation_id