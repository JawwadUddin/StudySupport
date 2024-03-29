USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectTopicsBySyllabus]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [portal].[SelectTopicsBySyllabus] @SyllabusID INT
AS 
(
SELECT topic_id, topic_name FROM syllabus s 
INNER JOIN topics t on s.syllabus_id = t.syllabus_id
WHERE s.syllabus_id = @SyllabusID
)
GO
