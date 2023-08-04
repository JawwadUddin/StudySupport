CREATE PROCEDURE [portal].[SelectAllPayments] 
AS
SELECT 
	payment_id,
	p.family_id,
	full_name,
	FORMAT(payment_date, 'dd/MM/yyyy') as payment_date,
	amount
FROM payment p
INNER JOIN dbo.family f
ON p.family_id = f.family_id
