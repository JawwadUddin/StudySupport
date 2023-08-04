CREATE PROCEDURE [portal].[UpdateRate] 
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
        rate decimal(5,2) '$.rate'
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
        student_id INT '$.rate_id',
        rate decimal(5,2) '$.rate'
		)) AS temp ON r.rate_id = temp.rate_id
		WHERE MONTH(@StartDate) = MONTH(r.rateDate)

--INSERT RATES IF STARTDATE MONTH IS GREATER THAN RATEDATE MONTH ARE THE SAME
INSERT INTO rate (student_id, rate, rateDate)
SELECT  temp.student_id, temp.rate, @StartDate FROM rate r
INNER JOIN
(SELECT student_id, rate, rate_id 
	FROM OPENJSON(@JSONRateInfo)
    WITH (
		rate_id INT '$.rate_id',
        student_id INT '$.rate_id',
        rate decimal(5,2) '$.rate'
		)) AS temp ON r.rate_id = temp.rate_id
		WHERE MONTH(@StartDate) > MONTH(r.rateDate)

END