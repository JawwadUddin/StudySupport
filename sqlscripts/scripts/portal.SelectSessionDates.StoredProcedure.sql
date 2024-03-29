USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectSessionDates]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectSessionDates]
AS
BEGIN
select session_date_id, FORMAT(session_date, 'dd/MM/yyyy') AS session_date from sessionDates order by convert(datetime, session_date, 103) DESC
END

GO
