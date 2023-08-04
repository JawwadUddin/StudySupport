CREATE PROCEDURE [portal].[DeleteInvoiceByID] @InvoiceID INT
AS
BEGIN

-- First unapply all payments associated with the invoice

UPDATE payment
SET invoice_id = NULL
WHERE invoice_id = @InvoiceID

-- Delete Invoice

DELETE FROM invoices
WHERE invoice_id = @InvoiceID

END