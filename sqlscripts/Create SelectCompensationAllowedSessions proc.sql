USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectCompensationAllowedSessions]    Script Date: 29/03/2024 15:30:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectCompensationAllowedSessions] @RegisterDateID Int
AS
BEGIN

DECLARE @RegisterDate Date = (SELECT session_date from sessionDates where session_date_id = @RegisterDateID)

select ss.student_session_id, ss.student_id, first_name as firstName, last_name as lastName, school_year as schoolYear, FORMAT(session_date, 'dd/MM/yyyy') AS session_date, session_time from studentSessions ss
inner join sessionDates sd
on ss.session_date_id = sd.session_date_id
inner join students st
on ss.student_id = st.student_id
inner join sessionSlots sl
on ss.session_slot_id = sl.session_slot_id
where attendance = 0
and student_session_id not in (SELECT compensation_id FROM studentSessions WHERE compensation_id is NOT NULL)
and session_date >= DATEADD(MONTH, -3, @RegisterDate) AND session_date < @RegisterDate

END
