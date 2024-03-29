USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectOutstandingInvoicesByFamilyID]    Script Date: 06/07/2023 00:29:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectOutstandingInvoicesByFamilyID] @FamilyID INT
AS
SELECT i.invoice_id, FORMAT(due_date, 'yyyy-MM-dd') as due_date, amount_due, amount_paid FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id
WHERE family_id = @FamilyID
AND amount_due > ISNULL(amount_paid, 0)
ORDER BY due_date