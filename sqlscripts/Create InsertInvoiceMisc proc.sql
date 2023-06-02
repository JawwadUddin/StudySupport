CREATE PROCEDURE [portal].[InsertInvoiceMisc] 
(
	@InvoiveID INT,
	@JSONInvoiceMisc VARCHAR(MAX)
)
AS
BEGIN

INSERT INTO dbo.invoicesMisc (invoice_id, description, rate)
SELECT @InvoiveID,
	temp.description,
	temp.rate
	FROM
(SELECT * 
	FROM OPENJSON(@JsonInvoiCeMisc)
    WITH (
        description VARCHAR(50) '$.description',
        rate decimal '$.rate'
		)) as temp

END