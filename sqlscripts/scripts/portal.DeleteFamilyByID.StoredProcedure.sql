USE [studysupport]
GO
/****** Object:  StoredProcedure [portal].[DeleteFamilyByID]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteFamilyByID] @FamilyID INT
AS
DELETE FROM family WHERE family_id=@FamilyID
GO
