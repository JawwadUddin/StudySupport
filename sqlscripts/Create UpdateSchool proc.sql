CREATE PROCEDURE [portal].[UpdateSchool]
	@SchoolID INT,
	@School VARCHAR(50)

AS

UPDATE dbo.school
SET school_name = @School
WHERE school_id = @SchoolID