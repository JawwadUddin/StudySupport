USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateScore]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateScore] 
(
	@ScoreID INT,
	@MarksReceived INT
)
AS
UPDATE scores
SET marks_received = @MarksReceived
WHERE scores.score_id = @ScoreID
GO
