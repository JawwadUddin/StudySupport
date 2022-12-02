select * from scores
select * from topics
select * from questions
select * from tests
select * from syllabus

select * from scores 
where question_id in (select question_id from questions where test_id=1013)

select ts.test_id, question_id, topic_id, marks from tests ts
inner join questions q 
on ts.test_id = q.test_id
where ts.test_id = 1012

select * from tests where syllabus_id = 2

select * from topics t 
left outer join
(select ts.test_id, question_id, topic_id, marks from tests ts
inner join questions q 
on ts.test_id = q.test_id
where ts.test_id = 1012) as temp
on t.topic_id = temp.topic_id




select topic_name, test1012.percentage as test1012, test1013.percentage as test1013
from topics t 

left outer join
(SELECT 
    score_id,
	marks_received,
	marks,
	marks_received*100/marks as percentage,
	q.topic_id
FROM dbo.scores s 
INNER JOIN dbo.questions q on q.question_id = s.question_id
INNER JOIN dbo.topics t on q.topic_id = t.topic_id
WHERE student_id = 2033
and test_id = 1012) AS test1012
on t.topic_id = test1012.topic_id

left outer join
(SELECT 
    score_id,
	marks_received,
	marks,
	marks_received*100/marks as percentage,
	q.topic_id
FROM dbo.scores s 
INNER JOIN dbo.questions q on q.question_id = s.question_id
INNER JOIN dbo.topics t on q.topic_id = t.topic_id
WHERE student_id = 2033
and test_id = 1013) AS test1013
on t.topic_id = test1013.topic_id



--bring back all topics: run selectTopicsBySyllabus proc
exec portal.SelectTopicsBySyllabus	@SyllabusID=1003
--and tests completed for that syllabus: run studentCompletedForSyllabus proc:
exec portal.SelectStudentTestsCompletedBySyllabusID @StudentID=2033, @SyllabusID=1

--bring back all scores of a student for a particular syllabus
select score_id, s.question_id, marks_received, marks, topic_id, q.test_id from scores s
inner join questions q
on s.question_id = q.question_id
inner join tests t
on q.test_id = t.test_id
where student_id=2033
and syllabus_id = 1


select * from scores
select * from tests