USE [master]
GO
/****** Object:  Database [studysupport]    Script Date: 04/08/2023 16:01:37 ******/
CREATE DATABASE [studysupport]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'studysupport', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\studysupport.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'studysupport_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\studysupport_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [studysupport] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [studysupport].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [studysupport] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [studysupport] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [studysupport] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [studysupport] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [studysupport] SET ARITHABORT OFF 
GO
ALTER DATABASE [studysupport] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [studysupport] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [studysupport] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [studysupport] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [studysupport] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [studysupport] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [studysupport] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [studysupport] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [studysupport] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [studysupport] SET  ENABLE_BROKER 
GO
ALTER DATABASE [studysupport] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [studysupport] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [studysupport] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [studysupport] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [studysupport] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [studysupport] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [studysupport] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [studysupport] SET RECOVERY FULL 
GO
ALTER DATABASE [studysupport] SET  MULTI_USER 
GO
ALTER DATABASE [studysupport] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [studysupport] SET DB_CHAINING OFF 
GO
ALTER DATABASE [studysupport] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [studysupport] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [studysupport] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [studysupport] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'studysupport', N'ON'
GO
ALTER DATABASE [studysupport] SET QUERY_STORE = OFF
GO
USE [studysupport]
GO
/****** Object:  User [guestuser]    Script Date: 04/08/2023 16:01:38 ******/
CREATE USER [guestuser] FOR LOGIN [guestuser] WITH DEFAULT_SCHEMA=[portal]
GO
/****** Object:  DatabaseRole [PortalUser]    Script Date: 04/08/2023 16:01:38 ******/
CREATE ROLE [PortalUser]
GO
ALTER ROLE [PortalUser] ADD MEMBER [guestuser]
GO
/****** Object:  Schema [portal]    Script Date: 04/08/2023 16:01:38 ******/
CREATE SCHEMA [portal]
GO
/****** Object:  Table [dbo].[family]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[invoices]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[invoicesMisc]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[level]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[payment]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[paymentAudit]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[paymentAudit](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[description] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[paymentType]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[questions]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[rate]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[relation]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[scores]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[sessionDates]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[sessionSlots]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[sessionTables]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[students]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[studentSessions]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[syllabus]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[tempFoundation]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tempFoundation](
	[Topic no#] [float] NULL,
	[Topic] [nvarchar](255) NULL,
	[Name of Download] [nvarchar](255) NULL,
	[Downloaded?] [nvarchar](255) NULL,
	[Source] [nvarchar](255) NULL,
	[Book] [nvarchar](255) NULL,
	[Grade] [nvarchar](255) NULL,
	[Pages] [float] NULL,
	[F9] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tempHigher]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tempHigher](
	[Topic no#] [float] NULL,
	[Topic] [nvarchar](255) NULL,
	[Name of Download] [nvarchar](255) NULL,
	[Downloaded?] [nvarchar](255) NULL,
	[Source] [nvarchar](255) NULL,
	[Book] [nvarchar](255) NULL,
	[Grade] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[testComments]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[testDate]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[testDate](
	[DOB] [date] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tests]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[topics]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  Table [dbo].[users]    Script Date: 04/08/2023 16:01:38 ******/
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
/****** Object:  StoredProcedure [portal].[DeleteFamilyByID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteFamilyByID] @FamilyID INT
AS
DELETE FROM family WHERE family_id=@FamilyID
GO
/****** Object:  StoredProcedure [portal].[DeleteInvoiceByID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteInvoiceByID] @InvoiceID INT
AS
BEGIN

-- First unapply all payments associated with the invoice

UPDATE payment
SET invoice_id = NULL
WHERE invoice_id = @InvoiceID

-- Delete Invoice

DELETE FROM invoices
WHERE invoice_id = @InvoiceID

END
GO
/****** Object:  StoredProcedure [portal].[DeleteQuestionByID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteQuestionByID] @QuestionID INT
AS
DELETE FROM questions 
WHERE question_id = @QuestionID
GO
/****** Object:  StoredProcedure [portal].[DeleteStudentByID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteStudentByID] @StudentID INT
AS 
DELETE FROM students WHERE student_id = @StudentID
GO
/****** Object:  StoredProcedure [portal].[DeleteTestByID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteTestByID] @TestID INT
AS
BEGIN

DELETE FROM questions
WHERE question_id IN
(SELECT question_id FROM questions WHERE test_id = @TestID)

DELETE FROM tests
WHERE test_id = @TestID

END
GO
/****** Object:  StoredProcedure [portal].[DeleteTopicByID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[DeleteTopicByID] @TopicID INT
AS
DELETE FROM topics
WHERE topic_id = @TopicID
GO
/****** Object:  StoredProcedure [portal].[InsertFamily]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertFamily]
	@FullName VARCHAR(30),
	@Address VARCHAR(35),
	@PostCode VARCHAR(8),
	@Mobile VARCHAR(11),
	@Email VARCHAR(40),
	@ecFullName VARCHAR(30),
	@ecRelation VARCHAR(20),
	@ecAddress VARCHAR(50),
	@ecPostCode VARCHAR(8),
	@ecMobile VARCHAR(11),
	@Notes VARCHAR(100),
	@FamilyID INT OUTPUT
AS

DECLARE @InsertedFamilyID table (ID INT);
DECLARE @RelationID AS INT = (SELECT relation_id from relation WHERE relation_to_child = @ecRelation);

INSERT INTO family (full_name, address, post_code, mobile, email, ec_full_name, ec_relation_id, ec_address, ec_post_code, ec_mobile, notes)
OUTPUT INSERTED.family_id
INTO @InsertedFamilyID
VALUES (@FullName, @Address, @PostCode, @Mobile, @Email, @ecFullName, @RelationID, @ecAddress, @ecPostCode, @ecMobile, @Notes)

DECLARE @NewFamilyID INT = (SELECT TOP 1 ID FROM @InsertedFamilyID);

SELECT @FamilyID = @NewFamilyID
GO
/****** Object:  StoredProcedure [portal].[InsertInvoice]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertInvoice] 
(
	@FamilyID INT,
	@InvoiceDate DATE,
	@DueDate DATE,
	@StartDate DATE,
	@AmountDue DECIMAL(6,2),
	@JSONInvoiceMisc VARCHAR(MAX),
	@JSONRateInfo VARCHAR(MAX),
	@InvoiceID INT OUTPUT
)
AS
BEGIN

DECLARE @InsertedInvoiceID AS TABLE (ID INT);

INSERT INTO dbo.invoices (family_id, invoice_date, due_date, start_date, amount_due)
OUTPUT Inserted.invoice_id
INTO @InsertedInvoiceID
VALUES 
	(@FamilyID, @InvoiceDate, @DueDate, @StartDate, @AmountDue)

DECLARE @NewInvoiceID AS INT = (SELECT TOP 1 ID FROM @InsertedInvoiceID)

--Add invoice items outside those related to studentSessions
IF @JSONInvoiceMisc IS NOT NULL
	EXEC portal.InsertInvoiceMisc @InvoiveID=@NewInvoiceID, @JSONInvoiceMisc=@JSONInvoiceMisc

IF @JSONRateInfo IS NOT NULL
	EXEC portal.UpdateRate @JSONRateInfo=@JSONRateInfo, @StartDate=@StartDate

SELECT @InvoiceID = @NewInvoiceID

END
GO
/****** Object:  StoredProcedure [portal].[InsertInvoiceMisc]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertInvoiceMisc] 
(
	@InvoiveID INT,
	@JSONInvoiceMisc VARCHAR(MAX)
)
AS
BEGIN

INSERT INTO dbo.invoicesMisc (invoice_id, description, rate)
SELECT @InvoiveID,
	temp.description,
	temp.rate
	FROM
(SELECT * 
	FROM OPENJSON(@JsonInvoiceMisc)
    WITH (
        description VARCHAR(50) '$.description',
        rate decimal(5,2) '$.rate'
		)) as temp

END
GO
/****** Object:  StoredProcedure [portal].[InsertPayment]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertPayment]
(
	@FamilyID INT,
	@InvoiceID INT,
	@PaymentDate DATE,
	@Amount DECIMAL(5,2),
	@PaymentID INT OUTPUT
)
AS 
BEGIN

DECLARE @InsertedPaymentID AS TABLE (ID INT);

INSERT INTO payment (family_id, invoice_id, payment_date, amount)
OUTPUT inserted.payment_id
INTO @InsertedPaymentID
VALUES (@FamilyID, @InvoiceID, @PaymentDate, @Amount)

DECLARE @NewPaymentID AS INT = (SELECT TOP 1 ID FROM @InsertedPaymentID)

SELECT @PaymentID = @NewPaymentID

END
GO
/****** Object:  StoredProcedure [portal].[InsertPayments]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertPayments] 
(
	@JSONTransactionInfo VARCHAR(MAX),
	@PaymentDate DATE,
	@PaymentType VARCHAR(20),
	@FamilyID INT,
	@Credit DECIMAL(6, 2)
)
AS
BEGIN

Declare @PaymentTypeID INT = (SELECT payment_type_id FROM paymentType WHERE payment_type = @PaymentType)

INSERT INTO payment (family_id, invoice_id, payment_date, amount, payment_type_id)
SELECT @FamilyID,
	temp.invoice_id,
	@PaymentDate,
	temp.payment,
	(SELECT payment_type_id FROM paymentType WHERE payment_type = @PaymentType)
	FROM
(SELECT * 
	FROM OPENJSON(@JSONTransactionInfo)
    WITH (
        invoice_id	int '$.id',
        payment decimal(5,2) '$.payment'
		) WHERE payment IS NOT NULL AND payment != 0) as temp

IF @Credit IS NOT NULL AND @Credit != 0
	--check if a credit (payment with no invoice_id) already exists for the familyID and paymentDate
	IF EXISTS (SELECT * FROM payment WHERE family_id = @FamilyID AND payment_date = @PaymentDate AND invoice_id IS NULL)
		UPDATE payment
		SET amount = @Credit,
		payment_type_id = @PaymentTypeID
		WHERE family_id = @FamilyID AND payment_date = @PaymentDate AND invoice_id IS NULL
	ELSE
		INSERT INTO payment (family_id, invoice_id, payment_date, amount, payment_type_id)
		SELECT @FamilyID,
			NULL,
			@PaymentDate,
			@Credit,
			@PaymentTypeID

END
GO
/****** Object:  StoredProcedure [portal].[InsertQuestion]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertQuestion] 
(
	@TestID INT,
	@TopicID INT,
	@Difficulty VARCHAR(10),
	@Marks INT
)
AS
INSERT INTO dbo.questions (test_id, topic_id, difficulty, marks)
VALUES 
	(@TestID, @TopicID, @Difficulty, @Marks)
GO
/****** Object:  StoredProcedure [portal].[InsertRegister]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertRegister] 
(
	@RegisterDate DATE,
	@TemplateID INT,
	@SessionDateID INT OUTPUT
)
AS
BEGIN

INSERT INTO sessionDates (session_date)
VALUES (@RegisterDate)

DECLARE @NewSessionDateID INT = (SELECT TOP 1 session_date_id FROM sessionDates ORDER BY session_date_id DESC)

INSERT INTO studentSessions (student_id, session_date_id, session_table_id, session_slot_id, attendance, full_session)
SELECT 
	s.student_id,
	@NewSessionDateID,
	s.session_table_id,
	s.session_slot_id,
	0 as attendance,
	s.full_session
FROM studentSessions s
WHERE s.session_date_id = @TemplateID AND compensation_id IS NULL

SELECT @SessionDateID = @NewSessionDateID

END
GO
/****** Object:  StoredProcedure [portal].[InsertRelation]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertRelation] @Relation VARCHAR(20)
AS

INSERT INTO dbo.relation
VALUES (@Relation)
GO
/****** Object:  StoredProcedure [portal].[InsertSchool]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertSchool] @School VARCHAR(50)
AS
INSERT INTO dbo.school
VALUES (@School)
GO
/****** Object:  StoredProcedure [portal].[InsertSessionDate]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertSessionDate]
(
	@RegisterDate DATE,
	@SessionDateID INT OUTPUT
)
AS
BEGIN

INSERT INTO sessionDates (session_date)
VALUES (@RegisterDate)

SELECT @SessionDateID = (SELECT TOP 1 session_date_id FROM sessionDates ORDER BY session_date_id DESC)

END
GO
/****** Object:  StoredProcedure [portal].[InsertStudent]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertStudent] 
	@FamilyID INT,
	@FullName VARCHAR(30),
	@DOB DATE,
	@SchoolYear INT,
	@School VARCHAR(50),
	@MedicalInfo VARCHAR(100),
	@Notes VARCHAR(100),
	@LevelID INT,
	@StudentID INT OUTPUT
AS

DECLARE @InsertedStudentID AS TABLE (ID INT);

INSERT INTO dbo.students (family_id, full_name, DOB, school_year, school_name, medical_info, notes, level_id)
OUTPUT INSERTED.student_id
INTO @InsertedStudentID
VALUES (@FamilyID, @FullName, @DOB, @SchoolYear, @School, @MedicalInfo, @Notes, @LevelID)

DECLARE @NewStudentID AS INT = (SELECT TOP 1 ID FROM @InsertedStudentID);

SELECT @StudentID = @NewStudentID
GO
/****** Object:  StoredProcedure [portal].[InsertStudentScores]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertStudentScores] 
(
	@StudentID INT,
	@TestDate DATE,
	@JsonScores VARCHAR(MAX)
)
AS

BEGIN


INSERT INTO dbo.scores (student_id, question_id, marks_received, test_date)
SELECT
	@StudentID AS StudentID,
	temp.question_id,
	temp.marks_received,
	@TestDate AS test_date
	FROM 
	(SELECT * FROM OPENJSON(@JsonScores) 
		WITH (
			question_id INT '$.question_id',
			marks_received INT '$.marks_received'
		)
	) AS temp

END
GO
/****** Object:  StoredProcedure [portal].[InsertStudentTestComment]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertStudentTestComment] 
(
	@TestID INT,
	@StudentID INT,
	@Comment VARCHAR(MAX)
) 
AS
INSERT INTO dbo.testComments (test_id, student_id, comment)
VALUES (@TestID, @StudentID, @Comment)
GO
/****** Object:  StoredProcedure [portal].[InsertSyllabus]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertSyllabus] 
(
	@SyllabusName VARCHAR(50),
	@JsonTopics VARCHAR(MAX),
	@SyllabusID INT OUTPUT
)
AS
BEGIN

DECLARE @InsertedSyllabusID AS TABLE (ID INT);

INSERT INTO syllabus (syllabus_name)
OUTPUT Inserted.syllabus_id
INTO @InsertedSyllabusID
VALUES (@SyllabusName)


DECLARE @NewSyllabusID AS INT = (SELECT TOP 1 ID FROM @InsertedSyllabusID)

INSERT INTO topics (topic_name, syllabus_id)
SELECT 
	temp.topic_name,
	@NewSyllabusID AS syllabus_id
	FROM
(SELECT * 
	FROM OPENJSON(@JsonTopics)
    WITH (  
        topic_name VARCHAR(10) '$.topicName'
		)) as temp

SELECT @SyllabusID = @NewSyllabusID

END
GO
/****** Object:  StoredProcedure [portal].[InsertTest]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertTest]
(
	@TestName VARCHAR(50),
	@Type BIT,
	@SyllabusID INT,
	@JsonQuestions VARCHAR(MAX),
	@TestID INT OUTPUT
)
AS
BEGIN

DECLARE @InsertedTestID AS TABLE (ID INT);

INSERT INTO tests (test_name, syllabus_id, mock)
OUTPUT Inserted.test_id
INTO @InsertedTestID
VALUES (@TestName, @SyllabusID, @Type)

DECLARE @NewTestID AS INT = (SELECT TOP 1 ID FROM @InsertedTestID)

INSERT INTO dbo.questions (test_id, topic_id, difficulty, marks)
SELECT @NewTestID AS test_id, 
	temp.topic_id,
	temp.difficulty,
	temp.marks
	FROM
(SELECT * 
	FROM OPENJSON(@JsonQuestions)
    WITH (  
		topic_id int '$.topicID',
        difficulty VARCHAR(10) '$.difficulty',
        marks int '$.marks'
		)) as temp

SELECT @TestID = @NewTestID

END
GO
/****** Object:  StoredProcedure [portal].[InsertTopic]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[InsertTopic] 
(
	@TopicName VARCHAR(50),
	@SyllabusID INT
)
AS
INSERT INTO topics (topic_name, syllabus_id)
VALUES (@TopicName, @SyllabusID)
GO
/****** Object:  StoredProcedure [portal].[Login]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[Login] @Username VARCHAR(20), @HashedPassword VARCHAR(MAX) OUTPUT
AS
SELECT @HashedPassword = (SELECT password FROM users WHERE username = @Username)
GO
/****** Object:  StoredProcedure [portal].[SelectAllFamilies]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllFamilies]
AS
SELECT 
	family_id,
	full_name,
	address,
	post_code,
	mobile,
	email,
	ec_full_name,
	relation_to_child,
	ec_address,
	ec_post_code,
	ec_mobile,
	notes
FROM dbo.family f
LEFT JOIN dbo.relation r ON f.ec_relation_id = r.relation_id
GO
/****** Object:  StoredProcedure [portal].[SelectAllInvoices]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllInvoices] 
AS 
SELECT
	invoice_id,
	full_name,
	FORMAT(invoice_date, 'dd-MM-yyyy') as invoice_date,
	FORMAT(due_date, 'dd-MM-yyyy') as due_date,
	FORMAT(start_date, 'dd-MM-yyyy') as start_date,
	amount_due
FROM dbo.invoices i
INNER JOIN dbo.family f
ON i.family_id = f.family_id
GO
/****** Object:  StoredProcedure [portal].[SelectAllPayments]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllPayments] 
AS
--SELECT 
--	payment_id,
--	p.family_id,
--	full_name,
--	FORMAT(payment_date, 'dd/MM/yyyy') as payment_date,
--	amount
--FROM payment p
--INNER JOIN dbo.family f
--ON p.family_id = f.family_id

SELECT 
	p.family_id,
	FORMAT(payment_date, 'dd-MM-yyyy') as payment_date,
	full_name,
	SUM(amount) as amount_paid
FROM payment p
INNER JOIN dbo.family f
ON p.family_id = f.family_id
group by p.family_id, payment_date, full_name
GO
/****** Object:  StoredProcedure [portal].[SelectAllRelations]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllRelations]
AS
(
SELECT * FROM dbo.relation
)
GO
/****** Object:  StoredProcedure [portal].[SelectAllSchools]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllSchools]
AS
(
SELECT * FROM dbo.school
)
GO
/****** Object:  StoredProcedure [portal].[SelectAllStudents]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllStudents]
AS

SELECT 
	student_id,
	family_id,
	full_name,
	FORMAT(DOB, 'dd/MM/yyyy') AS DOB,
	school_year,
	school_name,
	medical_info,
	notes
FROM dbo.students s

GO
/****** Object:  StoredProcedure [portal].[SelectAllSyllabuses]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllSyllabuses]
AS
SELECT 
syllabus_id,
syllabus_name
FROM syllabus s
GO
/****** Object:  StoredProcedure [portal].[SelectAllTests]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectAllTests]
AS
SELECT 
	test_id,
	test_name,
	mock,
	t.syllabus_id,
	syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id
GO
/****** Object:  StoredProcedure [portal].[SelectBalanceSummary]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectBalanceSummary]
AS
SELECT 
SUM(openbalance) as open_balance,
SUM(overdue) as overdue_balance,
COUNT(CASE WHEN overdue > 0 THEN 1 END) AS overdue_invoices,
COUNT (*) AS open_invoices
FROM 
(SELECT 
	family_id,
	i.invoice_id,
	SUM(amount_due - ISNULL(amount_paid, 0)) as openbalance,
	SUM(case when due_date < GETDATE() then amount_due - ISNULL(amount_paid, 0) else 0 end) as overdue
FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id WHERE amount_due > ISNULL(amount_paid, 0)
GROUP BY family_id, i.invoice_id) as temp
GO
/****** Object:  StoredProcedure [portal].[SelectCompensationAllowedSessions]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectCompensationAllowedSessions] @RegisterDateID Int
AS
BEGIN

DECLARE @RegisterDate Date = (SELECT session_date from sessionDates where session_date_id = @RegisterDateID)

select ss.student_session_id, ss.student_id, full_name, FORMAT(session_date, 'dd/MM/yyyy') AS session_date, session_time from studentSessions ss
inner join sessionDates sd
on ss.session_date_id = sd.session_date_id
inner join students st
on ss.student_id = st.student_id
inner join sessionSlots sl
on ss.session_slot_id = sl.session_slot_id
where attendance = 0
and session_date >= DATEADD(MONTH, -3, @RegisterDate) AND session_date < @RegisterDate

END
GO
/****** Object:  StoredProcedure [portal].[SelectFamilyByID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectFamilyByID] @FamilyID INT
AS
SELECT 
	full_name,
	address,
	post_code,
	mobile,
	email,
	ec_full_name,
	relation_to_child,
	ec_address,
	ec_post_code,
	ec_mobile,
	notes
FROM dbo.family f
LEFT JOIN dbo.relation r ON f.ec_relation_id = r.relation_id
WHERE f.family_id = @FamilyID
GO
/****** Object:  StoredProcedure [portal].[SelectInvoiceByID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectInvoiceByID] @InvoiceID INT 
AS 

SELECT
	invoice_id,
	i.family_id,
	full_name,
	address,
	post_code,
	mobile,
	email,
	FORMAT(invoice_date, 'yyyy-MM-dd') as invoice_date,
	FORMAT(due_date, 'yyyy-MM-dd') as due_date,
	FORMAT(start_date, 'yyyy-MM-dd') as start_date,
	amount_due,
	(SELECT ISNULL(SUM(amount), 0) FROM payment p where p.invoice_id = @InvoiceID) AS amount_paid,
	(SELECT * FROM dbo.invoicesMisc WHERE invoice_id=@InvoiceID FOR JSON AUTO) AS JSONInvoiceMisc
FROM dbo.invoices i
INNER JOIN dbo.family f
ON i.family_id = f.family_id
WHERE invoice_id = @InvoiceID
GO
/****** Object:  StoredProcedure [portal].[SelectOutstandingInvoices]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectOutstandingInvoices]
AS
SELECT 
	f.family_id,
	full_name,
	students = STUFF(
	(SELECT ', ' + temp.full_name
	FROM 
	(SELECT s.family_id, s.full_name FROM students s
	WHERE s.family_id = f.family_id) AS temp
	FOR XML PATH ('')), 1, 2, ''),
	mobile, 
	email,
	overdue_invoices,
	overdue_balance,
	open_balance
FROM family f
LEFT JOIN
--replacement of commented out code below
(SELECT 
	family_id,
	SUM(openbalance) as open_balance,
	SUM(overdue) as overdue_balance,
	COUNT(CASE WHEN overdue > 0 THEN 1 END) AS overdue_invoices
FROM
(SELECT 
	family_id,
	i.invoice_id,
	SUM(amount_due - ISNULL(amount_paid, 0)) as openbalance,
	SUM(case when due_date < GETDATE() then amount_due - ISNULL(amount_paid, 0) else 0 end) as overdue
FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id WHERE amount_due > ISNULL(amount_paid, 0)
GROUP BY family_id, i.invoice_id) as b
GROUP BY family_id) as temp2

--(SELECT 
--	family_id,
--	SUM(amount_due - ISNULL(amount_paid, 0)) as overdue_balance,
--	COUNT(*) AS overdue_invoices
--FROM invoices i
--LEFT JOIN
--(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
--ON i.invoice_id = a .invoice_id
--WHERE due_date < GETDATE() 
--AND amount_due > ISNULL(amount_paid, 0)
--GROUP BY family_id) as temp2

ON f.family_id = temp2.family_id
ORDER BY overdue_balance DESC
GO
/****** Object:  StoredProcedure [portal].[SelectOutstandingInvoicesByFamilyID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectOutstandingInvoicesByFamilyID] @FamilyID INT
AS
SELECT i.invoice_id, FORMAT(due_date, 'yyyy-MM-dd') as due_date, amount_due, amount_paid FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id
WHERE family_id = @FamilyID
AND amount_due > ISNULL(amount_paid, 0)
ORDER BY due_date
GO
/****** Object:  StoredProcedure [portal].[SelectPaymentsByFamilyIDPaymentDate]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectPaymentsByFamilyIDPaymentDate] 
(
	@FamilyID INT,
	@PaymentDate DATE,
	@PaymentType VARCHAR(20) OUTPUT
)
AS

BEGIN

DECLARE @PaymentIdTable TABLE (paymentID INT, invoiceID INT);
INSERT INTO @PaymentIdTable
SELECT p.payment_id, p.invoice_id FROM payment p
WHERE p.family_id = @FamilyID
AND payment_date = @PaymentDate

SELECT * FROM (SELECT 
	payment_id, 
	--p.family_id, 
	p.invoice_id, 
	--p.payment_date, 
	p.amount AS payment, 
	FORMAT(i.due_date, 'dd-MM-yyyy') as due_date,
	amount_due, 
	amount_paid 
FROM payment p
LEFT JOIN invoices i
ON p.invoice_id = i.invoice_id
LEFT JOIN 
(SELECT 
	invoice_id, 
	SUM(amount) AS amount_paid 
FROM payment tp WHERE tp.payment_id NOT IN (SELECT paymentID FROM @PaymentIdTable) 
GROUP BY invoice_id) AS a
ON p.invoice_id = a.invoice_id
WHERE p.family_id = @FamilyID
AND payment_date = @PaymentDate

UNION

SELECT 
	null as payment_id,
	--i.family_id,
	i.invoice_id, 
	null as payment,
	FORMAT(due_date, 'dd-MM-yyyy') as due_date, 
	amount_due, 
	amount_paid 
FROM invoices i
LEFT JOIN
(SELECT invoice_id, SUM(amount) AS amount_paid FROM payment GROUP BY invoice_id) AS a
ON i.invoice_id = a .invoice_id
WHERE family_id = @FamilyID
AND i.invoice_id NOT IN (SELECT invoiceID FROM @PaymentIdTable WHERE invoiceID IS NOT NULL) 
AND amount_due > ISNULL(amount_paid, 0)) z
ORDER BY 
CASE 
        WHEN z.payment_id IS NULL THEN 1
        ELSE 0
   END, z.payment_id,
CASE 
        WHEN z.due_date IS NULL THEN 1
        ELSE 0
   END, z.due_date


SELECT @PaymentType =  (SELECT payment_type FROM paymentType
WHERE payment_type_id = 
(SELECT distinct top 1 payment_type_id from payment
WHERE family_id = @FamilyID
AND payment_date = @PaymentDate))

END
GO
/****** Object:  StoredProcedure [portal].[SelectQuestionsForTest]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectQuestionsForTest] @TestID INT
AS
SELECT 
	question_id,
	test_id,
	q.topic_id,
	topic_name,
	difficulty,
	marks
FROM questions q
INNER JOIN topics t
ON q.topic_id = t.topic_id
WHERE test_id = @TestID
GO
/****** Object:  StoredProcedure [portal].[SelectRegister]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectRegister] @SessionDateID INT
AS 
BEGIN
SELECT
(SELECT
	d.session_date,
	sessions = (
		SELECT session_time, 
		tables = (
			SELECT session_table,
			students = (
			ISNULL(
				(SELECT s.student_id, s.student_session_id, attendance, compensation_id, full_name, full_session 
				FROM studentSessions s
				INNER JOIN students st on s.student_id = st.student_id
					WHERE s.session_date_id = d.session_date_id 
					AND s.session_table_id = t.session_table_id
					AND s.session_slot_id = l.session_slot_id
				FOR JSON PATH) , '[]')
			)
			FROM sessionTables t 
			FOR JSON PATH
		)
		FROM sessionSlots l
		FOR JSON PATH
	) 
FROM sessionDates d
WHERE session_date_id = @SessionDateID
FOR JSON PATH) AS register
END
GO
/****** Object:  StoredProcedure [portal].[SelectSessionDates]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectSessionDates]
AS
BEGIN
select session_date_id, FORMAT(session_date, 'dd/MM/yyyy') AS session_date from sessionDates order by convert(datetime, session_date, 103) DESC
END

GO
/****** Object:  StoredProcedure [portal].[SelectSessionsForInvoice]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectSessionsForInvoice]
(
	@FamilyID INT,
	@StartDate DATE
)
AS
BEGIN
SELECT 
	(SELECT 
		s.student_id, 
		s.full_name,
		(SELECT * FROM (SELECT TOP 1 
			rate_id, rate, student_id 
		FROM rate r
		WHERE r.student_id = s.student_id
		AND MONTH(rateDate) <= MONTH(@StartDate) 
		ORDER BY rateDate DESC) rateTemp FOR JSON AUTO) as rateInfo,
		(SELECT * 
		FROM (SELECT 
				student_session_id, 
				compensation_id, 
				attendance, 
				full_session, 
				ss.session_date_id, 
				FORMAT(session_date, 'dd/MM/yyyy') as session_date
			FROM studentSessions ss
			INNER JOIN sessionDates d
			ON ss.session_date_id = d.session_date_id
			WHERE s.student_id = ss.student_id
			AND compensation_id IS NULL
			AND MONTH(d.session_date) = MONTH(@StartDate)) sessionTemp FOR JSON AUTO) AS sessions
	FROM students s 
	WHERE s.family_id = f.family_id FOR JSON AUTO) AS students
FROM family f 
WHERE f.family_id = @FamilyID
END
 

GO
/****** Object:  StoredProcedure [portal].[SelectStudentByID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentByID] @StudentID INT
AS

SELECT 
	student_id,
	family_id,
	full_name,
	FORMAT(DOB, 'dd/MM/yyyy') AS DOB,
	school_year,
	school_name,
	medical_info,
	notes,
	level_id
FROM dbo.students s 
WHERE s.student_id = @StudentID
GO
/****** Object:  StoredProcedure [portal].[SelectStudentScoresBySyllabusID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentScoresBySyllabusID] @StudentID INT, @SyllabusID INT
AS
select score_id, s.question_id, marks_received, marks, topic_id, q.test_id from scores s
inner join questions q
on s.question_id = q.question_id
inner join tests t
on q.test_id = t.test_id
where student_id= @StudentID
and syllabus_id = @SyllabusID

GO
/****** Object:  StoredProcedure [portal].[SelectStudentScoresByTestID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentScoresByTestID]
(
	@StudentID INT,
	@TestID INT
)
AS

BEGIN

SELECT 
	score_id,
	s.question_id,
	marks_received,
	marks,
	topic_name,
	difficulty
FROM dbo.scores s 
INNER JOIN dbo.questions q on q.question_id = s.question_id
INNER JOIN dbo.topics t on q.topic_id = t.topic_id
WHERE student_id = @StudentID
and test_id = @TestID

END
GO
/****** Object:  StoredProcedure [portal].[SelectStudentsOfFamily]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentsOfFamily] @FamilyID INT
AS 
(
SELECT * FROM students WHERE family_id = @FamilyID
)
GO
/****** Object:  StoredProcedure [portal].[SelectStudentTestComment]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentTestComment] 
(
	@StudentID INT, 
	@TestID INT
)
AS
SELECT * from testComments WHERE student_id = @StudentID AND test_id = @TestID

GO
/****** Object:  StoredProcedure [portal].[SelectStudentTestsCompleted]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentTestsCompleted] @StudentID INT
AS 
SELECT temp.test_id, test_name, syllabus_id, SUM(temp.marks_received) as marks_received,  SUM(temp.marks) as marks from 
(SELECT q.test_id, test_name, syllabus_id, marks, marks_received from scores s 
INNER JOIN questions q on s.question_id = q.question_id
INNER JOIN tests t on q.test_id = t.test_id
where student_id = @StudentID) as temp
GROUP BY test_id, test_name, syllabus_id

GO
/****** Object:  StoredProcedure [portal].[SelectStudentTestsCompletedBySyllabusID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectStudentTestsCompletedBySyllabusID] @StudentID INT, @SyllabusID INT
AS
begin
select distinct q.test_id, test_name, mock from scores s
inner join questions q on s.question_id = q.question_id
inner join tests t on q.test_id = t.test_id
where student_id = @StudentID and syllabus_id = @SyllabusID
end
GO
/****** Object:  StoredProcedure [portal].[SelectTestsBySyllabus]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectTestsBySyllabus] @SyllabusID INT
AS
SELECT 
	test_id,
	test_name,
	mock,
	syllabus_name
FROM tests t
INNER JOIN syllabus s
ON t.syllabus_id = s.syllabus_id
WHERE t.syllabus_id = @SyllabusID
GO
/****** Object:  StoredProcedure [portal].[SelectTopicsBySyllabus]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [portal].[SelectTopicsBySyllabus] @SyllabusID INT
AS 
(
SELECT topic_id, topic_name FROM syllabus s 
INNER JOIN topics t on s.syllabus_id = t.syllabus_id
WHERE s.syllabus_id = @SyllabusID
)
GO
/****** Object:  StoredProcedure [portal].[SelectTopicsStudentTestedOn]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectTopicsStudentTestedOn]
(
	@SyllabusID INT,
	@StudentID INT
)
AS
BEGIN

select distinct topic_name, q.topic_id from scores s 
inner join questions q on s.question_id = q.question_id
inner join topics t on q.topic_id = t.topic_id
where student_id = @StudentID
and syllabus_id = @SyllabusID

END
GO
/****** Object:  StoredProcedure [portal].[SelectTransactionsByFamilyID]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[SelectTransactionsByFamilyID] @FamilyID INT
AS
BEGIN

SELECT
	FORMAT(start_date, 'yyyy-MM-dd') as date,
	'Invoice' as type,
	invoice_id as id,
	amount_due,
	NULL as credit,
	ISNULL((SELECT SUM(amount) FROM payment p WHERE p.invoice_id = i.invoice_id), 0) as amount_paid,
	CASE
		WHEN amount_due > ISNULL((SELECT SUM(amount) FROM payment p WHERE p.invoice_id = i.invoice_id), 0)
			THEN CAST(DATEDIFF(day, GETDATE(), due_date) AS varchar)
		ELSE 'Paid'
	END as status
FROM dbo.invoices i
WHERE i.family_id = @FamilyID
UNION
SELECT 
	FORMAT(payment_date, 'yyyy-MM-dd') as date,
	'Payment' as type,
	NULL as id,
	NULL AS amount_due,
	(SELECT SUM(amount) FROM payment tp where tp.payment_date = p.payment_date AND tp.family_id = @FamilyID AND tp.invoice_id IS NULL) as credit,
	SUM(amount) as amount_paid,
	NULL as status
FROM payment p
WHERE p.family_id = @FamilyID
GROUP BY payment_date
ORDER BY date DESC

END
GO
/****** Object:  StoredProcedure [portal].[UpdateFamily]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateFamily]
	@FamilyID INT,
	@FullName VARCHAR(30),
	@Address VARCHAR(35),
	@PostCode VARCHAR(8),
	@Mobile VARCHAR(11),
	@Email VARCHAR(40),
	@ecFullName VARCHAR(30),
	@ecRelation VARCHAR(20),
	@ecAddress VARCHAR(50),
	@ecPostCode VARCHAR(8),
	@ecMobile VARCHAR(11),
	@Notes VARCHAR(100)

AS

DECLARE @RelationID AS INT = (SELECT relation_id from relation WHERE relation_to_child = @ecRelation);

UPDATE family
SET full_name = @FullName,
	address = @Address,
	post_code = @PostCode,
	mobile = @Mobile,
	email = @Email,
	ec_full_name = @ecFullName,
	ec_relation_id = @RelationID,
	ec_address = @ecAddress,
	ec_post_code = @ecPostCode,
	ec_mobile = @ecMobile,
	notes = @Notes
WHERE family_id = @FamilyID
GO
/****** Object:  StoredProcedure [portal].[UpdateInvoice]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateInvoice]
(
	@InvoiceID INT,
	@InvoiceDate DATE,
	@DueDate DATE,
	@StartDate DATE,
	@AmountDue DECIMAL(6,2),
	@JSONInvoiceMisc VARCHAR(MAX),
	@JSONRateInfo VARCHAR(MAX)
)
AS
BEGIN

--Update invoice first
UPDATE invoices
SET invoice_date = @InvoiceDate,
	due_date = @DueDate,
	amount_due = @AmountDue
WHERE invoice_id = @InvoiceID

--update invoice misc
----step 1: delete any invoice_misc where invoice_misc_id does not exist in JSONInvoiceMisc
DELETE FROM invoicesMisc
WHERE invoice_misc_id IN
(SELECT im.invoice_misc_id
FROM invoicesMisc im
INNER JOIN  invoices i
ON im.invoice_id = i.invoice_id
LEFT JOIN 
(SELECT invoice_misc_id, description, rate 
	FROM OPENJSON(@JsonInvoiceMisc)
    WITH (
		invoice_misc_id INT '$.invoice_misc_id',
        description VARCHAR(50) '$.description',
        rate decimal(5,2) '$.rate'
		)) as temp ON im.invoice_misc_id = temp.invoice_misc_id
WHERE i.invoice_id = @InvoiceID
AND temp.invoice_misc_id IS NULL)

----step 2: update any invoice_misc where invoice_misc_id exist in JSONInvoiceMisc
UPDATE invoicesMisc
SET description = temp.description,
	rate = temp.rate
	from invoicesMisc im
INNER JOIN
(SELECT invoice_misc_id, description, rate 
	FROM OPENJSON(@JsonInvoiceMisc)
    WITH (
		invoice_misc_id INT '$.invoice_misc_id',
        description VARCHAR(50) '$.description',
        rate decimal(5,2) '$.rate'
		)) as temp on im.invoice_misc_id = temp.invoice_misc_id


----step 3: insert any invoice_misc where there are no invoice_misc_id in JSONInvoiceMisc
INSERT INTO invoicesMisc (invoice_id, description, rate)
SELECT @InvoiceID as invoice_id, description, rate 
	FROM OPENJSON(@JsonInvoiceMisc)
    WITH (
		invoice_misc_id INT '$.invoice_misc_id',
        description VARCHAR(50) '$.description',
        rate decimal(5,2) '$.rate'
		) as temp
WHERE temp.invoice_misc_id IS NULL

IF @JSONRateInfo IS NOT NULL
	EXEC portal.UpdateRate @JSONRateInfo=@JSONRateInfo, @StartDate=@StartDate

END
GO
/****** Object:  StoredProcedure [portal].[UpdatePayments]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdatePayments] 
(
	@JSONTransactionInfo VARCHAR(MAX),
	@PaymentDate DATE,
	@PaymentType VARCHAR(20),
	@FamilyID INT,
	@Credit DECIMAL(6, 2)
)
AS
BEGIN

Declare @PaymentTypeID INT = (SELECT payment_type_id FROM paymentType WHERE payment_type = @PaymentType)

--step 1: if credit is 0 --> delete credit, otherwise update the credit
IF @Credit IS NULL OR @Credit = 0
	BEGIN
		DELETE FROM payment 
		WHERE family_id = @FamilyID
		AND payment_date = @PaymentDate
		AND invoice_id IS NULL
	END
ELSE
	IF EXISTS (SELECT * FROM payment WHERE family_id = @FamilyID AND payment_date = @PaymentDate AND invoice_id IS NULL) 
		BEGIN
			UPDATE payment
			SET amount = @Credit,
			payment_type_id = @PaymentTypeID
			WHERE family_id = @FamilyID
			AND payment_date = @PaymentDate
			AND invoice_id IS NULL
		END
	ELSE
		BEGIN
			INSERT INTO payment (family_id, invoice_id, payment_date, amount, payment_type_id)
			SELECT @FamilyID,
				NULL,
				@PaymentDate,
				@Credit,
				@PaymentTypeID
		END

--step 2: update all payments
UPDATE payment
SET amount = temp.payment,
	payment_type_id = @PaymentTypeID
FROM payment p
INNER JOIN
(SELECT invoice_id, payment, payment_id 
	FROM OPENJSON(@JSONTransactionInfo)
    WITH (
        invoice_id	int '$.id',
        payment_id	int '$.paymentID',
        payment decimal(5,2) '$.payment'
		) WHERE payment IS NOT NULL AND payment != 0 and invoice_id IS NOT NULL) as temp on p.payment_id = temp.payment_id

--step 3: remove all payments where the payment is null or 0
DELETE FROM payment 
WHERE payment_id IN
(SELECT payment_id 
	FROM OPENJSON(@JSONTransactionInfo)
    WITH (
        invoice_id	int '$.id',
        payment_id	int '$.paymentID',
        payment decimal(5,2) '$.payment'
		) WHERE payment IS NULL OR payment = 0 AND invoice_id IS NOT NULL)

--step 4: insert any new payments, where the invoice_id is not in the payments for that family and date already
INSERT INTO payment (family_id, invoice_id, payment_date, amount, payment_type_id)
SELECT @FamilyID,
	temp.invoice_id,
	@PaymentDate,
	temp.payment,
	@PaymentTypeID
	FROM
(SELECT * 
	FROM OPENJSON(@JSONTransactionInfo)
    WITH (
        invoice_id	int '$.id',
        payment decimal(5,2) '$.payment'
		) WHERE payment IS NOT NULL AND payment != 0 AND invoice_id NOT IN(SELECT invoice_id FROM payment p WHERE family_id = @FamilyID AND payment_date = @PaymentDate AND invoice_id IS NOT NULL) ) as temp

END
GO
/****** Object:  StoredProcedure [portal].[UpdateQuestion]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateQuestion] 
(
	@QuestionID INT,
	@TopicID INT,
	@Difficulty VARCHAR(10),
	@Marks INT
)
AS

UPDATE questions
SET topic_id = @TopicID,
	difficulty = @Difficulty,
	marks = @Marks
WHERE question_id = @QuestionID
GO
/****** Object:  StoredProcedure [portal].[UpdateRate]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateRate] 
(
	@JSONRateInfo VARCHAR(MAX), 
	@StartDate DATE
)
AS
BEGIN
--INSERT NEW RATES IF STUDENT HAS NO PRIOR RATE
INSERT INTO rate (student_id, rate, rateDate)
(SELECT student_id, rate, @StartDate 
	FROM OPENJSON(@JSONRateInfo)
    WITH (
		rate_id INT '$.rate_id',
        student_id INT '$.student_id',
        rate decimal(5,2) '$.rate'
		) WHERE rate_id IS NULL)

--UPDATE RATES IF RATEDATE MONTH AND STARTDATE MONTH ARE THE SAME
UPDATE rate
SET rate = temp.rate
FROM rate r
INNER JOIN 
(SELECT student_id, rate, rate_id 
	FROM OPENJSON(@JSONRateInfo)
    WITH (
		rate_id INT '$.rate_id',
        student_id INT '$.rate_id',
        rate decimal(5,2) '$.rate'
		)) AS temp ON r.rate_id = temp.rate_id
		WHERE MONTH(@StartDate) = MONTH(r.rateDate)
		AND r.rate != temp.rate

--INSERT RATES IF STARTDATE MONTH IS GREATER THAN RATEDATE MONTH ARE THE SAME
INSERT INTO rate (student_id, rate, rateDate)
SELECT  temp.student_id, temp.rate, @StartDate FROM rate r
INNER JOIN
(SELECT student_id, rate, rate_id 
	FROM OPENJSON(@JSONRateInfo)
    WITH (
		rate_id INT '$.rate_id',
        student_id INT '$.rate_id',
        rate decimal(5,2) '$.rate'
		)) AS temp ON r.rate_id = temp.rate_id
		WHERE MONTH(@StartDate) > MONTH(r.rateDate)
		AND r.rate !=  temp.rate

END
GO
/****** Object:  StoredProcedure [portal].[UpdateRegister]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateRegister] 
(
	@JsonAdd VARCHAR(MAX),
	@JsonUpdate VARCHAR(MAX),
	@JsonRemove VARCHAR(MAX)
)
AS

BEGIN

--First add all the new student sessions
INSERT INTO studentSessions (student_id, session_date_id, session_table_id, session_slot_id, attendance, compensation_id, full_session)
SELECT 
	temp.student_id, 
	temp.session_date_id,
	(SELECT session_table_id from sessionTables WHERE session_table = temp.session_table),
	(SELECT session_slot_id from sessionSlots WHERE session_time = temp.session_time),
	temp.attendance,
	temp.compensation_id,
	temp.full_session
	FROM
(SELECT * 
	FROM OPENJSON(@JsonAdd)
    WITH (  
		student_id int '$.student_id',
        session_date_id int '$.session_date_id',
        session_table varchar(20) '$.session_table',
		session_time varchar(11) '$.session_time',
		attendance bit '$.attendance',
		compensation_id int '$.compensation_id',
		full_session bit '$.full_session'
		)) as temp


--Update the student session attendance records
UPDATE studentSessions
SET attendance = temp.attendance
FROM studentSessions s
INNER JOIN
(SELECT student_session_id, attendance 
FROM OPENJSON(@JsonUpdate)
WITH (  
	student_session_id int '$.student_session_id',
	attendance bit '$.attendance'
	)) as temp ON s.student_session_id = temp.student_session_id


--Delete student sessions

--If the student_session_id that needs deleting is referenced in another record as a compensation, remove that record first
DELETE FROM studentSessions
WHERE compensation_id IN
(SELECT temp.student_session_id 
	FROM
	(SELECT * 
	FROM OPENJSON(@JsonRemove)
    WITH (  
		student_session_id int '$.student_session_id'
		)) as temp
)

DELETE FROM studentSessions
WHERE student_session_id IN
(SELECT temp.student_session_id 
	FROM
	(SELECT * 
	FROM OPENJSON(@JsonRemove)
    WITH (  
		student_session_id int '$.student_session_id'
		)) as temp
)

--Delete any compensation sessions that has not been attended
DELETE FROM studentSessions
WHERE compensation_id IS NOT NULL AND (attendance = 0 OR attendance is null)

END
GO
/****** Object:  StoredProcedure [portal].[UpdateRelation]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateRelation]
	@RelationID INT,
	@Relation VARCHAR(20)
AS 

UPDATE dbo.relation
SET relation_to_child = @Relation
WHERE relation_id = @RelationID
GO
/****** Object:  StoredProcedure [portal].[UpdateSchool]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateSchool]
	@SchoolID INT,
	@School VARCHAR(50)

AS

UPDATE dbo.school
SET school_name = @School
WHERE school_id = @SchoolID
GO
/****** Object:  StoredProcedure [portal].[UpdateScore]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateScore] 
(
	@ScoreID INT,
	@MarksReceived INT
)
AS
UPDATE scores
SET marks_received = @MarksReceived
WHERE scores.score_id = @ScoreID
GO
/****** Object:  StoredProcedure [portal].[UpdateStudent]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateStudent] 
	@StudentID INT,
	@FamilyID INT,
	@FullName VARCHAR(30),
	@DOB DATE,
	@SchoolYear INT,
	@School VARCHAR(50),
	@MedicalInfo VARCHAR(100),
	@Notes VARCHAR(100), 
	@LevelID INT
AS

UPDATE dbo.students
SET family_id = @FamilyID,
	full_name = @FullName,
	DOB = @DOB,
	school_year = @SchoolYear,
	school_name = @School,
	medical_info = @MedicalInfo,
	notes = @Notes,
	level_id = @LevelID
WHERE student_id = @StudentID
GO
/****** Object:  StoredProcedure [portal].[UpdateStudentScores]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateStudentScores] 
(
	@StudentID INT,
	@JsonScores VARCHAR(MAX)
)
AS

UPDATE dbo.scores
SET 
	marks_received = temp.marks_received
FROM 
(SELECT * FROM OPENJSON(@JsonScores) 
		WITH (
			score_id INT '$.score_id',
			marks_received INT '$.marks_received'
		)) AS temp
WHERE scores.score_id = temp.score_id
GO
/****** Object:  StoredProcedure [portal].[UpdateStudentTestComment]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateStudentTestComment]
(
	@TestCommentID INT,
	@Comment VARCHAR(MAX)
)
AS
UPDATE dbo.testComments
SET comment = @Comment
WHERE test_comment_id = @TestCommentID
GO
/****** Object:  StoredProcedure [portal].[UpdateTest]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateTest]
(
	@TestID INT,
	@Type BIT,
	@TestName VARCHAR(50),
	@JsonQuestions VARCHAR(MAX)
)
AS

UPDATE dbo.tests
SET test_name = @TestName,
	mock = @Type
WHERE test_id = @TestID

UPDATE questions
SET topic_id = temp.topic_id,
difficulty = temp.difficulty,
marks = temp.marks from questions q
INNER JOIN
(SELECT question_id, topic_id, difficulty, marks 
FROM OPENJSON(@JsonQuestions)
WITH (
	question_id INT '$.questionID',
	topic_id INT '$.topicID',
	difficulty VARCHAR(10) '$.difficulty',
    marks int '$.marks'
)) as temp ON q.question_id = temp.question_id

/*INSERT*/
INSERT INTO dbo.questions (test_id, topic_id, difficulty, marks)
SELECT @TestID as test_id, 
	temp.topic_id,
	temp.difficulty,
	temp.marks
	FROM
(SELECT * 
	FROM OPENJSON(@JsonQuestions)
    WITH (  
		question_id INT '$.questionID',
		topic_id int '$.topicID',
        difficulty VARCHAR(10) '$.difficulty',
        marks int '$.marks'
		)) as temp
WHERE temp.question_id IS NULL 
GO
/****** Object:  StoredProcedure [portal].[UpdateTopic]    Script Date: 04/08/2023 16:01:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [portal].[UpdateTopic] 
(
	@TopicID INT,
	@TopicName VARCHAR(50)
)
AS
UPDATE topics
SET topic_name = @TopicName
WHERE topic_id = @TopicID
GO
USE [master]
GO
ALTER DATABASE [studysupport] SET  READ_WRITE 
GO
