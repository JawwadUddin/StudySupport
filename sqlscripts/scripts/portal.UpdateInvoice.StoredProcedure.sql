USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateInvoice]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateInvoice]
(
	@InvoiceID INT,
	@InvoiceDate DATE,
	@DueDate DATE,
	@JSONInvoiceMisc VARCHAR(MAX)
)
AS
BEGIN

--Update invoice first
UPDATE invoices
SET invoice_date = @InvoiceDate,
	due_date = @DueDate
WHERE invoice_id = @InvoiceID

--update invoice misc
----step 1: delete any invoice_misc where invoice_misc_id does not exist in JSONInvoiceMisc
DELETE FROM invoicesMisc
WHERE invoice_misc_id IN
(SELECT im.invoice_misc_id
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
AND temp.invoice_misc_id IS NULL)

----step 2: update any invoice_misc where invoice_misc_id exist in JSONInvoiceMisc
UPDATE invoicesMisc
SET description = temp.description,
	rate = temp.rate
	from invoicesMisc im
INNER JOIN
(SELECT invoice_misc_id, description, rate 
	FROM OPENJSON(@JsonInvoiceMisc)
    WITH (
		invoice_misc_id INT '$.invoiceMiscID',
        description VARCHAR(50) '$.description',
        rate decimal(5,2) '$.rate'
		)) as temp on im.invoice_misc_id = temp.invoice_misc_id


----step 3: insert any invoice_misc where there are no invoice_misc_id in JSONInvoiceMisc
INSERT INTO invoicesMisc (invoice_id, description, rate)
SELECT @InvoiceID as invoice_id, description, rate 
	FROM OPENJSON(@JsonInvoiceMisc)
    WITH (
		invoice_misc_id INT '$.invoiceMiscID',
        description VARCHAR(50) '$.description',
        rate decimal(5,2) '$.rate'
		) as temp
WHERE temp.invoice_misc_id IS NULL
END
GO
