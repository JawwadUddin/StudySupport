USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectSessionsForInvoice]    Script Date: 30/09/2023 20:13:32 ******/
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
		s.first_name as firstName,
		s.last_name as lastName,
		(SELECT * FROM (SELECT TOP 1 
			rate_id, rate, student_id 
		FROM rate r
		WHERE r.student_id = s.student_id
		AND MONTH(rateDate) <= MONTH(@StartDate) 
		ORDER BY rateDate DESC) rateTemp FOR JSON AUTO) as rateInfo,
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
			AND compensation_id IS NULL
			AND MONTH(d.session_date) = MONTH(@StartDate)) sessionTemp FOR JSON AUTO) AS sessions
	FROM students s 
	WHERE s.family_id = f.family_id FOR JSON AUTO) AS students
FROM family f 
WHERE f.family_id = @FamilyID
END
 

