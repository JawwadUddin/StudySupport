USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdatePayments]    Script Date: 09/06/2024 03:21:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[UpdatePayments] 
(
	@JSONTransactionInfo VARCHAR(MAX),
	@PaymentDate DATE,
	@NewPaymentDate DATE,
	@PaymentType VARCHAR(20),
	@FamilyID INT,
	@Credit DECIMAL(6, 2)
)
AS
BEGIN

Declare @PaymentTypeID INT = (SELECT payment_type_id FROM paymentType WHERE payment_type = @PaymentType)

--step 1: if credit is 0 --> delete credit, otherwise update the credit
IF @Credit IS NULL OR @Credit = 0
	BEGIN
		DELETE FROM payment 
		WHERE family_id = @FamilyID
		AND payment_date = @PaymentDate
		AND invoice_id IS NULL
	END
ELSE
	IF EXISTS (SELECT * FROM payment WHERE family_id = @FamilyID AND payment_date = @PaymentDate AND invoice_id IS NULL) 
		BEGIN
			UPDATE payment
			SET amount = @Credit,
			payment_date = @NewPaymentDate,
			payment_type_id = @PaymentTypeID
			WHERE family_id = @FamilyID
			AND payment_date = @PaymentDate
			AND invoice_id IS NULL
		END
	ELSE
		BEGIN
			INSERT INTO payment (family_id, invoice_id, payment_date, amount, payment_type_id)
			SELECT @FamilyID,
				NULL,
				@NewPaymentDate,
				@Credit,
				@PaymentTypeID
		END

--step 2: update all payments
UPDATE payment
SET amount = temp.payment,
	payment_date = @NewPaymentDate,
	payment_type_id = @PaymentTypeID
FROM payment p
INNER JOIN
(SELECT invoice_id, payment, payment_id 
	FROM OPENJSON(@JSONTransactionInfo)
    WITH (
        invoice_id	int '$.id',
        payment_id	int '$.paymentID',
        payment decimal(5,2) '$.payment'
		) WHERE payment IS NOT NULL AND payment != 0 and invoice_id IS NOT NULL) as temp on p.payment_id = temp.payment_id

--step 3: remove all payments where the payment is null or 0
DELETE FROM payment 
WHERE payment_id IN
(SELECT payment_id 
	FROM OPENJSON(@JSONTransactionInfo)
    WITH (
        invoice_id	int '$.id',
        payment_id	int '$.paymentID',
        payment decimal(5,2) '$.payment'
		) WHERE payment IS NULL OR payment = 0 AND invoice_id IS NOT NULL)

--step 4: insert any new payments, where the invoice_id is not in the payments for that family and date already
INSERT INTO payment (family_id, invoice_id, payment_date, amount, payment_type_id)
SELECT @FamilyID,
	temp.invoice_id,
	@NewPaymentDate,
	temp.payment,
	@PaymentTypeID
	FROM
(SELECT * 
	FROM OPENJSON(@JSONTransactionInfo)
    WITH (
        invoice_id	int '$.id',
        payment decimal(5,2) '$.payment'
		) WHERE payment IS NOT NULL AND payment != 0 AND invoice_id NOT IN(SELECT invoice_id FROM payment p WHERE family_id = @FamilyID AND payment_date = @NewPaymentDate AND invoice_id IS NOT NULL) AND invoice_id IS NOT NULL  ) as temp

END
