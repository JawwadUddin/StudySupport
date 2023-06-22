CREATE PROCEDURE [portal].[SelectOutstandingInvoicesByFamilyID] @FamilyID INT
AS
SELECT i.invoice_id, FORMAT(due_date, 'dd/MM/yyy') as due_date, amount_due, amount_paid FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id
WHERE family_id = @FamilyID
AND amount_due > ISNULL(amount_paid, 0)