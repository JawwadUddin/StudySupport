import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./paymentsPage.css";
import { getData } from "../../helpers/apiFunctions";
import TextField from "@mui/material/TextField";
import PaymentIcon from "@mui/icons-material/Payment";

const PaymentsPage = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [allMonths, setAllMonths] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    fetchPayments();
  }, [selectedMonth, allMonths]);

  const fetchPayments = async () => {
    try {
      const monthParam = allMonths ? "" : `?month=${selectedMonth}-01`;
      const serverResponse = await getData(
        `${process.env.REACT_APP_API_URL}/api/payment${monthParam}`,
      );
      if (serverResponse.message === "OK") {
        setPayments(serverResponse.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Group individual payment records into payment events by (familyID, paymentDate)
  const groupedPayments = useMemo(() => {
    const groups = {};
    payments.forEach((p) => {
      const key = `${p.familyID}_${p.paymentDate}`;
      if (!groups[key]) {
        groups[key] = {
          familyID: p.familyID,
          firstName: p.firstName,
          lastName: p.lastName,
          paymentDate: p.paymentDate,
          totalAmount: 0,
          invoiceCount: 0,
        };
      }
      groups[key].totalAmount += Number(p.amount) || 0;
      groups[key].invoiceCount += 1;
    });
    return Object.values(groups);
  }, [payments]);

  const handleSortClick = (column) => {
    let newDirection;
    if (sortColumn === column && sortDirection === "asc") {
      newDirection = "desc";
    } else if (sortColumn === column && sortDirection === "desc") {
      newDirection = "none";
    } else {
      newDirection = "asc";
    }
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortDirection === "asc"
        ? "\u25B2"
        : sortDirection === "desc"
          ? "\u25BC"
          : "\u2022";
    }
    return "\u2022";
  };

  const filteredAndSorted = useMemo(() => {
    let data = [...groupedPayments];

    // Filter by search query
    if (query) {
      data = data.filter((p) =>
        (p.firstName + " " + p.lastName).toLowerCase().includes(query),
      );
    }

    // Sort
    if (sortColumn && sortDirection !== "none") {
      data.sort((a, b) => {
        let valA, valB;
        switch (sortColumn) {
          case "date":
            valA = parseDate(a.paymentDate);
            valB = parseDate(b.paymentDate);
            return sortDirection === "asc" ? valA - valB : valB - valA;
          case "customer":
            valA = (a.firstName + " " + a.lastName).toLowerCase();
            valB = (b.firstName + " " + b.lastName).toLowerCase();
            return sortDirection === "asc"
              ? valA.localeCompare(valB)
              : valB.localeCompare(valA);
          case "invoices":
            return sortDirection === "asc"
              ? a.invoiceCount - b.invoiceCount
              : b.invoiceCount - a.invoiceCount;
          case "amount":
            return sortDirection === "asc"
              ? a.totalAmount - b.totalAmount
              : b.totalAmount - a.totalAmount;
          default:
            return 0;
        }
      });
    }

    return data;
  }, [groupedPayments, query, sortColumn, sortDirection]);

  // Parse dd/MM/yyyy date string to Date object for sorting
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    return new Date(0);
  };

  // Format the paymentDate for navigation (dd/MM/yyyy → yyyy-MM-dd)
  const formatDateForNav = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  // Summary calculations
  const summary = useMemo(() => {
    const displayed = filteredAndSorted;
    const totalReceived = displayed.reduce(
      (sum, p) => sum + p.totalAmount,
      0,
    );
    const totalInvoices = displayed.reduce(
      (sum, p) => sum + p.invoiceCount,
      0,
    );
    return {
      totalReceived,
      paymentCount: displayed.length,
      totalInvoices,
    };
  }, [filteredAndSorted]);

  return (
    <div className="paymentsPageContainer">
      <div className="pageHeader">
        <h2>Payments</h2>
        <div className="subtitle">
          View and manage all payment records
        </div>
      </div>

      <div className="controlsBar">
        <div className="monthPicker">
          <label>Month</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setAllMonths(false);
            }}
            disabled={allMonths}
          />
        </div>
        <button
          className={`allMonthsBtn ${allMonths ? "active" : ""}`}
          onClick={() => setAllMonths((prev) => !prev)}
        >
          All Months
        </button>

        <div className="searchField">
          <TextField
            size="small"
            variant="outlined"
            label="Search"
            value={query}
            onChange={({ target: { value } }) => setQuery(value.toLowerCase())}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                fontFamily: "'DM Sans', sans-serif",
              },
            }}
          />
        </div>
      </div>

      <div className="summaryStrip">
        <div className="summaryCard totalCard">
          <div className="cardValue">
            {"\u00A3"}
            {summary.totalReceived.toFixed(2)}
          </div>
          <div className="cardLabel">Total Received</div>
        </div>
        <div className="summaryCard countCard">
          <div className="cardValue">{summary.paymentCount}</div>
          <div className="cardLabel">
            Payment{summary.paymentCount !== 1 ? "s" : ""}
          </div>
        </div>
        <div className="summaryCard invoicesCard">
          <div className="cardValue">{summary.totalInvoices}</div>
          <div className="cardLabel">Invoices Covered</div>
        </div>
      </div>

      <div className="tableWrapper">
        <div className="tableScroll">
          <table>
            <thead>
              <tr>
                <th
                  className={`sortable ${sortColumn === "date" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("date")}
                >
                  Payment Date{" "}
                  <span className="sortIcon">{getSortIcon("date")}</span>
                </th>
                <th
                  className={`sortable ${sortColumn === "customer" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("customer")}
                >
                  Customer{" "}
                  <span className="sortIcon">{getSortIcon("customer")}</span>
                </th>
                <th
                  className={`sortable ${sortColumn === "invoices" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("invoices")}
                >
                  # Invoices{" "}
                  <span className="sortIcon">{getSortIcon("invoices")}</span>
                </th>
                <th
                  className={`sortable ${sortColumn === "amount" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("amount")}
                >
                  Amount{" "}
                  <span className="sortIcon">{getSortIcon("amount")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.length > 0 ? (
                filteredAndSorted.map((p) => (
                  <tr
                    key={`${p.familyID}_${p.paymentDate}`}
                    onClick={() =>
                      navigate(
                        `/payments/${p.familyID}/${formatDateForNav(p.paymentDate)}`,
                      )
                    }
                  >
                    <td className="dateCell">{p.paymentDate}</td>
                    <td>
                      <span className="customerName">{p.firstName} {p.lastName}</span>
                    </td>
                    <td className="invoiceCountCell">{p.invoiceCount}</td>
                    <td className="amountCell">
                      {"\u00A3"}
                      {p.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="emptyState">
                      <div className="emptyIcon">
                        <PaymentIcon sx={{ fontSize: 28, color: "var(--accent)" }} />
                      </div>
                      <p>No payments found</p>
                      <p className="emptyHint">Try selecting a different month or clearing your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
