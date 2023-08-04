select * from family
--tea drinker: 1011

DECLARE @json VARCHAR(MAX)
SET @json = '[{ "description":"stationary", "rate": 20}, 
				{ "description":"books", "rate": 60}
              ]';



declare @NewInvoiceID INT
EXEC portal.InsertInvoice @FamilyID=1011, @InvoiceDate='05-26-2023', @DueDate='05-20-2023', @StartDate='05-01-2023', @AmountDue=200, @JsonInvoiceMisc=@json, @InvoiceID= @NewInvoiceID output


select * from dbo.invoices where invoice_id = 20024
select * from dbo.invoicesMisc where invoice_id = 20024


DECLARE @InvoiceID INT = 20024
DECLARE @JsonInvoiceMisc VARCHAR(MAX)
SET @JsonInvoiceMisc = '[{ "description":"updated", "rate": 25, "invoiceMiscID": 61}, 
				{ "description":"newOne", "rate": 100}
              ]';

--update invoice misc
----step 1: delete any invoice_misc where invoice_misc_id does not exist in JSONInvoiceMisc
--DELETE FROM invoicesMisc
--WHERE invoice_misc_id IN
(
SELECT im.invoice_misc_id as im, temp.invoice_misc_id as temp
FROM invoicesMisc im
INNER JOIN  invoices i
ON im.invoice_id = i.invoice_id
LEFT JOIN 
(SELECT invoice_misc_id, description, rate 
	FROM OPENJSON(@JsonInvoiceMisc)
    WITH (
		invoice_misc_id INT '$.invoiceMiscID',
        description VARCHAR(50) '$.description',
        rate decimal(5,2) '$.rate'
		)) as temp ON im.invoice_misc_id = temp.invoice_misc_id
WHERE i.invoice_id = @InvoiceID
AND temp.invoice_misc_id IS NULL
)