USE [studysupport]
GO
/****** Object:  Trigger [dbo].[Invoice_InsertStudentSession]    Script Date: 29/03/2024 16:11:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[Invoice_InsertStudentSession]
ON [dbo].[studentSessions]
AFTER INSERT
AS
BEGIN

	UPDATE invoices
    SET amount_due = amount_due + r.rate * (i.full_session + 1)
    FROM inserted i
    JOIN students s ON i.student_id = s.student_id
    JOIN invoices inv ON s.family_id = inv.family_id
    CROSS APPLY (
        SELECT TOP 1 rate
        FROM rate r
        WHERE r.student_id = i.student_id
            AND MONTH(r.rateDate) <= MONTH((SELECT session_date FROM sessionDates WHERE session_date_id = i.session_date_id))
        ORDER BY r.rateDate DESC
    ) r
    WHERE inv.invoice_id IS NOT NULL
	AND i.compensation_id IS NULL
    AND MONTH(inv.start_date) = MONTH((SELECT session_date FROM sessionDates WHERE session_date_id = i.session_date_id));

END
