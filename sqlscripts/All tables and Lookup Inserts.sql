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
	[first_name] [varchar](20) NULL,
	[last_name] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[family_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[invoices]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[invoices](
	[invoice_id] [int] IDENTITY(20000,1) NOT NULL,
	[family_id] [int] NULL,
	[invoice_date] [date] NULL,
	[due_date] [date] NULL,
	[start_date] [date] NULL,
	[amount_due] [decimal](6, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[invoice_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[invoicesMisc]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[invoicesMisc](
	[invoice_misc_id] [int] IDENTITY(1,1) NOT NULL,
	[invoice_id] [int] NULL,
	[description] [varchar](50) NULL,
	[rate] [decimal](5, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[invoice_misc_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[level]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[level](
	[level_id] [int] IDENTITY(1,1) NOT NULL,
	[level] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[level_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[payment]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[payment](
	[payment_id] [int] IDENTITY(20000,1) NOT NULL,
	[family_id] [int] NULL,
	[invoice_id] [int] NULL,
	[payment_date] [date] NULL,
	[amount] [decimal](5, 2) NULL,
	[payment_type_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[payment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[paymentType]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[paymentType](
	[payment_type_id] [int] IDENTITY(1,1) NOT NULL,
	[payment_type] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[payment_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[questions]    Script Date: 14/10/2023 20:02:22 ******/
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
/****** Object:  Table [dbo].[rate]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rate](
	[rate_id] [int] IDENTITY(1,1) NOT NULL,
	[student_id] [int] NULL,
	[rate] [decimal](5, 3) NULL,
	[rateDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[rate_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[relation]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[relation](
	[relation_id] [int] IDENTITY(1,1) NOT NULL,
	[relation_to_child] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[relation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[scores]    Script Date: 14/10/2023 20:02:22 ******/
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
/****** Object:  Table [dbo].[sessionDates]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sessionDates](
	[session_date_id] [int] IDENTITY(1,1) NOT NULL,
	[session_date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[session_date_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sessionSlots]    Script Date: 14/10/2023 20:02:22 ******/
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
/****** Object:  Table [dbo].[sessionTables]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sessionTables](
	[session_table_id] [int] IDENTITY(1,1) NOT NULL,
	[session_table] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[session_table_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[students]    Script Date: 14/10/2023 20:02:22 ******/
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
	[first_name] [varchar](20) NULL,
	[last_name] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[student_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[studentSessions]    Script Date: 14/10/2023 20:02:22 ******/
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
/****** Object:  Table [dbo].[syllabus]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[syllabus](
	[syllabus_id] [int] IDENTITY(1,1) NOT NULL,
	[syllabus_name] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[syllabus_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[testComments]    Script Date: 14/10/2023 20:02:22 ******/
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
/****** Object:  Table [dbo].[testDate]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[testDate](
	[DOB] [date] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tests]    Script Date: 14/10/2023 20:02:22 ******/
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
/****** Object:  Table [dbo].[topics]    Script Date: 14/10/2023 20:02:22 ******/
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
/****** Object:  Table [dbo].[users]    Script Date: 14/10/2023 20:02:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NULL,
	[password] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[family]  WITH CHECK ADD  CONSTRAINT [FK_family_relation] FOREIGN KEY([ec_relation_id])
REFERENCES [dbo].[relation] ([relation_id])
GO
ALTER TABLE [dbo].[family] CHECK CONSTRAINT [FK_family_relation]
GO
ALTER TABLE [dbo].[invoices]  WITH CHECK ADD  CONSTRAINT [FK_invoices_family] FOREIGN KEY([family_id])
REFERENCES [dbo].[family] ([family_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[invoices] CHECK CONSTRAINT [FK_invoices_family]
GO
ALTER TABLE [dbo].[invoicesMisc]  WITH CHECK ADD  CONSTRAINT [FK_invoicesMisc_invoices] FOREIGN KEY([invoice_id])
REFERENCES [dbo].[invoices] ([invoice_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[invoicesMisc] CHECK CONSTRAINT [FK_invoicesMisc_invoices]
GO
ALTER TABLE [dbo].[payment]  WITH CHECK ADD  CONSTRAINT [FK_payment_family] FOREIGN KEY([family_id])
REFERENCES [dbo].[family] ([family_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[payment] CHECK CONSTRAINT [FK_payment_family]
GO
ALTER TABLE [dbo].[payment]  WITH CHECK ADD  CONSTRAINT [FK_payment_paymentType] FOREIGN KEY([payment_type_id])
REFERENCES [dbo].[paymentType] ([payment_type_id])
GO
ALTER TABLE [dbo].[payment] CHECK CONSTRAINT [FK_payment_paymentType]
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
ALTER TABLE [dbo].[rate]  WITH CHECK ADD  CONSTRAINT [FK_rate_students] FOREIGN KEY([student_id])
REFERENCES [dbo].[students] ([student_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[rate] CHECK CONSTRAINT [FK_rate_students]
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
ALTER TABLE [dbo].[tests]  WITH CHECK ADD  CONSTRAINT [FK_tests_syllabus] FOREIGN KEY([syllabus_id])
REFERENCES [dbo].[syllabus] ([syllabus_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tests] CHECK CONSTRAINT [FK_tests_syllabus]
GO
ALTER TABLE [dbo].[topics]  WITH CHECK ADD  CONSTRAINT [FK_topics_syllabus] FOREIGN KEY([syllabus_id])
REFERENCES [dbo].[syllabus] ([syllabus_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[topics] CHECK CONSTRAINT [FK_topics_syllabus]
GO

-- insert lookup data
SET IDENTITY_INSERT [dbo].[syllabus] ON 
GO
INSERT [dbo].[syllabus] ([syllabus_id], [syllabus_name]) VALUES (1, N'GCSE MATHS HIGHER')
GO
INSERT [dbo].[syllabus] ([syllabus_id], [syllabus_name]) VALUES (2, N'GCSE MATHS FOUNDATION')
GO
SET IDENTITY_INSERT [dbo].[syllabus] OFF
GO
SET IDENTITY_INSERT [dbo].[topics] ON 
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1002, N'Estimating', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1003, N'Factors, Multiples and Primes', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1004, N'Fractions of an Amount', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1005, N'BIDMAS', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1006, N'Collecting Like Terms', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1007, N'Angles', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1008, N'Area and Perimeter', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1009, N'Mean, Median, Mode and Range', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1010, N'Frequency Polygons', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1011, N'Stem and Leaf', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1012, N'Bar Charts', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1013, N'Pie Charts', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1014, N'Error Intervals', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1015, N'Fractions', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1016, N'Ratio', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1017, N'Proportion Ingredients Questions', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1018, N'Percentages', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1019, N'Exchange Rates', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1020, N'Best Buys', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1021, N'Substitution', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1022, N'Solving Equations', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1023, N'Drawing Graphs', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1024, N'Circles', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1025, N'Rotations', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1026, N'Reflections', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1027, N'Enlargements', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1028, N'Translations', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1029, N'Mixed Transformations', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1030, N'Area of Compound Shapes', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1031, N'Two Way Tables', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1032, N'Compound Interest and Depreciation', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1033, N'Indices', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1034, N'HCF, LCM', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1035, N'Functional Questions', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1036, N'Inequalities', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1037, N'Forming and Solving Equations', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1038, N'Sequences (nth term)', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1039, N'Expand and Factorise', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1040, N'Pythagoras', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1041, N'Angles', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1042, N'Angles in Parallel Lines', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1043, N'Angles in Polygons', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1044, N'Surface Area', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1045, N'Volume of Prisms', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1046, N'Volume and Surface Area of Cylinders', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1047, N'Loci and Construction', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1048, N'Bearings', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1049, N'Averages from Frequency Tables', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1050, N'Probability', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1051, N'Scatter Graphs', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1052, N'Ratio Fraction Problems', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1053, N'Ratio Problems 2', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1054, N'Direct and Inverse Proportion', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1055, N'Reverse Percentages', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1056, N'Standard Form', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1057, N'Speed and Density', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1058, N'Changing the Subject of a Formula', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1059, N'Expanding and Factorising Quadratics', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1060, N'Solving Quadratics', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1061, N'Drawing Quadratic Graphs', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1062, N'Cubic/Reciprocal Graphs', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1063, N'Simultaneous Equations', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1064, N'Solving Simultaneous Equations Graphically', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1065, N'Gradient of a Line', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1066, N'Equation of a Line', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1067, N'Spheres and Cones', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1068, N'Sectors and Arcs', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1069, N'Similar Shapes (Lengths)', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1070, N'SOHCAHTOA', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1071, N'Vectors', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1072, N'Probability Trees', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1073, N'Converting Recurring Decimals to Fractions', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1074, N'Fractional and Negative Indices', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1075, N'The Product Rule for Counting', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1076, N'Repeated Percentage Change', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1077, N'Expanding Triple Brackets', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1078, N'Parallel and Perpendicular Lines', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1079, N'Inequalities on Graphs', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1080, N'Similar Shapes (Area and Volume)', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1081, N'Enlarging with Negative Scale Factors', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1082, N'Circle Theorems', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1083, N'Cumulative Frequency', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1084, N'Box Plots', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1085, N'Surds', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1086, N'Bounds', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1087, N'Direct and Inverse Proportion', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1088, N'Quadratic Formula', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1089, N'Factorising Harder Quadratics', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1090, N'Algebraic Fractions', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1091, N'Rearranging Harder Formulae', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1092, N'Harder Graphs: Trig/Exponential', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1093, N'Inverse and Composite Functions', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1094, N'Solving Equations using Iteration', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1095, N'Finding the Area of Any Triangle', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1096, N'The Sine Rule', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1097, N'The Cosine Rule', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1098, N'Congruent Triangles', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1099, N'3d Pythagoras', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1100, N'Histograms', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1101, N'Venn Diagrams', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1102, N'Quadratic Simultaneous Equations', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1103, N'Transforming Graphs y=f(x)', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1104, N'Proof', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1105, N'Completing the Square', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1106, N'Quadratic Sequences', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1107, N'Quadratic Inequalities', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1108, N'Velocity Time Graphs', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1109, N'Proof of the Circle Theorems', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1110, N'Perpendicular Lines', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1111, N'Vectors', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1112, N'Probability Equation Questions', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1113, N'Nets, Plans and Elevation', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1114, N'Scale Drawing and Maps', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1115, N'Converting Between Units of Measurement', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1116, N'Basic Kinematics', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1117, N'Using a Calculator', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1118, N'Stratified Sampling', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1119, N'Probability', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1120, N'Frequency Trees', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1121, N'Trigonometry Exact Values', 1)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1122, N'Addition and Subtraction', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1123, N'Multiplication and Division', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1124, N'Time', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1125, N'Writing, Simplifying and Ordering Fractions', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1126, N'Place Value', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1127, N'Rounding', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1128, N'Negative Numbers', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1129, N'Powers and Roots', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1130, N'Factors, Multiples and Primes', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1131, N'Coordinates', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1132, N'Pictograms', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1133, N'Calculation Problems', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1134, N'Systematic Listing', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1135, N'Fractions', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1136, N'Fractions of an Amount', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1137, N'Fractions, Decimals and Percentages', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1138, N'Collecting Like Terms', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1139, N'Writing an Expression', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1140, N'Function Machines', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1141, N'Solving One Step Equations', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1142, N'Angles', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1143, N'Probability', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1144, N'Frequency Polygons', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1145, N'Mean, Median, Mode and Range', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1146, N'Stem and Leaf', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1147, N'Bar Charts', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1148, N'Probability', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1149, N'Pie Charts', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1150, N'Writing and Simplifying Ratio', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1151, N'Sharing Ratio', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1152, N'Percentages', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1153, N'Percentage Change', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1154, N'Conversions and Units', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1155, N'Scale Drawings', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1156, N'Substitution', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1157, N'Solving Equations', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1158, N'Drawing Graphs', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1159, N'Circles', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1160, N'Frequency Trees', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1161, N'Two Way Tables', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1162, N'Real Life Graphs', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1163, N'Forming and Solving Equations', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1164, N'Expand and Factorise', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1165, N'Averages from Frequency Tables', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1166, N'Volume of Prisms', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1167, N'Volume and Surface Area of Cylinders', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1168, N'Probability and Relative Frequency', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1169, N'Scatter Graphs', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1170, N'Quadratic Graphs', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1171, N'Cubic/Reciprocal Graphs', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1172, N'Gradient of a Line', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1173, N'Equation of a Line', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1174, N'Spheres and Cones', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1175, N'Sectors and Arcs', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1176, N'Vectors', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1177, N'Probability Trees', 2)
GO
INSERT [dbo].[topics] ([topic_id], [topic_name], [syllabus_id]) VALUES (1178, N'Venn Diagrams', 2)
GO
SET IDENTITY_INSERT [dbo].[topics] OFF
SET IDENTITY_INSERT [dbo].[level] ON 
GO
INSERT [dbo].[level] ([level_id], [level]) VALUES (1, N'KS2')
GO
INSERT [dbo].[level] ([level_id], [level]) VALUES (2, N'11+')
GO
INSERT [dbo].[level] ([level_id], [level]) VALUES (3, N'KS3')
GO
INSERT [dbo].[level] ([level_id], [level]) VALUES (4, N'GCSE')
GO
INSERT [dbo].[level] ([level_id], [level]) VALUES (5, N'A-LEVEL')
GO
SET IDENTITY_INSERT [dbo].[level] OFF
GO
SET IDENTITY_INSERT [dbo].[paymentType] ON 
GO
INSERT [dbo].[paymentType] ([payment_type_id], [payment_type]) VALUES (1, N'Cash')
GO
INSERT [dbo].[paymentType] ([payment_type_id], [payment_type]) VALUES (2, N'Bank Transfer')
GO
SET IDENTITY_INSERT [dbo].[paymentType] OFF
GO
SET IDENTITY_INSERT [dbo].[relation] ON 
GO
INSERT [dbo].[relation] ([relation_id], [relation_to_child]) VALUES (1, N'father')
GO
INSERT [dbo].[relation] ([relation_id], [relation_to_child]) VALUES (2, N'mother')
GO
INSERT [dbo].[relation] ([relation_id], [relation_to_child]) VALUES (3, N'brother')
GO
INSERT [dbo].[relation] ([relation_id], [relation_to_child]) VALUES (4, N'sister')
GO
INSERT [dbo].[relation] ([relation_id], [relation_to_child]) VALUES (5, N'grandfather')
GO
INSERT [dbo].[relation] ([relation_id], [relation_to_child]) VALUES (6, N'grandmother')
GO
INSERT [dbo].[relation] ([relation_id], [relation_to_child]) VALUES (7, N'uncle')
GO
INSERT [dbo].[relation] ([relation_id], [relation_to_child]) VALUES (8, N'aunt')
GO
INSERT [dbo].[relation] ([relation_id], [relation_to_child]) VALUES (11, N'cousin')
GO
INSERT [dbo].[relation] ([relation_id], [relation_to_child]) VALUES (12, N'updateRelationTest')
GO
SET IDENTITY_INSERT [dbo].[relation] OFF
GO
SET IDENTITY_INSERT [dbo].[sessionSlots] ON 
GO
INSERT [dbo].[sessionSlots] ([session_slot_id], [session_time]) VALUES (1, N'10:00-12.00')
GO
INSERT [dbo].[sessionSlots] ([session_slot_id], [session_time]) VALUES (2, N'12:00-14:00')
GO
SET IDENTITY_INSERT [dbo].[sessionSlots] OFF
GO
SET IDENTITY_INSERT [dbo].[sessionTables] ON 
GO
INSERT [dbo].[sessionTables] ([session_table_id], [session_table]) VALUES (1, N'A')
GO
INSERT [dbo].[sessionTables] ([session_table_id], [session_table]) VALUES (2, N'B')
GO
INSERT [dbo].[sessionTables] ([session_table_id], [session_table]) VALUES (3, N'C')
GO
INSERT [dbo].[sessionTables] ([session_table_id], [session_table]) VALUES (4, N'D')
GO
INSERT [dbo].[sessionTables] ([session_table_id], [session_table]) VALUES (5, N'E')
GO
INSERT [dbo].[sessionTables] ([session_table_id], [session_table]) VALUES (6, N'F')
GO
INSERT [dbo].[sessionTables] ([session_table_id], [session_table]) VALUES (7, N'G')
GO
INSERT [dbo].[sessionTables] ([session_table_id], [session_table]) VALUES (8, N'H')
GO
SET IDENTITY_INSERT [dbo].[sessionTables] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 
GO
INSERT [dbo].[users] ([user_id], [username], [password]) VALUES (1, N'ssadmin', N'$2b$10$GppZrIhsjtj3vFyOB3mATOfhK4ezQS3tE9HGKo8UBHCwiXhSD.rRK')
GO
SET IDENTITY_INSERT [dbo].[users] OFF
GO