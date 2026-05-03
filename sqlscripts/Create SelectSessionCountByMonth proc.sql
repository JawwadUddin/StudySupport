CREATE PROCEDURE [portal].[SelectSessionCountByMonth]
AS
BEGIN
    SELECT COUNT(*) AS sessionCount
    FROM studentSessions ss
    INNER JOIN sessionDates d ON ss.session_date_id = d.session_date_id
    WHERE ss.compensation_id IS NULL
    AND MONTH(d.session_date) = MONTH(GETDATE())
    AND YEAR(d.session_date) = YEAR(GETDATE())
END
