USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectAllInvoices]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllInvoices] 
AS 
SELECT
	invoice_id,
	family_id,
	FORMAT(invoice_date, 'dd/MM/yyyy') as invoice_date,
	FORMAT(due_date, 'dd/MM/yyyy') as due_date,
	FORMAT(start_date, 'dd/MM/yyyy') as start_date,
	amount_due
FROM dbo.invoices
GO
