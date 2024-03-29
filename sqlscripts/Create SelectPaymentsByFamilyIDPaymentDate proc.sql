USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectPaymentsByFamilyIDPaymentDate]    Script Date: 13/07/2023 00:27:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectPaymentsByFamilyIDPaymentDate] 
(
	@FamilyID INT,
	@PaymentDate DATE,
	@PaymentType VARCHAR(20) OUTPUT
)
AS

BEGIN

DECLARE @PaymentIdTable TABLE (paymentID INT, invoiceID INT);
INSERT INTO @PaymentIdTable
SELECT p.payment_id, p.invoice_id FROM payment p
WHERE p.family_id = @FamilyID
AND payment_date = @PaymentDate

SELECT * FROM (SELECT 
	payment_id, 
	--p.family_id, 
	p.invoice_id, 
	--p.payment_date, 
	p.amount AS payment, 
	FORMAT(i.due_date, 'dd-MM-yyyy') as due_date,
	amount_due, 
	amount_paid 
FROM payment p
LEFT JOIN invoices i
ON p.invoice_id = i.invoice_id
LEFT JOIN 
(SELECT 
	invoice_id, 
	SUM(amount) AS amount_paid 
FROM payment tp WHERE tp.payment_id NOT IN (SELECT paymentID FROM @PaymentIdTable) 
GROUP BY invoice_id) AS a
ON p.invoice_id = a.invoice_id
WHERE p.family_id = @FamilyID
AND payment_date = @PaymentDate

UNION

SELECT 
	null as payment_id,
	--i.family_id,
	i.invoice_id, 
	null as payment,
	FORMAT(due_date, 'dd-MM-yyyy') as due_date, 
	amount_due, 
	amount_paid 
FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id
WHERE family_id = @FamilyID
AND i.invoice_id NOT IN (SELECT invoiceID FROM @PaymentIdTable WHERE invoiceID IS NOT NULL) 
AND amount_due > ISNULL(amount_paid, 0)) z
ORDER BY 
CASE 
        WHEN z.payment_id IS NULL THEN 1
        ELSE 0
   END, z.payment_id,
CASE 
        WHEN z.due_date IS NULL THEN 1
        ELSE 0
   END, z.due_date


SELECT @PaymentType =  (SELECT payment_type FROM paymentType
WHERE payment_type_id = 
(SELECT distinct top 1 payment_type_id from payment
WHERE family_id = @FamilyID
AND payment_date = @PaymentDate))

END