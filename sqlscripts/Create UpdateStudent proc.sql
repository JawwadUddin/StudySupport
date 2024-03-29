USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateStudent]    Script Date: 30/09/2023 19:28:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[UpdateStudent] 
	@StudentID INT,
	@FamilyID INT,
	@FirstName VARCHAR(20),
	@LastName VARCHAR(20),
	@DOB DATE,
	@SchoolYear INT,
	@School VARCHAR(50),
	@MedicalInfo VARCHAR(100),
	@Notes VARCHAR(100), 
	@LevelID INT
AS

UPDATE dbo.students
SET family_id = @FamilyID,
	first_name = @FirstName,
	last_name = @LastName,
	DOB = @DOB,
	school_year = @SchoolYear,
	school_name = @School,
	medical_info = @MedicalInfo,
	notes = @Notes,
	level_id = @LevelID
WHERE student_id = @StudentID
