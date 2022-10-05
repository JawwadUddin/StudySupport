CREATE PROCEDURE [portal].[InsertStudent] 
	@FamilyID INT,
	@FullName VARCHAR(30),
	@DOB DATE,
	@SchoolYear INT,
	@School VARCHAR(50),
	@MedicalInfo VARCHAR(100),
	@Notes VARCHAR(100),
	@StudentID INT OUTPUT
AS

DECLARE @InsertedStudentID AS TABLE (ID INT);
DECLARE @SchoolID AS INT = (SELECT school_id from dbo.school WHERE school_name = @School);

INSERT INTO dbo.students (family_id, full_name, DOB, school_year, school_id, medical_info, notes)
OUTPUT INSERTED.student_id
INTO @InsertedStudentID
VALUES (@FamilyID, @FullName, @DOB, @SchoolYear, @SchoolID, @MedicalInfo, @Notes)

DECLARE @NewStudentID AS INT = (SELECT TOP 1 ID FROM @InsertedStudentID);

SELECT @StudentID = @NewStudentID
