USE [studysupport]
GO
/****** Object:  Table [dbo].[sessionTables]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sessionTables](
	[session_table_id] [int] IDENTITY(1,1) NOT NULL,
	[session_table] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[session_table_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
