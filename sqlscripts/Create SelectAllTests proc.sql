USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectAllTests]    Script Date: 02/01/2023 16:20:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectAllTests]
AS
SELECT 
	test_id,
	test_name,
	mock,
	t.syllabus_id,
	syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id