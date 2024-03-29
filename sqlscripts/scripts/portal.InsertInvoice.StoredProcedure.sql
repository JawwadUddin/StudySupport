USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertInvoice]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertInvoice] 
(
	@FamilyID INT,
	@InvoiceDate DATE,
	@DueDate DATE,
	@StartDate DATE,
	@AmountDue DECIMAL(6,2),
	@JSONInvoiceMisc VARCHAR(MAX),
	@InvoiceID INT OUTPUT
)
AS
BEGIN

DECLARE @InsertedInvoiceID AS TABLE (ID INT);

INSERT INTO dbo.invoices (family_id, invoice_date, due_date, start_date, amount_due)
OUTPUT Inserted.invoice_id
INTO @InsertedInvoiceID
VALUES 
	(@FamilyID, @InvoiceDate, @DueDate, @StartDate, @AmountDue)

DECLARE @NewInvoiceID AS INT = (SELECT TOP 1 ID FROM @InsertedInvoiceID)

--Add invoice items outside those related to studentSessions
IF @JSONInvoiceMisc IS NOT NULL
	EXEC portal.InsertInvoiceMisc @InvoiveID=@NewInvoiceID, @JSONInvoiceMisc=@JSONInvoiceMisc

SELECT @InvoiceID = @NewInvoiceID

END
GO
