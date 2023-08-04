CREATE TRIGGER Invoice_DeleteStudentSession
ON studentSessions
AFTER DELETE
AS
BEGIN

DECLARE @FamilyID INT = (SELECT family_id FROM students WHERE student_id = (SELECT deleted.student_id FROM deleted))
DECLARE @SessionDate DATE = (SELECT session_date FROM Deleted dt INNER JOIN sessionDates d ON dt.session_date_id = d.session_date_id)
DECLARE @InvoiceID INT = (SELECT invoice_id FROM invoices WHERE family_id = @FamilyID AND MONTH(start_date) = MONTH(@SessionDate))


IF @InvoiceID IS NOT NULL
	BEGIN

	DECLARE @Rate DECIMAL(5,3) = (SELECT TOP 1 rate FROM rate r INNER JOIN deleted d ON r.student_id = d.student_id WHERE MONTH(rateDate) <= MONTH(@SessionDate) ORDER BY rateDate DESC)

	IF @Rate IS NULL
		RETURN
	ELSE
		UPDATE invoices
		SET amount_due = amount_due - @Rate * (deleted.full_session + 1)
		FROM deleted
		WHERE invoice_id = @InvoiceID
		RETURN

	END
ELSE
	RETURN

END