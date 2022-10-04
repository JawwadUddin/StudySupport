CREATE PROCEDURE [portal].[SelectFamilyByID] @FamilyID INT
AS
SELECT 
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
INNER JOIN dbo.relation r ON f.ec_relation_id = r.relation_id
WHERE f.family_id = @FamilyID


SELECT 
	full_name,
	address,
	city,
	post_code,
	mobile,
	email,
	ec_full_name,
	ec_relation_id,
	relation_id,
	ec_address,
	ec_mobile,
	notes
FROM dbo.family f
INNER JOIN dbo.relation r ON f.ec_relation_id = r.relation_id
WHERE f.family_id = 2