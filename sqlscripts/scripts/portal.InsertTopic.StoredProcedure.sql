USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[InsertTopic]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertTopic] 
(
	@TopicName VARCHAR(50),
	@SyllabusID INT
)
AS
INSERT INTO topics (topic_name, syllabus_id)
VALUES (@TopicName, @SyllabusID)
GO
