USE [studysupport]
GO
/****** Object:  Table [dbo].[scores]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[scores](
	[score_id] [int] IDENTITY(1,1) NOT NULL,
	[student_id] [int] NULL,
	[question_id] [int] NULL,
	[marks_received] [int] NULL,
	[test_date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[score_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[scores]  WITH CHECK ADD  CONSTRAINT [FK_scores_questions] FOREIGN KEY([question_id])
REFERENCES [dbo].[questions] ([question_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[scores] CHECK CONSTRAINT [FK_scores_questions]
GO
ALTER TABLE [dbo].[scores]  WITH CHECK ADD  CONSTRAINT [FK_scores_students] FOREIGN KEY([student_id])
REFERENCES [dbo].[students] ([student_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[scores] CHECK CONSTRAINT [FK_scores_students]
GO
