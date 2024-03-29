USE [studysupport]
GO
/****** Object:  Table [dbo].[testComments]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[testComments](
	[test_comment_id] [int] IDENTITY(1,1) NOT NULL,
	[test_id] [int] NULL,
	[student_id] [int] NULL,
	[comment] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[test_comment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[testComments]  WITH CHECK ADD  CONSTRAINT [FK_testComments_students] FOREIGN KEY([student_id])
REFERENCES [dbo].[students] ([student_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[testComments] CHECK CONSTRAINT [FK_testComments_students]
GO
ALTER TABLE [dbo].[testComments]  WITH CHECK ADD  CONSTRAINT [FK_testComments_tests] FOREIGN KEY([test_id])
REFERENCES [dbo].[tests] ([test_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[testComments] CHECK CONSTRAINT [FK_testComments_tests]
GO
