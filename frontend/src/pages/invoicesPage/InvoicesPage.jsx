import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./invoicesPage.css";
import { getData } from "../../helpers/apiFunctions";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import DescriptionIcon from "@mui/icons-material/Description";

const InvoicesPage = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showAll, setShowAll] = useState(false);
  const [allMonths, setAllMonths] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    fetchInvoices();
  }, [selectedMonth, allMonths]);

  const fetchInvoices = async () => {
    try {
      const monthParam = allMonths ? "" : `?month=${selectedMonth}-01`;
      const serverResponse = await getData(
        `${process.env.REACT_APP_API_URL}/api/invoice/detailed${monthParam}`,
      );
      if (serverResponse.message === "OK") {
        setInvoices(serverResponse.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    let data = [...invoices];

    // Filter by status
    if (!showAll) {
      data = data.filter((inv) => inv.status !== "Paid");
    }

    // Filter by search query
    if (query) {
      data = data.filter((inv) =>
        (inv.first_name + inv.last_name + inv.invoice_id)
          .toString()
          .toLowerCase()
          .includes(query),
      );
    }

    // Sort
    if (sortColumn && sortDirection !== "none") {
      data.sort((a, b) => {
        let valA, valB;
        switch (sortColumn) {
          case "invoiceId":
            valA = a.invoice_id;
            valB = b.invoice_id;
            return sortDirection === "asc" ? valA - valB : valB - valA;
          case "customer":
            valA = (a.first_name + " " + a.last_name).toLowerCase();
            valB = (b.first_name + " " + b.last_name).toLowerCase();
            return sortDirection === "asc"
              ? valA.localeCompare(valB)
              : valB.localeCompare(valA);
          case "startDate":
            valA = new Date(a.start_date);
            valB = new Date(b.start_date);
            return sortDirection === "asc" ? valA - valB : valB - valA;
          case "dueDate":
            valA = new Date(a.due_date);
            valB = new Date(b.due_date);
            return sortDirection === "asc" ? valA - valB : valB - valA;
          case "amountDue":
            return sortDirection === "asc"
              ? a.amount_due - b.amount_due
              : b.amount_due - a.amount_due;
          case "balance":
            return sortDirection === "asc"
              ? a.balance - b.balance
              : b.balance - a.balance;
          default:
            return 0;
        }
      });
    }

    return data;
  }, [invoices, showAll, query, sortColumn, sortDirection]);

  // Summary calculations
  const summary = useMemo(() => {
    const displayed = filteredAndSorted;
    const totalBalance = displayed.reduce(
      (sum, inv) => sum + Number(inv.balance),
      0,
    );
    const overdueBalance = displayed.reduce((sum, inv) => {
      const s = Number(inv.status);
      return sum + (inv.status !== "Paid" && s < 0 ? Number(inv.balance) : 0);
    }, 0);
    const paidCount = displayed.filter((inv) => inv.status === "Paid").length;
    return {
      totalBalance,
      overdueBalance,
      paidCount,
      totalCount: displayed.length,
    };
  }, [filteredAndSorted]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    if (status === "Paid") {
      return (
        <span className="statusBadge paid">
          <CheckCircleIcon sx={{ fontSize: 15 }} /> Paid
        </span>
      );
    }
    const days = Number(status);
    if (days < 0) {
      return (
        <span className="statusBadge overdue">
          <ErrorIcon sx={{ fontSize: 15 }} /> {Math.abs(days)}d overdue
        </span>
      );
    }
    if (days <= 7) {
      return <span className="statusBadge dueSoon">Due in {days}d</span>;
    }
    return <span className="statusBadge open">Due in {days}d</span>;
  };

  return (
    <div className="invoicesPageContainer">
      <div className="pageHeader">
        <h2>Invoices</h2>
        <div className="subtitle">
          View and manage all invoices across customers
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

        <div className="statusToggle">
          <button
            className={!showAll ? "active" : ""}
            onClick={() => setShowAll(false)}
          >
            Open
          </button>
          <button
            className={showAll ? "active" : ""}
            onClick={() => setShowAll(true)}
          >
            All
          </button>
        </div>

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
            {summary.totalBalance.toFixed(2)}
          </div>
          <div className="cardLabel">
            {summary.totalCount} Invoice{summary.totalCount !== 1 ? "s" : ""}{" "}
            Shown
          </div>
        </div>
        <div className="summaryCard overdueCard">
          <div className="cardValue">
            {"\u00A3"}
            {summary.overdueBalance.toFixed(2)}
          </div>
          <div className="cardLabel">Overdue Balance</div>
        </div>
        <div className="summaryCard paidCard">
          <div className="cardValue">{summary.paidCount}</div>
          <div className="cardLabel">Paid Invoices</div>
        </div>
      </div>

      <div className="tableWrapper">
        <div className="tableScroll">
          <table>
            <thead>
              <tr>
                <th
                  className={`sortable ${sortColumn === "invoiceId" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("invoiceId")}
                >
                  Invoice #{" "}
                  <span className="sortIcon">{getSortIcon("invoiceId")}</span>
                </th>
                <th
                  className={`sortable ${sortColumn === "customer" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("customer")}
                >
                  Customer{" "}
                  <span className="sortIcon">{getSortIcon("customer")}</span>
                </th>
                <th
                  className={`sortable ${sortColumn === "startDate" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("startDate")}
                >
                  Invoice Month{" "}
                  <span className="sortIcon">{getSortIcon("startDate")}</span>
                </th>
                <th
                  className={`sortable ${sortColumn === "dueDate" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("dueDate")}
                >
                  Due Date{" "}
                  <span className="sortIcon">{getSortIcon("dueDate")}</span>
                </th>
                <th
                  className={`sortable ${sortColumn === "amountDue" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("amountDue")}
                >
                  Amount Due{" "}
                  <span className="sortIcon">{getSortIcon("amountDue")}</span>
                </th>
                <th>Amount Paid</th>
                <th
                  className={`sortable ${sortColumn === "balance" ? "sortActive" : ""}`}
                  onClick={() => handleSortClick("balance")}
                >
                  Balance{" "}
                  <span className="sortIcon">{getSortIcon("balance")}</span>
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.length > 0 ? (
                filteredAndSorted.map((inv) => (
                  <tr
                    key={inv.invoice_id}
                    onClick={() => navigate(`/invoices/${inv.invoice_id}`)}
                  >
                    <td className="invoiceNum">#{inv.invoice_id}</td>
                    <td>
                      <div className="customerCell">
                        <span className="customerName">
                          {inv.first_name} {inv.last_name}
                        </span>
                      </div>
                    </td>
                    <td>{formatDate(inv.start_date)}</td>
                    <td>{formatDate(inv.due_date)}</td>
                    <td className="amountCell">
                      {"\u00A3"}
                      {Number(inv.amount_due).toFixed(2)}
                    </td>
                    <td className="amountCell">
                      {"\u00A3"}
                      {Number(inv.amount_paid).toFixed(2)}
                    </td>
                    <td
                      className={`balanceCell ${inv.balance > 0 ? "hasBalance" : ""}`}
                    >
                      {"\u00A3"}
                      {Number(inv.balance).toFixed(2)}
                    </td>
                    <td>{getStatusBadge(inv.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>
                    <div className="emptyState">
                      <div className="emptyIcon">
                        <DescriptionIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                      </div>
                      <p>No invoices found</p>
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

export default InvoicesPage;
