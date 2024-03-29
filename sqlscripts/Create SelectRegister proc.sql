USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectRegister]    Script Date: 28/10/2023 11:26:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectRegister] @SessionDateID INT
AS 
BEGIN
SELECT
(SELECT
	d.session_date,
	sessions = (
		SELECT session_time, 
		tables = (
			SELECT session_table,
			students = (
			ISNULL(
				(SELECT s.student_id, s.student_session_id, attendance, compensation_id, first_name as firstName, last_name as lastName, school_year as schoolYear, full_session 
				FROM studentSessions s
				INNER JOIN students st on s.student_id = st.student_id
					WHERE s.session_date_id = d.session_date_id 
					AND s.session_table_id = t.session_table_id
					AND s.session_slot_id = l.session_slot_id
				FOR JSON PATH) , '[]')
			)
			FROM sessionTables t 
			FOR JSON PATH
		)
		FROM sessionSlots l
		FOR JSON PATH
	) 
FROM sessionDates d
WHERE session_date_id = @SessionDateID
FOR JSON PATH) AS register
END
