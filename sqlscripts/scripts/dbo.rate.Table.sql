USE [studysupport]
GO
/****** Object:  Table [dbo].[rate]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rate](
	[rate_id] [int] IDENTITY(1,1) NOT NULL,
	[student_id] [int] NULL,
	[rate] [decimal](5, 3) NULL,
PRIMARY KEY CLUSTERED 
(
	[rate_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[rate]  WITH CHECK ADD  CONSTRAINT [FK_rate_students] FOREIGN KEY([student_id])
REFERENCES [dbo].[students] ([student_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[rate] CHECK CONSTRAINT [FK_rate_students]
GO
