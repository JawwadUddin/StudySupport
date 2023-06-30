alter PROCEDURE [portal].[UpdatePayments] 
(
	@JSONTransactionInfo VARCHAR(MAX),
	@PaymentDate DATE,
	@FamilyID INT,
	@Credit DECIMAL(6, 2)
)
AS
BEGIN

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
			SET amount = @Credit
			WHERE family_id = @FamilyID
			AND payment_date = @PaymentDate
			AND invoice_id IS NULL
		END
	ELSE
		BEGIN
			INSERT INTO payment (family_id, invoice_id, payment_date, amount)
			SELECT @FamilyID,
				NULL,
				@PaymentDate,
				@Credit
		END

--step 2: update all payments
UPDATE payment
SET amount = temp.payment
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
		) WHERE payment IS NOT NULL AND payment != 0 AND invoice_id NOT IN(SELECT invoice_id FROM payment p WHERE family_id = @FamilyID AND payment_date = @PaymentDate AND invoice_id IS NOT NULL) ) as temp


END
