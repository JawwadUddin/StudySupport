USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[SelectAllSyllabuses]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllSyllabuses]
AS
SELECT 
syllabus_id,
syllabus_name
FROM syllabus s
GO
