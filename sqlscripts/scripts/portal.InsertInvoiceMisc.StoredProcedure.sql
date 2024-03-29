USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertInvoiceMisc]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
	FROM OPENJSON(@JsonInvoiceMisc)
    WITH (
        description VARCHAR(50) '$.description',
        rate decimal(5,2) '$.rate'
		)) as temp

END
GO
