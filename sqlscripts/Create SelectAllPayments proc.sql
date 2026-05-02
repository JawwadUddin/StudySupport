CREATE OR ALTER PROCEDURE [portal].[SelectAllPayments]
	@Month DATE = NULL
AS
SELECT
	payment_id,
	p.family_id,
	f.first_name,
	f.last_name,
	FORMAT(payment_date, 'dd/MM/yyyy') as payment_date,
	amount
FROM payment p
INNER JOIN dbo.family f
ON p.family_id = f.family_id
WHERE (@Month IS NULL
	OR (YEAR(payment_date) = YEAR(@Month) AND MONTH(payment_date) = MONTH(@Month)))
