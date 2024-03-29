USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[UpdateTopic]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateTopic] 
(
	@TopicID INT,
	@TopicName VARCHAR(50)
)
AS
UPDATE topics
SET topic_name = @TopicName
WHERE topic_id = @TopicID
GO
