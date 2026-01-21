import React from "react";
import "./reportTable.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ReportTable = ({ data, type, total }) => {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="emptyState">
        No {type === "invoice" ? "invoices" : "payments"} found for the
        selected date range.
      </div>
    );
  }

  // Define columns based on type
  const invoiceColumns = [
    { label: "Date", key: "invoiceDate" },
    { label: "Transaction Type", key: "transactionType" },
    { label: "No.", key: "invoiceID" },
    { label: "Name", key: "fullName" },
    { label: "Amount", key: "amountDue" },
  ];

  const paymentColumns = [
    { label: "Date", key: "paymentDate" },
    { label: "Transaction Type", key: "transactionType" },
    { label: "Invoice ID", key: "invoiceID" },
    { label: "Full Name", key: "fullName" },
    { label: "Amount", key: "amountPaid" },
    { label: "Payment Type", key: "paymentType" },
  ];

  const columns = type === "invoice" ? invoiceColumns : paymentColumns;

  return (
    <TableContainer component={Paper} className="reportTableContainer">
      <Table className="reportTable">
        <TableHead>
          <TableRow className="reportTableHeader">
            {columns.map((column) => (
              <TableCell key={column.key} className="reportTableHeaderCell">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} className="reportTableRow">
              {columns.map((column) => {
                let cellValue = row[column.key];

                // Handle special cases
                if (column.key === "transactionType") {
                  cellValue = type === "invoice" ? "Invoice" : "Payment";
                } else if (column.key === "invoiceID" && type === "payment") {
                  cellValue = row.invoiceID || "Credit";
                } else if (
                  column.key === "amountDue" ||
                  column.key === "amountPaid"
                ) {
                  cellValue = `£${Number(cellValue).toFixed(2)}`;
                }

                return (
                  <TableCell key={column.key} className="reportTableCell">
                    {cellValue}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          {/* Total Row */}
          <TableRow className="reportTableTotalRow">
            <TableCell
              colSpan={columns.length - 1}
              className="reportTableTotalLabel"
            >
              Total
            </TableCell>
            <TableCell className="reportTableTotalValue">
              £{Number(total).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;
