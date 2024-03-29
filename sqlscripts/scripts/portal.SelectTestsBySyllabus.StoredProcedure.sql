USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectTestsBySyllabus]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectTestsBySyllabus] @SyllabusID INT
AS
SELECT 
	test_id,
	test_name,
	mock,
	syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id
WHERE t.syllabus_id = @SyllabusID
GO
