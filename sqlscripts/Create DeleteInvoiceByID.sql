USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[DeleteInvoiceByID]    Script Date: 24/08/2023 17:20:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[DeleteInvoiceByID] @InvoiceID INT
AS
BEGIN

    -- Calculate the sum of payments for each payment_date and payment_type_id
    DECLARE @PaymentAmounts TABLE (
        PaymentDate DATE,
        PaymentTypeID INT,
        TotalAmount DECIMAL(6, 2)
    );

    INSERT INTO @PaymentAmounts (PaymentDate, PaymentTypeID, TotalAmount)
    SELECT payment_date, payment_type_id, SUM(amount) AS TotalAmount
    FROM payment
    WHERE invoice_id = @InvoiceID
    GROUP BY payment_date, payment_type_id;

    -- Iterate through the calculated payment_amounts
    DECLARE @PaymentDate DATE, @PaymentTypeID INT, @TotalAmount DECIMAL(6, 2);

    DECLARE PaymentCursor CURSOR FOR
    SELECT PaymentDate, PaymentTypeID, TotalAmount
    FROM @PaymentAmounts;

    OPEN PaymentCursor;
    FETCH NEXT FROM PaymentCursor INTO @PaymentDate, @PaymentTypeID, @TotalAmount;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Update or insert into payments
        IF EXISTS (
            SELECT 1
            FROM payment
            WHERE invoice_id IS NULL
            AND payment_date = @PaymentDate
            AND payment_type_id = @PaymentTypeID
            AND family_id = (SELECT family_id FROM invoices WHERE invoice_id = @InvoiceID)
        )
        BEGIN
            UPDATE payment
            SET amount = amount + @TotalAmount
            WHERE invoice_id IS NULL
            AND payment_date = @PaymentDate
            AND payment_type_id = @PaymentTypeID
            AND family_id = (SELECT family_id FROM invoices WHERE invoice_id = @InvoiceID);
        END
        ELSE
        BEGIN
            INSERT INTO payment (family_id, invoice_id, payment_date, payment_type_id, amount)
            VALUES (
                (SELECT family_id FROM invoices WHERE invoice_id = @InvoiceID),
                NULL,
                @PaymentDate,
                @PaymentTypeID,
                @TotalAmount
            );
        END;

        FETCH NEXT FROM PaymentCursor INTO @PaymentDate, @PaymentTypeID, @TotalAmount;
    END;

    CLOSE PaymentCursor;
    DEALLOCATE PaymentCursor;

    -- Delete payments with the given invoice_id
    DELETE FROM payment
    WHERE invoice_id = @InvoiceID;

    -- Delete the invoice
    DELETE FROM invoices
    WHERE invoice_id = @InvoiceID;

END