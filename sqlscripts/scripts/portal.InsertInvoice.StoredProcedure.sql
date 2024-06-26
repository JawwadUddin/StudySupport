USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertInvoice]    Script Date: 18/05/2024 01:03:14 ******/
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
	@JSONRateInfo VARCHAR(MAX),
	@InvoiceID INT OUTPUT
)
AS
BEGIN

IF EXISTS (SELECT * FROM invoices WHERE family_id = @FamilyID AND MONTH(start_date) = MONTH(@StartDate) AND YEAR(start_date) = YEAR(@StartDate))
	THROW 50001, 'An invoice that has a start date of this month has already been made: either select a new start date or update the existing invoice', 1

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

IF @JSONRateInfo IS NOT NULL
	EXEC portal.UpdateRate @JSONRateInfo=@JSONRateInfo, @StartDate=@StartDate

SELECT @InvoiceID = @NewInvoiceID

END
GO
