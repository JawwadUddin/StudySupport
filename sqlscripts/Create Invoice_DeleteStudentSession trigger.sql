USE [studysupport]
GO
/****** Object:  Trigger [dbo].[Invoice_DeleteStudentSession]    Script Date: 24/08/2023 15:12:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[Invoice_DeleteStudentSession]
ON [dbo].[studentSessions]
AFTER DELETE
AS
BEGIN


--DECLARE @FamilyID INT = (SELECT family_id FROM students WHERE student_id = (SELECT deleted.student_id FROM deleted))
--DECLARE @SessionDate DATE = (SELECT session_date FROM Deleted dt INNER JOIN sessionDates d ON dt.session_date_id = d.session_date_id)
--DECLARE @InvoiceID INT = (SELECT invoice_id FROM invoices WHERE family_id = @FamilyID AND MONTH(start_date) = MONTH(@SessionDate))


--IF @InvoiceID IS NOT NULL
--	BEGIN

--	DECLARE @Rate DECIMAL(5,3) = (SELECT TOP 1 rate FROM rate r INNER JOIN deleted d ON r.student_id = d.student_id WHERE MONTH(rateDate) <= MONTH(@SessionDate) ORDER BY rateDate DESC)

--	IF @Rate IS NULL
--		RETURN
--	ELSE
--		UPDATE invoices
--		SET amount_due = amount_due - @Rate * (deleted.full_session + 1)
--		FROM deleted
--		WHERE invoice_id = @InvoiceID
--		RETURN

--	END
--ELSE
--	RETURN

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