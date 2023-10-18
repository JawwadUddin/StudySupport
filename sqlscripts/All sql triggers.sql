CREATE TRIGGER [dbo].[Invoice_DeleteStudentSession]
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
    WHERE i.invoice_id IS NOT NULL;


END
GO
ALTER TABLE [dbo].[studentSessions] ENABLE TRIGGER [Invoice_DeleteStudentSession]
GO
/****** Object:  Trigger [dbo].[Invoice_InsertStudentSession]    Script Date: 18/10/2023 20:40:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[Invoice_InsertStudentSession]
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
    AND MONTH(inv.start_date) = MONTH((SELECT session_date FROM sessionDates WHERE session_date_id = i.session_date_id));

END
GO
ALTER TABLE [dbo].[studentSessions] ENABLE TRIGGER [Invoice_InsertStudentSession]
GO
