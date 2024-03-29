USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertSessionDate]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertSessionDate]
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
GO
