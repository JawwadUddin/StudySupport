USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertRegister]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertRegister] 
(
	@RegisterDate DATE,
	@TemplateID INT,
	@SessionDateID INT OUTPUT
)
AS
BEGIN

INSERT INTO sessionDates (session_date)
VALUES (@RegisterDate)

DECLARE @NewSessionDateID INT = (SELECT TOP 1 session_date_id FROM sessionDates ORDER BY session_date_id DESC)

INSERT INTO studentSessions (student_id, session_date_id, session_table_id, session_slot_id, attendance, full_session)
SELECT 
	s.student_id,
	@NewSessionDateID,
	s.session_table_id,
	s.session_slot_id,
	0 as attendance,
	s.full_session
FROM studentSessions s
WHERE s.session_date_id = @TemplateID AND compensation_id IS NULL

SELECT @SessionDateID = @NewSessionDateID

END
GO
