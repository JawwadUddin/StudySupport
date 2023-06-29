--select * from payment p
--left join invoices i
--on p.invoice_id = i.invoice_id
--where p.family_id = 1011
--and payment_date = '06-28-2023'

--SELECT i.invoice_id, FORMAT(due_date, 'dd/MM/yyy') as due_date, amount_due, amount_paid FROM invoices i
--LEFT JOIN
--(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
--ON i.invoice_id = a .invoice_id
--WHERE family_id = @FamilyID
--AND amount_due > ISNULL(amount_paid, 0)

exec portal.selectOutstandingInvoicesbyfamilyid @familyid=1011
exec portal.SelectPaymentsByFamilyIDPaymentDate @familyid=1011, @paymentdate='2023-06-28'


DECLARE @PaymentIdTable TABLE (paymentID INT, invoiceID INT);
INSERT INTO @PaymentIdTable
SELECT p.payment_id, p.invoice_id FROM payment p
WHERE p.family_id = 1011
AND FORMAT(payment_date, 'dd-MM-yyyy') = '28-06-2023'

select * from @PaymentIdTable

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
WHERE p.family_id = 1011
AND FORMAT(payment_date, 'dd-MM-yyyy') = '28-06-2023'
--ORDER BY CASE 
--        WHEN due_date IS NULL THEN 1
--        ELSE 0
--   END, due_date
UNION
SELECT 
	null as payment_id,
	i.invoice_id, 
	null as payment,
	FORMAT(due_date, 'dd-MM-yyyy') as due_date, 
	amount_due, 
	amount_paid 
FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id
WHERE family_id = 1011
--AND i.invoice_id NOT IN (SELECT invoiceID FROM @PaymentIdTable)
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


SELECT 
	null as payment_id,
	i.invoice_id, 
	null as payment,
	FORMAT(due_date, 'dd-MM-yyyy') as due_date, 
	amount_due, 
	amount_paid 
FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id
WHERE family_id = 1011
AND amount_due > ISNULL(amount_paid, 0)




--SELECT * FROM payment p
--LEFT JOIN 
--(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
--ON p.invoice_id = a.invoice_id
--WHERE p.family_id = 1011
--AND FORMAT(payment_date, 'dd-MM-yyyy') = '28-06-2023'

