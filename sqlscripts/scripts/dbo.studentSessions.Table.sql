USE [studysupport]
GO
/****** Object:  Table [dbo].[studentSessions]    Script Date: 02/06/2023 18:44:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[studentSessions](
	[student_session_id] [int] IDENTITY(1,1) NOT NULL,
	[student_id] [int] NULL,
	[session_date_id] [int] NULL,
	[session_table_id] [int] NULL,
	[session_slot_id] [int] NULL,
	[attendance] [bit] NULL,
	[compensation_id] [int] NULL,
	[full_session] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[student_session_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[studentSessions]  WITH CHECK ADD  CONSTRAINT [FK_studentSessions_sessionDates] FOREIGN KEY([session_date_id])
REFERENCES [dbo].[sessionDates] ([session_date_id])
GO
ALTER TABLE [dbo].[studentSessions] CHECK CONSTRAINT [FK_studentSessions_sessionDates]
GO
ALTER TABLE [dbo].[studentSessions]  WITH CHECK ADD  CONSTRAINT [FK_studentSessions_sessionSlots] FOREIGN KEY([session_slot_id])
REFERENCES [dbo].[sessionSlots] ([session_slot_id])
GO
ALTER TABLE [dbo].[studentSessions] CHECK CONSTRAINT [FK_studentSessions_sessionSlots]
GO
ALTER TABLE [dbo].[studentSessions]  WITH CHECK ADD  CONSTRAINT [FK_studentSessions_sessionTables] FOREIGN KEY([session_table_id])
REFERENCES [dbo].[sessionTables] ([session_table_id])
GO
ALTER TABLE [dbo].[studentSessions] CHECK CONSTRAINT [FK_studentSessions_sessionTables]
GO
ALTER TABLE [dbo].[studentSessions]  WITH CHECK ADD  CONSTRAINT [FK_studentSessions_students] FOREIGN KEY([student_id])
REFERENCES [dbo].[students] ([student_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[studentSessions] CHECK CONSTRAINT [FK_studentSessions_students]
GO
