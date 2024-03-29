USE [studysupport]
GO
/****** Object:  Table [dbo].[family]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[family](
	[family_id] [int] IDENTITY(1,1) NOT NULL,
	[full_name] [varchar](30) NULL,
	[address] [varchar](35) NULL,
	[post_code] [varchar](8) NULL,
	[mobile] [varchar](11) NULL,
	[email] [varchar](40) NULL,
	[ec_full_name] [varchar](30) NULL,
	[ec_relation_id] [int] NULL,
	[ec_address] [varchar](50) NULL,
	[ec_mobile] [varchar](11) NULL,
	[notes] [varchar](100) NULL,
	[ec_post_code] [varchar](8) NULL,
PRIMARY KEY CLUSTERED 
(
	[family_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[family]  WITH CHECK ADD  CONSTRAINT [FK_family_relation] FOREIGN KEY([ec_relation_id])
REFERENCES [dbo].[relation] ([relation_id])
GO
ALTER TABLE [dbo].[family] CHECK CONSTRAINT [FK_family_relation]
GO
