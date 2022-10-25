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

INSERT INTO dbo.students (family_id, full_name, DOB, school_year, school_name, medical_info, notes)
OUTPUT INSERTED.student_id
INTO @InsertedStudentID
VALUES (@FamilyID, @FullName, @DOB, @SchoolYear, @School, @MedicalInfo, @Notes)

DECLARE @NewStudentID AS INT = (SELECT TOP 1 ID FROM @InsertedStudentID);

SELECT @StudentID = @NewStudentID
