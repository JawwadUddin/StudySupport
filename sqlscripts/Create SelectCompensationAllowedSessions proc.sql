CREATE PROCEDURE [PORTAL].[SelectCompensationAllowedSessions]
AS
BEGIN

select ss.student_session_id, ss.student_id, full_name, FORMAT(session_date, 'dd/MM/yyyy') AS session_date, session_time from studentSessions ss
inner join sessionDates sd
on ss.session_date_id = sd.session_date_id
inner join students st
on ss.student_id = st.student_id
inner join sessionSlots sl
on ss.session_slot_id = sl.session_slot_id
where attendance = 0
and session_date >= DATEADD(MONTH, -3, GETDATE())

END