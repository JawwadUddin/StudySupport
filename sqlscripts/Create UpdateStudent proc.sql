CREATE PROCEDURE [portal].[UpdateStudent] 
	@StudentID INT,
	@FamilyID INT,
	@FullName VARCHAR(30),
	@DOB DATE,
	@SchoolYear INT,
	@School VARCHAR(50),
	@MedicalInfo VARCHAR(100),
	@Notes VARCHAR(100)
AS

DECLARE @SchoolID AS INT = (SELECT school_id from dbo.school WHERE school_name = @School);

UPDATE dbo.students
SET family_id = @FamilyID,
	full_name = @FullName,
	DOB = @DOB,
	school_year = @SchoolYear,
	school_id = @SchoolID,
	medical_info = @MedicalInfo,
	notes = @Notes
WHERE student_id = @StudentID
