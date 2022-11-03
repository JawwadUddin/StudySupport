CREATE PROCEDURE [portal].[UpdateTest]
(
	@TestID INT,
	@TestName VARCHAR(50)
)
AS

UPDATE dbo.tests
SET test_name = @TestName
WHERE test_id = @TestID