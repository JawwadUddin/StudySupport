USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectTransactionsByFamilyID]    Script Date: 06/07/2023 00:02:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectTransactionsByFamilyID] @FamilyID INT
AS
BEGIN

SELECT
	FORMAT(start_date, 'yyyy-MM-dd') as date,
	'Invoice' as type,
	invoice_id as id,
	amount_due,
	NULL as credit,
	ISNULL((SELECT SUM(amount) FROM payment p WHERE p.invoice_id = i.invoice_id), 0) as amount_paid,
	CASE
		WHEN amount_due > ISNULL((SELECT SUM(amount) FROM payment p WHERE p.invoice_id = i.invoice_id), 0)
			THEN CAST(DATEDIFF(day, GETDATE(), due_date) AS varchar)
		ELSE 'Paid'
	END as status
FROM dbo.invoices i
WHERE i.family_id = @FamilyID
UNION
SELECT 
	FORMAT(payment_date, 'yyyy-MM-dd') as date,
	'Payment' as type,
	NULL as id,
	NULL AS amount_due,
	(SELECT SUM(amount) FROM payment tp where tp.payment_date = p.payment_date AND tp.family_id = @FamilyID AND tp.invoice_id IS NULL) as credit,
	SUM(amount) as amount_paid,
	NULL as status
FROM payment p
WHERE p.family_id = @FamilyID
GROUP BY payment_date
ORDER BY date DESC

END
