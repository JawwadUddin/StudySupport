--create test - we need the test_name, syllabus_id, and all the accompanying questions in the following format as an example:
DECLARE @TestName VARCHAR(20) = 'DemoTest1';
DECLARE @SyllabusID INT = 2


DECLARE @json VARCHAR(MAX);
SET @json = '[{"topic_id":12, "difficulty":"8", "marks": 4}, 
				{"topic_id":43, "difficulty":"9", "marks": 6},
				{"topic_id":22, "difficulty":"4", "marks": 3},
				{"topic_id":5, "difficulty":"3", "marks": 2}
              ]';

DECLARE @InsertedTestID AS TABLE (ID INT);

INSERT INTO tests (test_name, syllabus_id)
OUTPUT Inserted.test_id
INTO @InsertedTestID
VALUES (@TestName, @SyllabusID)

DECLARE @NewTestID AS INT = (SELECT TOP 1 ID FROM @InsertedTestID)

INSERT INTO dbo.scores ()
SELECT @NewTestID AS test_id, 
	temp.topic_id,
	temp.difficulty,
	temp.marks AS marks_received
	FROM
(SELECT * FROM OPENJSON(@json)
        WITH (  
			topic_id int '$.topic_id',
            difficulty VARCHAR(10) '$.difficulty',
            marks int '$.marks'
			)) as temp

			select * from tests
			select * from questions
			exec portal.SelectQuestionsForTest @TestID=4

DECLARE @TestID INT = 1
DECLARE @JsonQuestions VARCHAR(MAX);
SET @JsonQuestions = '[{"question_id":1, "topic_id":11, "difficulty":"7", "marks": 4}, 
				{"question_id":2, "topic_id":3, "difficulty":"2", "marks": 3},
				{"question_id":3, "topic_id":7, "difficulty":"3", "marks": 4},
				{"question_id":4, "topic_id":12, "difficulty":"7", "marks": 5},
				{"question_id":5, "topic_id":23, "difficulty":"8", "marks": 6}
              ]';

/*UPDATE*/
UPDATE questions
SET topic_id = temp.topic_id,
difficulty = temp.difficulty,
marks = temp.marks from questions q
INNER JOIN
(SELECT question_id, topic_id, difficulty, marks 
FROM OPENJSON(@JsonQuestions)
WITH (
	question_id INT '$.question_id',
	topic_id INT '$.topic_id',
	difficulty VARCHAR(10) '$.difficulty',
    marks int '$.marks'
)) as temp ON q.question_id = temp.question_id

/*INSERT*/
INSERT INTO dbo.questions (test_id, topic_id, difficulty, marks)
SELECT @TestID as test_id, 
	temp.topic_id,
	temp.difficulty,
	temp.marks
	FROM
(SELECT * 
	FROM OPENJSON(@JsonQuestions)
    WITH (  
		question_id INT '$.question_id',
		topic_id int '$.topic_id',
        difficulty VARCHAR(10) '$.difficulty',
        marks int '$.marks'
		)) as temp
WHERE temp.question_id IS NULL 

select * from questions where test_id=1
