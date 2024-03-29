USE [studysupport]
GO
/****** Object:  Table [dbo].[invoices]    Script Date: 02/06/2023 18:44:42 ******/
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
ALTER TABLE [dbo].[invoices]  WITH CHECK ADD  CONSTRAINT [FK_invoices_family] FOREIGN KEY([family_id])
REFERENCES [dbo].[family] ([family_id])
GO
ALTER TABLE [dbo].[invoices] CHECK CONSTRAINT [FK_invoices_family]
GO
