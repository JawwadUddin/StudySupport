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

UPDATE dbo.students
SET family_id = @FamilyID,
	full_name = @FullName,
	DOB = @DOB,
	school_year = @SchoolYear,
	school_name = @School,
	medical_info = @MedicalInfo,
	notes = @Notes
WHERE student_id = @StudentID
