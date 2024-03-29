USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectAllInvoices]    Script Date: 23/06/2023 12:27:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectAllInvoices] 
AS 
SELECT
	invoice_id,
	full_name,
	FORMAT(invoice_date, 'dd-MM-yyyy') as invoice_date,
	FORMAT(due_date, 'dd-MM-yyyy') as due_date,
	FORMAT(start_date, 'dd-MM-yyyy') as start_date,
	amount_due
FROM dbo.invoices i
INNER JOIN dbo.family f
ON i.family_id = f.family_id
