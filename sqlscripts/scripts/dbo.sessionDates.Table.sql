USE [studysupport]
GO
/****** Object:  Table [dbo].[sessionDates]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sessionDates](
	[session_date_id] [int] IDENTITY(1,1) NOT NULL,
	[session_date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[session_date_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
