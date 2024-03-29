USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertPayments]    Script Date: 12/08/2023 01:15:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[InsertPayments] 
(
	@JSONTransactionInfo VARCHAR(MAX),
	@PaymentDate DATE,
	@PaymentType VARCHAR(20),
	@FamilyID INT,
	@Credit DECIMAL(6, 2)
)
AS
BEGIN

IF EXISTS (SELECT * FROM payment WHERE family_id = @FamilyID AND payment_date = @PaymentDate)
	THROW 50001, 'A payment has already been made for this date: either select a new date or update the existing payment', 1

Declare @PaymentTypeID INT = (SELECT payment_type_id FROM paymentType WHERE payment_type = @PaymentType)

INSERT INTO payment (family_id, invoice_id, payment_date, amount, payment_type_id)
SELECT @FamilyID,
	temp.invoice_id,
	@PaymentDate,
	temp.payment,
	(SELECT payment_type_id FROM paymentType WHERE payment_type = @PaymentType)
	FROM
(SELECT * 
	FROM OPENJSON(@JSONTransactionInfo)
    WITH (
        invoice_id	int '$.id',
        payment decimal(5,2) '$.payment'
		) WHERE payment IS NOT NULL AND payment != 0) as temp

IF @Credit IS NOT NULL AND @Credit != 0
	--check if a credit (payment with no invoice_id) already exists for the familyID and paymentDate
	--IF EXISTS (SELECT * FROM payment WHERE family_id = @FamilyID AND payment_date = @PaymentDate AND invoice_id IS NULL)
	--	UPDATE payment
	--	SET amount = amount + @Credit,
	--	payment_type_id = @PaymentTypeID
	--	WHERE family_id = @FamilyID AND payment_date = @PaymentDate AND invoice_id IS NULL
	--ELSE
		INSERT INTO payment (family_id, invoice_id, payment_date, amount, payment_type_id)
		SELECT @FamilyID,
			NULL,
			@PaymentDate,
			@Credit,
			@PaymentTypeID

END