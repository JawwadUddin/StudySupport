ALTER PROCEDURE [portal].[Login] @Username VARCHAR(20), @HashedPassword VARCHAR(MAX) OUTPUT
AS
SELECT @HashedPassword = (SELECT password FROM users WHERE username = @Username)
