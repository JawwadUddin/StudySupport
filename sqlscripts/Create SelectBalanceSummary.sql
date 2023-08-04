CREATE PROCEDURE [portal].[SelectBalanceSummary]
AS
SELECT 
SUM(openbalance) as open_balance,
SUM(overdue) as overdue_balance,
COUNT(CASE WHEN overdue > 0 THEN 1 END) AS overdue_invoices,
COUNT (*) AS open_invoices
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
GROUP BY family_id, i.invoice_id) as temp
