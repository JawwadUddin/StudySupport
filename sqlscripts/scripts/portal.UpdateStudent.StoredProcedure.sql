USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateStudent]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateStudent] 
	@StudentID INT,
	@FamilyID INT,
	@FullName VARCHAR(30),
	@DOB DATE,
	@SchoolYear INT,
	@School VARCHAR(50),
	@MedicalInfo VARCHAR(100),
	@Notes VARCHAR(100), 
	@LevelID INT
AS

UPDATE dbo.students
SET family_id = @FamilyID,
	full_name = @FullName,
	DOB = @DOB,
	school_year = @SchoolYear,
	school_name = @School,
	medical_info = @MedicalInfo,
	notes = @Notes,
	level_id = @LevelID
WHERE student_id = @StudentID
GO
