USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertStudent]    Script Date: 30/09/2023 19:27:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[InsertStudent] 
	@FamilyID INT,
	@FirstName VARCHAR(20),
	@LastName VARCHAR(20),
	@DOB DATE,
	@SchoolYear INT,
	@School VARCHAR(50),
	@MedicalInfo VARCHAR(100),
	@Notes VARCHAR(100),
	@LevelID INT,
	@StudentID INT OUTPUT
AS

DECLARE @InsertedStudentID AS TABLE (ID INT);

INSERT INTO dbo.students (family_id, first_name, last_name, DOB, school_year, school_name, medical_info, notes, level_id)
OUTPUT INSERTED.student_id
INTO @InsertedStudentID
VALUES (@FamilyID, @FirstName, @LastName, @DOB, @SchoolYear, @School, @MedicalInfo, @Notes, @LevelID)

DECLARE @NewStudentID AS INT = (SELECT TOP 1 ID FROM @InsertedStudentID);

SELECT @StudentID = @NewStudentID
