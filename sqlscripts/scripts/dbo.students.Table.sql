USE [studysupport]
GO
/****** Object:  Table [dbo].[students]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[students](
	[student_id] [int] IDENTITY(1,1) NOT NULL,
	[family_id] [int] NULL,
	[full_name] [varchar](30) NULL,
	[DOB] [date] NULL,
	[school_year] [int] NULL,
	[medical_info] [varchar](100) NULL,
	[notes] [varchar](100) NULL,
	[school_name] [varchar](50) NULL,
	[level_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[student_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[students]  WITH CHECK ADD  CONSTRAINT [FK_students_family] FOREIGN KEY([family_id])
REFERENCES [dbo].[family] ([family_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[students] CHECK CONSTRAINT [FK_students_family]
GO
ALTER TABLE [dbo].[students]  WITH CHECK ADD  CONSTRAINT [FK_students_level] FOREIGN KEY([level_id])
REFERENCES [dbo].[level] ([level_id])
GO
ALTER TABLE [dbo].[students] CHECK CONSTRAINT [FK_students_level]
GO
