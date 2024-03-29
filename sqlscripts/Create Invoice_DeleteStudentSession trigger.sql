USE [studysupport]
GO
/****** Object:  Trigger [dbo].[Invoice_DeleteStudentSession]    Script Date: 29/03/2024 16:11:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[Invoice_DeleteStudentSession]
ON [dbo].[studentSessions]
AFTER DELETE
AS
BEGIN

    UPDATE invoices
    SET amount_due = amount_due - r.rate * (d.full_session + 1)
    FROM deleted d
    JOIN students s ON d.student_id = s.student_id
    JOIN invoices i ON s.family_id = i.family_id
    CROSS APPLY (
        SELECT TOP 1 rate
        FROM rate
        WHERE student_id = d.student_id 
            AND rateDate <= (SELECT session_date FROM sessionDates WHERE session_date_id = d.session_date_id)
        ORDER BY rateDate DESC
    ) r
    WHERE i.invoice_id IS NOT NULL
	AND d.compensation_id IS NULL;


END
