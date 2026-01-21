import React, { useState } from "react";
import "./excelReport.css";
import { Button, InputLabel, TextField } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getData } from "../../helpers/apiFunctions";
import ReportTable from "../reportTable/ReportTable";

const ExcelReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [showReport, setShowReport] = useState(false);

  function isValid() {
    if (!startDate) setStartDateError("This is a required field");
    if (!endDate) setEndDateError("This is a required field");
    if (startDate > endDate) {
      setError("End date cannot be before start date");
    } else {
      setError("");
    }

    if (!startDate || !endDate || startDate > endDate) {
      return false;
    }

    return true;
  }

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };

  const handleViewReport = () => {
    if (isValid()) {
      setLoading(true);
      setError("");
      async function fetchData() {
        try {
          const serverResponse = await getData(
            `${process.env.REACT_APP_API_URL}/api/transaction/${startDate}/${endDate}`,
          );
          if (serverResponse.message === "OK") {
            const { invoices, payments } = serverResponse.results.data;
            setReportData({ invoices, payments });
            setShowReport(true);
            setLoading(false);
          } else {
            setLoading(false);
            setError(serverResponse.message);
          }
        } catch (error) {
          setLoading(false);
          setError("Failed to fetch report data. Please try again.");
          console.log(error);
        }
      }
      fetchData();
    }
  };

  function handleDownload() {
    if (isValid()) {
      try {
        setLoading(true);
        async function fetchData() {
          // Use cached data if available
          let invoices, payments;

          if (reportData) {
            invoices = reportData.invoices;
            payments = reportData.payments;
          } else {
            const serverResponse = await getData(
              `${process.env.REACT_APP_API_URL}/api/transaction/${startDate}/${endDate}`,
            );
            if (serverResponse.message === "OK") {
              invoices = serverResponse.results.data.invoices;
              payments = serverResponse.results.data.payments;
            } else {
              setLoading(false);
              throw Error(serverResponse.message);
            }
          }

          if (invoices && payments) {
            // Create a new workbook
            const workbook = XLSX.utils.book_new();

            // Sheet Title and Headers

            const header = [
              [{ v: "Study Support", t: "s" }],
              [{ v: "Transaction List by Date", t: "s" }],
              [{ v: startDate + " to " + endDate, t: "s" }],
              [],
            ];

            // Create an array for the invoice data
            const invoiceData = [
              [{ v: "Invoices Report", t: "s" }],
              [],
              ["Date", "Transaction Type", "No.", "Name", "Amount"],
              ...invoices.map((invoice) => [
                invoice.invoiceDate,
                "Invoice",
                invoice.invoiceID,
                invoice.fullName,
                invoice.amountDue,
              ]),
              [],
              [
                "Total",
                "",
                "",
                "",
                `£${invoices
                  .reduce((sum, invoice) => sum + invoice.amountDue, 0)
                  .toFixed(2)}`,
              ],
              [],
              [],
            ];

            // Create an array for the payment data
            const paymentData = [
              [{ v: "Payments Report", t: "s" }],
              [],
              [
                "Date",
                "Transaction Type",
                "Invoice ID",
                "Full Name",
                "Amount",
                "Payment Type",
              ],
              ...payments.map((payment) => [
                payment.paymentDate,
                "Payment",
                payment.invoiceID || "Credit",
                payment.fullName,
                payment.amountPaid,
                payment.paymentType,
              ]),
              [],
              [
                "Total",
                "",
                "",
                "",
                `£${payments
                  .reduce((sum, payment) => sum + payment.amountPaid, 0)
                  .toFixed(2)}`,
                "",
              ],
            ];

            // Merge the two data arrays
            const combinedData = [...header, ...invoiceData, ...paymentData];

            // Convert the combined data to a worksheet
            const sheet = XLSX.utils.aoa_to_sheet(combinedData);

            // Apply merges
            sheet["!merges"] = [
              {
                s: { r: 0, c: 0 },
                e: { r: 0, c: 5 },
              }, // Merge "Study Support"
              {
                s: { r: 1, c: 0 },
                e: { r: 1, c: 5 },
              }, // Merge "Transactions List By Date"
              {
                s: { r: 2, c: 0 },
                e: { r: 2, c: 5 },
              }, // Merge "Date from and to"
              {
                s: { r: 0 + header.length, c: 0 },
                e: { r: 0 + header.length, c: 4 },
              }, // Merge "Invoices Report"
              {
                s: { r: invoiceData.length + header.length, c: 0 },
                e: { r: invoiceData.length + header.length, c: 4 },
              }, // Merge "Payments Report"
            ];

            // Append the sheet to the workbook
            XLSX.utils.book_append_sheet(workbook, sheet, "Transactions");

            // Write the workbook to a binary string
            const wbout = XLSX.write(workbook, {
              bookType: "xlsx",
              type: "binary",
            });

            // Convert the binary string to a Blob
            const blob = new Blob([s2ab(wbout)], {
              type: "application/octet-stream",
            });

            // Use FileSaver to save the file
            saveAs(blob, "StudySupport Transaction List by Date.xlsx");
            setLoading(false);
          } else {
            setLoading(false);
            throw Error("No data available");
          }
        }
        fetchData();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }

  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <InputLabel>Select a start date:</InputLabel>
          <TextField
            required
            error={startDateError.length !== 0}
            helperText={startDateError}
            id="date"
            label="Start Date"
            type="date"
            name="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setStartDateError("");
              setShowReport(false);
              setReportData(null);
            }}
            sx={{ width: 220, marginTop: "20px", marginBottom: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <InputLabel>Select an end date:</InputLabel>
          <TextField
            required
            error={endDateError.length !== 0}
            helperText={endDateError}
            id="date"
            label="End Date"
            type="date"
            name="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setEndDateError("");
              setShowReport(false);
              setReportData(null);
            }}
            sx={{ width: 220, marginTop: "20px", marginBottom: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      {error && <p style={{ marginBottom: "20px", color: "red" }}>{error}</p>}
      <div className="buttonContainer">
        <Button
          onClick={handleViewReport}
          variant="contained"
          className="createBtn"
          disabled={loading}
        >
          View Report
        </Button>
        <Button
          onClick={handleDownload}
          variant="contained"
          className="createBtn"
          disabled={loading}
        >
          Download Report
        </Button>
      </div>

      {showReport && reportData && (
        <div className="reportDisplaySection">
          <div className="reportSection">
            <h3 className="reportSectionTitle">Invoices Report</h3>
            <ReportTable
              data={reportData.invoices}
              type="invoice"
              total={reportData.invoices.reduce(
                (sum, invoice) => sum + invoice.amountDue,
                0,
              )}
            />
          </div>

          <div className="reportSection">
            <h3 className="reportSectionTitle">Payments Report</h3>
            <ReportTable
              data={reportData.payments}
              type="payment"
              total={reportData.payments.reduce(
                (sum, payment) => sum + payment.amountPaid,
                0,
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ExcelReport;
