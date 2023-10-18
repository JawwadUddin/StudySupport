/****** Object:  Schema [portal]    Script Date: 14/10/2023 20:30:16 ******/
CREATE SCHEMA [portal]
GO
/****** Object:  User [guestuser]    Script Date: 14/10/2023 20:30:15 ******/
CREATE USER [guestuser] FOR LOGIN [guestuser] WITH DEFAULT_SCHEMA=[portal]
GO
/****** Object:  DatabaseRole [PortalUser]    Script Date: 14/10/2023 20:30:15 ******/
CREATE ROLE [PortalUser]
GO
ALTER ROLE [PortalUser] ADD MEMBER [guestuser]
GO
