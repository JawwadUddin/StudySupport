USE [studysupport]
GO
/****** Object:  Table [dbo].[topics]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[topics](
	[topic_id] [int] IDENTITY(1,1) NOT NULL,
	[topic_name] [varchar](50) NULL,
	[syllabus_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[topic_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[topics]  WITH CHECK ADD  CONSTRAINT [FK_topics_syllabus] FOREIGN KEY([syllabus_id])
REFERENCES [dbo].[syllabus] ([syllabus_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[topics] CHECK CONSTRAINT [FK_topics_syllabus]
GO
