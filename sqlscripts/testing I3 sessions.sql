select * from students

select * from sessionSlots
select * from sessionTables
select * from sessionDates
select * from studentSessions
update studentSessions
set attendance = 0
where session_date_id =2

select student_id, session_date, session_table, session_time, attendance from studentSessions s
inner join sessionDates d on s.session_date_id = d.session_date_id
inner join sessionTables t on s.session_table_id = t.session_table_id
inner join sessionSlots l on s.session_slot_id = l.session_slot_id
WHERE session_date = '2023-02-05'
order by session_date, session_time, session_table
for json auto


-- investigating query that will bring back register
SELECT
(SELECT
	d.session_date,
	sessions = (
		SELECT session_time, 
		tables = (
			SELECT session_table,
			students = (
				SELECT s.student_id, s.student_session_id, attendance, compensation_id, full_name 
				FROM studentSessions s
				INNER JOIN students st on s.student_id = st.student_id
					WHERE s.session_date_id = d.session_date_id 
					AND s.session_table_id = t.session_table_id
					AND s.session_slot_id = l.session_slot_id
				FOR JSON PATH
			)
			FROM sessionTables t 
			FOR JSON PATH
		)
		FROM sessionSlots l
		FOR JSON PATH
	) 
FROM sessionDates d
WHERE session_date = '2023-02-05'
FOR JSON PATH) AS register


exec portal.Selectregister @SessionDate = '2023-02-05'
