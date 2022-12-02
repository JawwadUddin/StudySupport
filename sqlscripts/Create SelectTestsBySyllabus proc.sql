USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectTestsBySyllabus]    Script Date: 30/11/2022 15:16:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectTestsBySyllabus] @SyllabusID INT
AS
SELECT 
	test_id,
	test_name,
	syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id
WHERE t.syllabus_id = @SyllabusID