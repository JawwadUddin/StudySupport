USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[DeleteTopicByID]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteTopicByID] @TopicID INT
AS
DELETE FROM topics
WHERE topic_id = @TopicID
GO
