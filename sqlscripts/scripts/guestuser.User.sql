USE [studysupport]
GO
/****** Object:  User [guestuser]    Script Date: 02/06/2023 18:44:42 ******/
CREATE USER [guestuser] FOR LOGIN [guestuser] WITH DEFAULT_SCHEMA=[portal]
GO
ALTER ROLE [PortalUser] ADD MEMBER [guestuser]
GO
