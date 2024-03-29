USE [studysupport]
GO
/****** Object:  Table [dbo].[tests]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tests](
	[test_id] [int] IDENTITY(1,1) NOT NULL,
	[test_name] [varchar](50) NULL,
	[syllabus_id] [int] NULL,
	[mock] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[test_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tests]  WITH CHECK ADD  CONSTRAINT [FK_tests_syllabus] FOREIGN KEY([syllabus_id])
REFERENCES [dbo].[syllabus] ([syllabus_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tests] CHECK CONSTRAINT [FK_tests_syllabus]
GO
