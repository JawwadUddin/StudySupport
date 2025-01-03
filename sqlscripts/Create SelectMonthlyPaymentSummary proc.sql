CREATE PROCEDURE [portal].[SelectMonthlyPaymentSummary]
AS

BEGIN

SELECT 
  YEAR(payment_date) AS year,
  MONTH(payment_date) AS month,
  SUM(amount) AS totalAmount
FROM payment
WHERE payment_date >= DATEADD(MONTH, -12, GETDATE())
GROUP BY YEAR(payment_date), MONTH(payment_date)
ORDER BY Year, Month;

END