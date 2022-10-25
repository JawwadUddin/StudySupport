CREATE PROCEDURE [portal].[SelectStudentsOfFamily] @FamilyID INT
AS 
(
SELECT * FROM students WHERE family_id = @FamilyID
)