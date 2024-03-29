USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectInvoiceByID]    Script Date: 30/09/2023 19:51:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectInvoiceByID] @InvoiceID INT 
AS 

SELECT
	invoice_id,
	i.family_id,
	first_name,
	last_name,
	address,
	post_code,
	mobile,
	email,
	FORMAT(invoice_date, 'yyyy-MM-dd') as invoice_date,
	FORMAT(due_date, 'yyyy-MM-dd') as due_date,
	FORMAT(start_date, 'yyyy-MM-dd') as start_date,
	amount_due,
	(SELECT ISNULL(SUM(amount), 0) FROM payment p where p.invoice_id = @InvoiceID) AS amount_paid,
	(SELECT * FROM dbo.invoicesMisc WHERE invoice_id=@InvoiceID FOR JSON AUTO) AS JSONInvoiceMisc
FROM dbo.invoices i
INNER JOIN dbo.family f
ON i.family_id = f.family_id
WHERE invoice_id = @InvoiceID
