USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertQuestion]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertQuestion] 
(
	@TestID INT,
	@TopicID INT,
	@Difficulty VARCHAR(10),
	@Marks INT
)
AS
INSERT INTO dbo.questions (test_id, topic_id, difficulty, marks)
VALUES 
	(@TestID, @TopicID, @Difficulty, @Marks)
GO
