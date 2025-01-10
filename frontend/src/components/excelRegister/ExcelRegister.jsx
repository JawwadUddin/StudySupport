import React, { useState } from "react";
import { Button } from "@mui/material";
import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

const ExcelRegister = ({ register, sessionDate }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };

  function handleDownload() {
    try {
      setLoading(true);

      // Create a new workbook
      // const workbook = XLSX.utils.book_new();
      const workbook = XLSX.utils.book_new();
      const data = [];
      const maxTablesPerRow = 8;
      const gapBetweenRows = 2;
      const gapBetweenCols = 0;
      const tableColumnSize = 4;
      // Array to store merge configurations
      const merges = [];

      data.push([{ v: "Study Support", t: "s" }]);
      data.push([]);
      data.push([{ v: "Attendance Register", t: "s" }]);
      data.push([]);
      data.push([
        { v: "Date", t: "s" },
        { v: sessionDate, t: "s" },
      ]);

      // Add a blank row after the session date
      data.push([]);

      register.forEach((session) => {
        // Calculate the total number of columns for the tables in this session
        const totalColumns =
          (gapBetweenCols + tableColumnSize) * maxTablesPerRow - gapBetweenCols;

        // Add session time as a centered header row
        const sessionRowIndex = data.length;
        data.push([{ v: session.session_time, t: "s" }]); // Initial cell for session time
        merges.push({
          s: { r: sessionRowIndex, c: 0 }, // Start of merge (row and column)
          e: { r: sessionRowIndex, c: totalColumns - 1 }, // End of merge (row and column)
        });

        // Style for session time
        data[sessionRowIndex][0].s = {
          font: { bold: true },
          alignment: { horizontal: "center", vertical: "center" },
        };
        data.push([]);

        let sessionRowStart = data.length;

        // To track current column index within a row for tables
        let currentColumn = 0;
        session.tables.forEach((table, index) => {
          let childNo = 1;

          // Ensure there's enough space in the data array for this row
          if (!data[sessionRowStart]) {
            data[sessionRowStart] = [];
          }

          // Add the table header at the current column
          data[sessionRowStart][currentColumn] = {
            v: "Table " + table.session_table,
            t: "s",
            s: {
              font: { bold: true },
              alignment: { horizontal: "center", vertical: "center" },
            },
          };

          // Add a merge configuration for the table header
          merges.push({
            s: { r: sessionRowStart, c: currentColumn }, // Start row and column
            e: { r: sessionRowStart, c: currentColumn + 1 }, // End row and column
          });

          // Add student names underneath the table header
          table.students.forEach((student, studentIndex) => {
            // Ensure the row exists
            if (!data[sessionRowStart + studentIndex + 1]) {
              data[sessionRowStart + studentIndex + 1] = [];
              data[sessionRowStart + studentIndex + 1][currentColumn] = {
                v: "Tutor ",
                t: "s",
              };
              data[sessionRowStart + studentIndex + 1][currentColumn + 1] = {
                v: "Mo ",
                t: "s",
              };
            }
            if (!data[sessionRowStart + studentIndex + 2]) {
              data[sessionRowStart + studentIndex + 2] = [];
              data[sessionRowStart + studentIndex + 2][currentColumn] = {
                v: "No",
                t: "s",
              };
              data[sessionRowStart + studentIndex + 2][currentColumn + 2] = {
                v: "ATT",
                t: "s",
              };
              data[sessionRowStart + studentIndex + 2][currentColumn + 3] = {
                v: "INV",
                t: "s",
              };
            }
            if (!data[sessionRowStart + studentIndex + 3]) {
              data[sessionRowStart + studentIndex + 3] = [];
            }

            data[sessionRowStart + studentIndex + 3][currentColumn] = {
              v: "Child " + childNo,
              t: "s",
            };
            data[sessionRowStart + studentIndex + 3][currentColumn + 1] = {
              v: student.firstName + ` (Yr ${student.schoolYear})`,
              t: "s",
            };

            childNo++;
          });

          // Move to the next column for the next table
          currentColumn += gapBetweenCols + tableColumnSize;
          // If maxTablesPerRow tables have been added, add a gap and move to the next row
          if ((index + 1) % maxTablesPerRow === 0) {
            currentColumn = 0; // Reset column for the new row
            sessionRowStart = data.length + gapBetweenRows; // Move to the next row
            for (let i = 0; i < gapBetweenRows; i++) {
              data.push([]); // Add empty rows as a gap
            }
          }
        });

        // Add a blank row before the next session
        data.push([]);
        data.push([]);
      });

      // Create worksheet
      const sheet = XLSX.utils.aoa_to_sheet(data);
      sheet["!merges"] = merges;

      let columnWidths = [];

      for (let i = 0; i <= maxTablesPerRow; i++) {
        columnWidths.push({ wch: 5 });
        columnWidths.push({ wch: 20 });
        columnWidths.push({ wch: 5 });
        columnWidths.push({ wch: 5 });
      }

      // Apply column widths to the sheet
      sheet["!cols"] = columnWidths;

      // Append the sheet to the workbook
      XLSX.utils.book_append_sheet(workbook, sheet, "Register");

      // Write the workbook to a binary string
      const wbout = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary",
      });

      // Convert binary string to Blob and download
      const blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream",
      });

      saveAs(blob, "Register.xlsx");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <Button
      style={{
        marginTop: "40px",
        marginRight: "auto",
        color: "primary",
      }}
      onClick={handleDownload}
      variant="outlined"
      disabled={loading}
    >
      Download Register
    </Button>
  );
};

export default ExcelRegister;
