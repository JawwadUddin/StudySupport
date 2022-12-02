USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectAllTests]    Script Date: 30/11/2022 15:13:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectAllTests]
AS
SELECT 
	test_id,
	test_name,
	t.syllabus_id,
	syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id