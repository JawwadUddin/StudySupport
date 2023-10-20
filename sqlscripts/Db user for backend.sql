CREATE USER [studysupport-api] FROM EXTERNAL PROVIDER WITH DEFAULT_SCHEMA = portal;

CREATE ROLE [PortalUser];
GRANT EXECUTE ON SCHEMA :: [portal] TO [PortalUser];

EXEC sp_addrolemember 'PortalUser', 'studysupport-api';