CREATE PROCEDURE [portal].[InsertSchool] @School VARCHAR(50)
AS
INSERT INTO dbo.school
VALUES (@School)