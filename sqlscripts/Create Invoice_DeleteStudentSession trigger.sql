USE [studysupport]
GO
/****** Object:  Trigger [dbo].[Invoice_DeleteStudentSession]    Script Date: 17/05/2024 21:29:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[Invoice_DeleteStudentSession]
ON [dbo].[studentSessions]
AFTER DELETE
AS
BEGIN

	-- Declare a table variable to hold the calculated reductions for each family_id and invoice_id
    DECLARE @reductions TABLE (
        family_id INT,
        invoice_id INT,
        reduction DECIMAL(6, 2)
    )

    -- Insert the reductions into the table variable
    INSERT INTO @reductions (family_id, invoice_id, reduction)
    SELECT 
        s.family_id,
        i.invoice_id,
        SUM(r.rate * (d.full_session + 1)) AS reduction
    FROM 
        deleted d
    JOIN 
        students s ON d.student_id = s.student_id
    JOIN 
        invoices i ON s.family_id = i.family_id
    CROSS APPLY (
        SELECT TOP 1 rate
        FROM rate
        WHERE student_id = d.student_id 
            AND rateDate <= (SELECT session_date FROM sessionDates WHERE session_date_id = d.session_date_id)
        ORDER BY rateDate DESC
    ) r
    WHERE 
        i.invoice_id IS NOT NULL
        AND MONTH(i.start_date) = MONTH((SELECT session_date FROM sessionDates WHERE session_date_id = d.session_date_id))
		AND YEAR(i.start_date) = YEAR((SELECT session_date FROM sessionDates WHERE session_date_id = d.session_date_id))
        AND d.compensation_id IS NULL
    GROUP BY 
        s.family_id,
        i.invoice_id;

    -- Update the invoices table using the calculated reductions
    UPDATE i
    SET i.amount_due = i.amount_due - r.reduction
    FROM invoices i
    JOIN @reductions r ON i.invoice_id = r.invoice_id;

END
