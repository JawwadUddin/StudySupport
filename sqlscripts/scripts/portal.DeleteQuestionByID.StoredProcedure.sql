USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[DeleteQuestionByID]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteQuestionByID] @QuestionID INT
AS
DELETE FROM questions 
WHERE question_id = @QuestionID
GO
