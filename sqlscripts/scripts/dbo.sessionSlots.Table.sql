USE [studysupport]
GO
/****** Object:  Table [dbo].[sessionSlots]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sessionSlots](
	[session_slot_id] [int] IDENTITY(1,1) NOT NULL,
	[session_time] [varchar](11) NULL,
PRIMARY KEY CLUSTERED 
(
	[session_slot_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
