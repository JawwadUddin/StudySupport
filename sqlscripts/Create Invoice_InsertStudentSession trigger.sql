USE [studysupport]
GO
/****** Object:  Trigger [dbo].[Invoice_InsertStudentSession]    Script Date: 17/05/2024 21:29:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[Invoice_InsertStudentSession]
ON [dbo].[studentSessions]
AFTER INSERT
AS
BEGIN

  -- Declare a table variable to hold the calculated increases for each family_id and invoice_id
    DECLARE @increases TABLE (
        family_id INT,
        invoice_id INT,
        increase DECIMAL(6, 2)
    )

    -- Insert the increases into the table variable
    INSERT INTO @increases (family_id, invoice_id, increase)
    SELECT 
        s.family_id,
        inv.invoice_id,
        SUM(r.rate * (i.full_session + 1)) AS increase
    FROM 
        inserted i
    JOIN 
        students s ON i.student_id = s.student_id
    JOIN 
        invoices inv ON s.family_id = inv.family_id
    CROSS APPLY (
        SELECT TOP 1 rate
        FROM rate r
        WHERE r.student_id = i.student_id
            AND rateDate <= (SELECT session_date FROM sessionDates WHERE session_date_id = i.session_date_id)
        ORDER BY r.rateDate DESC
    ) r
    WHERE 
        inv.invoice_id IS NOT NULL
        AND i.compensation_id IS NULL
        AND MONTH(inv.start_date) = MONTH((SELECT session_date FROM sessionDates WHERE session_date_id = i.session_date_id))
		AND YEAR(inv.start_date) = YEAR((SELECT session_date FROM sessionDates WHERE session_date_id = i.session_date_id))
    GROUP BY 
        s.family_id,
        inv.invoice_id;

    -- Update the invoices table using the calculated increases
    UPDATE inv
    SET inv.amount_due = inv.amount_due + inc.increase
    FROM invoices inv
    JOIN @increases inc ON inv.invoice_id = inc.invoice_id;


END
