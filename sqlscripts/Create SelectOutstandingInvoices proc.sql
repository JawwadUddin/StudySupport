USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectOutstandingInvoices]    Script Date: 30/09/2023 19:52:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectOutstandingInvoices]
AS
SELECT 
	f.family_id,
	first_name,
	last_name,
	students = STUFF(
	(SELECT ', ' + temp.full_name
	FROM 
	(SELECT s.family_id, s.first_name + ' ' + s.last_name as full_name FROM students s
	WHERE s.family_id = f.family_id) AS temp
	FOR XML PATH ('')), 1, 2, ''),
	mobile, 
	email,
	overdue_invoices,
	overdue_balance,
	open_balance
FROM family f
LEFT JOIN
--replacement of commented out code below
(SELECT 
	family_id,
	SUM(openbalance) as open_balance,
	SUM(overdue) as overdue_balance,
	COUNT(CASE WHEN overdue > 0 THEN 1 END) AS overdue_invoices
FROM
(SELECT 
	family_id,
	i.invoice_id,
	SUM(amount_due - ISNULL(amount_paid, 0)) as openbalance,
	SUM(case when due_date < GETDATE() then amount_due - ISNULL(amount_paid, 0) else 0 end) as overdue
FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id WHERE amount_due > ISNULL(amount_paid, 0)
GROUP BY family_id, i.invoice_id) as b
GROUP BY family_id) as temp2

--(SELECT 
--	family_id,
--	SUM(amount_due - ISNULL(amount_paid, 0)) as overdue_balance,
--	COUNT(*) AS overdue_invoices
--FROM invoices i
--LEFT JOIN
--(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
--ON i.invoice_id = a .invoice_id
--WHERE due_date < GETDATE() 
--AND amount_due > ISNULL(amount_paid, 0)
--GROUP BY family_id) as temp2

ON f.family_id = temp2.family_id
ORDER BY overdue_balance DESC
