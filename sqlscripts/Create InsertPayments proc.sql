USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertPayments]    Script Date: 29/06/2023 14:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[InsertPayments] 
(
	@JSONTransactionInfo VARCHAR(MAX),
	@PaymentDate DATE,
	@FamilyID INT,
	@Credit DECIMAL(6, 2)
)
AS
BEGIN

INSERT INTO payment (family_id, invoice_id, payment_date, amount)
SELECT @FamilyID,
	temp.invoice_id,
	@PaymentDate,
	temp.payment
	FROM
(SELECT * 
	FROM OPENJSON(@JSONTransactionInfo)
    WITH (
        invoice_id	int '$.id',
        payment decimal(5,2) '$.payment'
		) WHERE payment IS NOT NULL AND payment != 0) as temp

IF @Credit IS NOT NULL AND @Credit != 0
	--check if a credit (payment with no invoice_id) already exists for the familyID and paymentDate
	IF EXISTS (SELECT * FROM payment WHERE family_id = @FamilyID AND payment_date = @PaymentDate AND invoice_id IS NULL)
		UPDATE payment
		SET amount = @Credit
		WHERE family_id = @FamilyID AND payment_date = @PaymentDate AND invoice_id IS NULL
	ELSE
		INSERT INTO payment (family_id, invoice_id, payment_date, amount)
		SELECT @FamilyID,
			NULL,
			@PaymentDate,
			@Credit

END