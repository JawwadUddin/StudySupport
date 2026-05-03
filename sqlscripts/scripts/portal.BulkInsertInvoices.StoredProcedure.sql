USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[BulkInsertInvoices]    Script Date: 02/05/2026 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[BulkInsertInvoices]
(
	@StartDate DATE
)
AS
BEGIN
	SET NOCOUNT ON;

	-- Temp table to collect results
	DECLARE @Results TABLE (
		invoice_id INT,
		family_id INT,
		first_name VARCHAR(50),
		last_name VARCHAR(50),
		amount_due DECIMAL(6,2)
	)

	-- Cursor over families who do NOT already have an invoice for this month
	DECLARE @FamilyID INT, @FirstName VARCHAR(50), @LastName VARCHAR(50)
	DECLARE family_cursor CURSOR LOCAL FAST_FORWARD FOR
		SELECT f.family_id, f.first_name, f.last_name
		FROM family f
		WHERE NOT EXISTS (
			SELECT 1 FROM invoices i
			WHERE i.family_id = f.family_id
			AND MONTH(i.start_date) = MONTH(@StartDate)
			AND YEAR(i.start_date) = YEAR(@StartDate)
		)

	OPEN family_cursor
	FETCH NEXT FROM family_cursor INTO @FamilyID, @FirstName, @LastName

	WHILE @@FETCH_STATUS = 0
	BEGIN
		-- Calculate amount_due for this family using the same logic as SelectSessionsForInvoice + InvoiceForm:
		-- For each student: count sessions (excluding compensation), full_session=1 counts as 2, else 1
		-- Multiply by the latest rate where rateDate <= @StartDate
		DECLARE @AmountDue DECIMAL(6,2) = 0

		SELECT @AmountDue = ISNULL(SUM(sq.qty * sr.rate), 0)
		FROM students s
		CROSS APPLY (
			SELECT ISNULL(SUM(CASE WHEN ss.full_session = 1 THEN 2 ELSE 1 END), 0) AS qty
			FROM studentSessions ss
			INNER JOIN sessionDates d ON ss.session_date_id = d.session_date_id
			WHERE ss.student_id = s.student_id
			AND ss.compensation_id IS NULL
			AND MONTH(d.session_date) = MONTH(@StartDate)
			AND YEAR(d.session_date) = YEAR(@StartDate)
		) sq
		CROSS APPLY (
			SELECT TOP 1 ISNULL(r.rate, 0) AS rate
			FROM rate r
			WHERE r.student_id = s.student_id
			AND r.rateDate <= @StartDate
			ORDER BY r.rateDate DESC
		) sr
		WHERE s.family_id = @FamilyID

		-- Only create invoice if there are sessions with a non-zero amount
		IF @AmountDue > 0
		BEGIN
			INSERT INTO dbo.invoices (family_id, invoice_date, due_date, start_date, amount_due)
			VALUES (@FamilyID, GETDATE(), DATEADD(DAY, 14, @StartDate), @StartDate, @AmountDue)

			DECLARE @NewInvoiceID INT = SCOPE_IDENTITY()

			INSERT INTO @Results VALUES (@NewInvoiceID, @FamilyID, @FirstName, @LastName, @AmountDue)
		END

		FETCH NEXT FROM family_cursor INTO @FamilyID, @FirstName, @LastName
	END

	CLOSE family_cursor
	DEALLOCATE family_cursor

	-- Return all created invoices
	SELECT * FROM @Results
END
GO
