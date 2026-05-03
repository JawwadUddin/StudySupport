CREATE PROCEDURE [portal].[SelectAllInvoicesDetailed]
    @Month DATE = NULL
AS
BEGIN
    SELECT
        i.invoice_id,
        i.family_id,
        f.first_name,
        f.last_name,
        FORMAT(i.invoice_date, 'yyyy-MM-dd') as invoice_date,
        FORMAT(i.due_date, 'yyyy-MM-dd') as due_date,
        FORMAT(i.start_date, 'yyyy-MM-dd') as start_date,
        i.amount_due,
        ISNULL(p.amount_paid, 0) as amount_paid,
        i.amount_due - ISNULL(p.amount_paid, 0) as balance,
        CASE
            WHEN i.amount_due <= ISNULL(p.amount_paid, 0) THEN 'Paid'
            ELSE CAST(DATEDIFF(day, GETDATE(), i.due_date) AS VARCHAR)
        END as status
    FROM dbo.invoices i
    INNER JOIN dbo.family f ON i.family_id = f.family_id
    LEFT JOIN (
        SELECT invoice_id, SUM(amount) AS amount_paid
        FROM payment
        GROUP BY invoice_id
    ) p ON i.invoice_id = p.invoice_id
    WHERE (
        @Month IS NULL
        OR (YEAR(i.start_date) = YEAR(@Month) AND MONTH(i.start_date) = MONTH(@Month))
    )
    ORDER BY i.due_date ASC
END
