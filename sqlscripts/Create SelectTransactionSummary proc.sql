CREATE PROCEDURE [portal].[SelectTransactionSummary]
    @startDate DATE,
    @endDate DATE
AS
BEGIN
    -- Select invoices within the date range

    SELECT 
        FORMAT(start_date, 'yyyy-MM-dd') AS start_date,
        invoice_id,
        first_name + ' ' + last_name AS full_name,
        amount_due
    FROM invoices i
    INNER JOIN family f
    ON i.family_id = f.family_id
    WHERE start_date >= @startDate
    AND start_date <= @endDate
    ORDER BY start_date;

    -- Select payments within the date range
    SELECT 
        FORMAT(payment_date, 'yyyy-MM-dd') AS payment_date,
        invoice_id,
        first_name + ' ' + last_name AS full_name,
        amount,
        payment_type
    FROM payment p
    INNER JOIN family f
    ON p.family_id = f.family_id
    INNER JOIN paymentType pt
    ON p.payment_type_id = pt.payment_type_id
    WHERE payment_date >= @startDate
    AND payment_date <= @endDate
    ORDER BY payment_date;
END;
