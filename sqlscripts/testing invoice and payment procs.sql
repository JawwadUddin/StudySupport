select * from family
--tea drinker: 1011

DECLARE @json VARCHAR(MAX)
SET @json = '[{ "description":"stationary", "rate": 20}, 
				{ "description":"books", "rate": 60}
              ]';



declare @NewInvoiceID INT
EXEC portal.InsertInvoice @FamilyID=1011, @InvoiceDate='05-26-2023', @DueDate='05-20-2023', @StartDate='05-01-2023', @AmountDue=200, @JsonInvoiceMisc=@json, @InvoiceID= @NewInvoiceID output


select * from dbo.invoices
select * from dbo.invoicesMisc

select * from sessionDates

delete from dbo.invoices
delete from dbo.invoicesMisc