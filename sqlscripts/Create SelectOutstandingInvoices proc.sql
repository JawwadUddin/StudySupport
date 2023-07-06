USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectOutstandingInvoices]    Script Date: 06/07/2023 01:47:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectOutstandingInvoices]
AS
SELECT 
	f.family_id,
	full_name,
	students = STUFF(
	(SELECT ', ' + temp.full_name
	FROM 
	(SELECT s.family_id, s.full_name FROM students s
	WHERE s.family_id = f.family_id) AS temp
	FOR XML PATH ('')), 1, 2, ''),
	mobile, 
	email,
	overdue_invoices,
	overdue_balance
FROM family f
LEFT JOIN
(SELECT 
	family_id,
	SUM(amount_due - ISNULL(amount_paid, 0)) as overdue_balance,
	COUNT(*) AS overdue_invoices
FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id
WHERE due_date < GETDATE() 
AND amount_due > ISNULL(amount_paid, 0)
GROUP BY family_id) as temp2
ON f.family_id = temp2.family_id
ORDER BY overdue_balance DESC
