USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateQuestion]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateQuestion] 
(
	@QuestionID INT,
	@TopicID INT,
	@Difficulty VARCHAR(10),
	@Marks INT
)
AS

UPDATE questions
SET topic_id = @TopicID,
	difficulty = @Difficulty,
	marks = @Marks
WHERE question_id = @QuestionID
GO
