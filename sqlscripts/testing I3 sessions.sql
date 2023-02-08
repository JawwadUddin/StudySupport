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
order by session_date, session_time, session_table
for json auto



-- investigating query that will bring back register
SELECT
	d.session_date,
	sessions = (
		SELECT session_time, 
		tables = (
			SELECT session_table,
			students = (
				SELECT student_id, attendance 
				FROM studentSessions s 
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
FOR JSON PATH

