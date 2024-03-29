USE [studysupport]
GO
/****** Object:  Table [dbo].[invoicesMisc]    Script Date: 02/06/2023 18:44:42 ******/
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
ALTER TABLE [dbo].[invoicesMisc]  WITH CHECK ADD  CONSTRAINT [FK_invoicesMisc_invoices] FOREIGN KEY([invoice_id])
REFERENCES [dbo].[invoices] ([invoice_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[invoicesMisc] CHECK CONSTRAINT [FK_invoicesMisc_invoices]
GO
