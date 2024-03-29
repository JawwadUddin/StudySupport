USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertSessionDate]    Script Date: 10/03/2023 17:48:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[InsertSessionDate]
(
	@RegisterDate DATE,
	@SessionDateID INT OUTPUT
)
AS
BEGIN

INSERT INTO sessionDates (session_date)
VALUES (@RegisterDate)

SELECT @SessionDateID = (SELECT TOP 1 session_date_id FROM sessionDates ORDER BY session_date_id DESC)

END