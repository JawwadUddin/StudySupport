USE [studysupport]
GO
/****** Object:  Table [dbo].[tempFoundation]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tempFoundation](
	[Topic no#] [float] NULL,
	[Topic] [nvarchar](255) NULL,
	[Name of Download] [nvarchar](255) NULL,
	[Downloaded?] [nvarchar](255) NULL,
	[Source] [nvarchar](255) NULL,
	[Book] [nvarchar](255) NULL,
	[Grade] [nvarchar](255) NULL,
	[Pages] [float] NULL,
	[F9] [nvarchar](255) NULL
) ON [PRIMARY]
GO
