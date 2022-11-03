select * from students where student_id = 1032 

select * from scores where student_id = 1032

select * from questions where test_id = 2
--question id: 7,8,9, marks out of: 3,2,6
--date: 11/03/2022

INSERT INTO scores (student_id, question_id, marks_received, test_date)
VALUES 
 (1032, 16, 3, '11/03/2022'),
  (1032, 17, 5, '11/03/2022'),
  (1032, 18, 2, '11/03/2022'),
  (1032, 19, 2, '11/03/2022')


select * from questions where test_id = 4

--the following selects the scores of a student based on a test 
select * from scores s 
where student_id = 1032
and s.question_id in (select question_id from questions where test_id = 4)

select 
	score_id,
	s.question_id,
	marks_received,
	marks,
	topic_id
from scores s 
inner join dbo.questions q on q.question_id = s.question_id
where student_id = 1032
and test_id =4

EXEC PORTAL.[SelectStudentScoresByTestID] @StudentID=1032, @TestID=2

select  DISTINCT q.test_id, test_name from scores s 
inner join questions q on s.question_id = q.question_id
inner join tests t on q.test_id = t.test_id
where student_id = 1032

EXEC PORTAL.[SelectStudentTestsCompleted] @StudentID = 1032


exec portal.SelectQuestionsForTest @TestID =4

--get question id and marks from the json array, also pass testDate and studentID in;

DECLARE @TestDate DATE = '11/02/2022'
DECLARE @StudentID INT = 1031
DECLARE @JsonScores VARCHAR(MAX);
SET @JsonScores = '[{"question_id":16,"marks_received": 1}, 
				{"question_id":17, "marks_received": 2},
				{"question_id":18, "marks_received": 1},
				{"question_id":19, "marks_received": 6}
              ]';

--SELECT
--	@StudentID AS StudentID,
--	temp.question_id,
--	temp.marks AS marks_received,
--	@TestDate AS test_date
--	FROM 
--	(SELECT * FROM OPENJSON(@json) 
--		WITH (
--			question_id INT '$.question_id',
--			marks INT '$.marks'
--		)
--	) AS temp

--exec portal.[InsertStudentScores] @StudentID=1031, @TestDate=@TestDate, @JsonScores=@JsonScores

--EXEC PORTAL.SelectStudentScoresByTestID @StudentID=1032, @TestID=4


DECLARE @StudentID INT = 1032
DECLARE @JsonScores VARCHAR(MAX);
SET @JsonScores = '[{"score_id":7,"marks_received": 0}, 
				{"score_id":6, "marks_received": 1},
				{"score_id":5, "marks_received": 4},
				{"score_id":4, "marks_received": 2}
              ]';

--UPDATE dbo.scores
--SET 
--	marks_received = temp.marks_received
--FROM 
--(SELECT * FROM OPENJSON(@JsonScores) 
--		WITH (
--			score_id INT '$.score_id',
--			marks_received INT '$.marks_received'
--		)) AS temp
--WHERE student_id = @StudentID
--AND scores.score_id = temp.score_id


EXEC PORTAL.UpdateStudentScores @StudentID=@StudentID, @JsonScores=@JsonScores
