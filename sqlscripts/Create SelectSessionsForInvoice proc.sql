USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectSessionsForInvoice]    Script Date: 20/06/2023 00:08:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectSessionsForInvoice]
(
	@FamilyID INT,
	@StartDate DATE
)
AS
BEGIN
SELECT 
	(SELECT 
		s.student_id, 
		s.full_name,
		(SELECT TOP 1 
			rate 
		FROM rate r
		WHERE r.student_id = s.student_id
		AND MONTH(rateDate) <= MONTH(@StartDate) 
		ORDER BY rateDate DESC) as rate,
		(SELECT * 
		FROM (SELECT 
				student_session_id, 
				compensation_id, 
				attendance, 
				full_session, 
				ss.session_date_id, 
				FORMAT(session_date, 'dd/MM/yyyy') as session_date
			FROM studentSessions ss
			INNER JOIN sessionDates d
			ON ss.session_date_id = d.session_date_id
			WHERE s.student_id = ss.student_id
			AND MONTH(d.session_date) = MONTH(@StartDate)) temp FOR JSON AUTO) AS sessions
	FROM students s 
	WHERE s.family_id = f.family_id FOR JSON AUTO) AS students
FROM family f 
WHERE f.family_id = @FamilyID
END
 

