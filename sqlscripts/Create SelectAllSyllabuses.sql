USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectAllSyllabuses]    Script Date: 30/11/2022 15:15:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [portal].[SelectAllSyllabuses]
AS
SELECT 
syllabus_id,
syllabus_name
FROM syllabus s
