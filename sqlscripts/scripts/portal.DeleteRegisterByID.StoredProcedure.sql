USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[DeleteRegisterByID]    Script Date: 18/05/2024 01:03:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteRegisterByID] @SessionDateID INT
AS 
BEGIN

DELETE FROM studentSessions WHERE session_date_id = @SessionDateID
DELETE FROM sessionDates WHERE session_date_id = @SessionDateID

END
GO
