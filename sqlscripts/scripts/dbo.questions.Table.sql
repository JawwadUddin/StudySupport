USE [studysupport]
GO
/****** Object:  Table [dbo].[questions]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[questions](
	[question_id] [int] IDENTITY(1,1) NOT NULL,
	[test_id] [int] NULL,
	[topic_id] [int] NULL,
	[difficulty] [varchar](10) NULL,
	[marks] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[questions]  WITH CHECK ADD  CONSTRAINT [FK_questions_tests] FOREIGN KEY([test_id])
REFERENCES [dbo].[tests] ([test_id])
GO
ALTER TABLE [dbo].[questions] CHECK CONSTRAINT [FK_questions_tests]
GO
ALTER TABLE [dbo].[questions]  WITH CHECK ADD  CONSTRAINT [FK_questions_topics] FOREIGN KEY([topic_id])
REFERENCES [dbo].[topics] ([topic_id])
GO
ALTER TABLE [dbo].[questions] CHECK CONSTRAINT [FK_questions_topics]
GO
