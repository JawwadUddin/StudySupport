CREATE PROCEDURE [portal].[SelectSessionDates]
AS
BEGIN
select session_date_id, FORMAT(session_date, 'dd/MM/yyyy') AS session_date from sessionDates order by convert(datetime, session_date, 103) DESC
END

