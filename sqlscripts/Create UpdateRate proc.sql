USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateRate]    Script Date: 29/03/2024 15:11:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[UpdateRate] 
(
	@JSONRateInfo VARCHAR(MAX), 
	@StartDate DATE
)
AS
BEGIN
--INSERT NEW RATES IF STUDENT HAS NO PRIOR RATE
INSERT INTO rate (student_id, rate, rateDate)
(SELECT student_id, rate, @StartDate 
	FROM OPENJSON(@JSONRateInfo)
    WITH (
		rate_id INT '$.rate_id',
        student_id INT '$.student_id',
        rate decimal(5,3) '$.rate'
		) WHERE rate_id IS NULL)

--UPDATE RATES IF RATEDATE MONTH AND STARTDATE MONTH ARE THE SAME
UPDATE rate
SET rate = temp.rate
FROM rate r
INNER JOIN 
(SELECT student_id, rate, rate_id 
	FROM OPENJSON(@JSONRateInfo)
    WITH (
		rate_id INT '$.rate_id',
        student_id INT '$.student_id',
        rate decimal(5,3) '$.rate'
		)) AS temp ON r.rate_id = temp.rate_id
		WHERE MONTH(@StartDate) = MONTH(r.rateDate)
		AND r.rate != temp.rate

--INSERT RATES IF STARTDATE MONTH IS GREATER THAN RATEDATE MONTH ARE THE SAME
INSERT INTO rate (student_id, rate, rateDate)
SELECT  temp.student_id, temp.rate, @StartDate FROM rate r
INNER JOIN
(SELECT student_id, rate, rate_id 
	FROM OPENJSON(@JSONRateInfo)
    WITH (
		rate_id INT '$.rate_id',
        student_id INT '$.student_id',
        rate decimal(5,3) '$.rate'
		)) AS temp ON r.rate_id = temp.rate_id
		WHERE MONTH(@StartDate) > MONTH(r.rateDate)
		AND r.rate !=  temp.rate

END
