select * from invoices 
select * from studentSessions

SELECT student_session_id, student_id, compensation_id, attendance, full_session, s.session_date_id, session_date, month(session_date) FROM studentSessions s 
inner join sessionDates d 
on s.session_date_id = d.session_date_id
and month(session_date)=3



--for a family_id and start_date on invoice: need to bring back all sessions for that entire month for all students

DECLARE @FamilyID INT = 1010;
DECLARE @StartDate DATE = '2023-03-01';

SELECT 
	f.family_id, 
	f.full_name, 
	s.student_id, 
	s.full_name, 
	student_session_id, 
	compensation_id, 
	attendance, 
	full_session, 
	ss.session_date_id, 
	session_date 
FROM family f
	INNER JOIN students s 
	ON f.family_id = s.family_id
	INNER JOIN studentSessions ss
	ON s.student_id = ss.student_id
	INNER JOIN sessionDates d
	ON ss.session_date_id = d.session_date_id
WHERE f.family_id = @FamilyID
AND MONTH(d.session_date) = MONTH(@StartDate)

DECLARE @FamilyID INT = 1010;
DECLARE @StartDate DATE = '2023-03-01';

SELECT 
	f.family_id, 
	f.full_name,
	(SELECT 
		s.student_id, 
		s.full_name,
		(SELECT 
			student_session_id, 
			compensation_id, 
			attendance, 
			full_session, 
			ss.session_date_id, 
			session_date
		FROM studentSessions ss
		INNER JOIN sessionDates d
		ON ss.session_date_id = d.session_date_id
		WHERE s.student_id = ss.student_id
		AND MONTH(d.session_date) = MONTH(@StartDate) FOR JSON AUTO) AS sessions
	FROM students s 
	WHERE s.family_id = f.family_id FOR JSON AUTO) AS students
FROM family f
WHERE f.family_id = @FamilyID


select * from family
select * from students
select * from sessionDates
select * from studentSessions where student_id = 1018

update studentSessions
set full_session=0
where student_session_id=109


select student_id, MAX(student_session_id) from studentSessions group by student_id