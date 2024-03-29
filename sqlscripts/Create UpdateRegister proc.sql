USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateRegister]    Script Date: 10/03/2023 18:58:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[UpdateRegister] 
(
	@JsonAdd VARCHAR(MAX),
	@JsonUpdate VARCHAR(MAX),
	@JsonRemove VARCHAR(MAX)
)
AS

BEGIN

--First add all the new student sessions
INSERT INTO studentSessions (student_id, session_date_id, session_table_id, session_slot_id, attendance, compensation_id)
SELECT 
	temp.student_id, 
	temp.session_date_id,
	(SELECT session_table_id from sessionTables WHERE session_table = temp.session_table),
	(SELECT session_slot_id from sessionSlots WHERE session_time = temp.session_time),
	temp.attendance,
	temp.compensation_id
	FROM
(SELECT * 
	FROM OPENJSON(@JsonAdd)
    WITH (  
		student_id int '$.student_id',
        session_date_id int '$.session_date_id',
        session_table varchar(20) '$.session_table',
		session_time varchar(11) '$.session_time',
		attendance bit '$.attendance',
		compensation_id int '$.compensation_id'
		)) as temp


--Update the student session attendance records
UPDATE studentSessions
SET attendance = temp.attendance
FROM studentSessions s
INNER JOIN
(SELECT student_session_id, attendance 
FROM OPENJSON(@JsonUpdate)
WITH (  
	student_session_id int '$.student_session_id',
	attendance bit '$.attendance'
	)) as temp ON s.student_session_id = temp.student_session_id


--Delete student sessions

--If the student_session_id that needs deleting is referenced in another record as a compensation, remove that record first
DELETE FROM studentSessions
WHERE compensation_id IN
(SELECT temp.student_session_id 
	FROM
	(SELECT * 
	FROM OPENJSON(@JsonRemove)
    WITH (  
		student_session_id int '$.student_session_id'
		)) as temp
)

DELETE FROM studentSessions
WHERE student_session_id IN
(SELECT temp.student_session_id 
	FROM
	(SELECT * 
	FROM OPENJSON(@JsonRemove)
    WITH (  
		student_session_id int '$.student_session_id'
		)) as temp
)

--Delete any compensation sessions that has not been attended
DELETE FROM studentSessions
WHERE compensation_id IS NOT NULL AND (attendance = 0 OR attendance is null)

END