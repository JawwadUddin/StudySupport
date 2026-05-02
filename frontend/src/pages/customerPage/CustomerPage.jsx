import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./customerPage.css";
import { getData, saveData } from "../../helpers/apiFunctions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Error";
import BulkCreateModal from "./BulkCreateModal";
import BulkResultsModal from "./BulkResultsModal";

const CustomerPage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(""); // Possible values: 'fullName', 'overdueBalance'
  const [sortDirection, setSortDirection] = useState("asc"); // Possible values: 'asc', 'desc', 'none'
  const [filterOverdue, setFilterOverdue] = useState(false);
  const [balanceSummary, setBalanceSummary] = useState();

  // Bulk create state
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkMonth, setBulkMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState("");
  const [bulkResults, setBulkResults] = useState(null);
  const [resultsModalOpen, setResultsModalOpen] = useState(false);

  const handleSortClick = (column) => {
    let newSortDirection;
    if (sortColumn === column && sortDirection === "asc") {
      newSortDirection = "desc";
    } else if (sortColumn === column && sortDirection === "desc") {
      newSortDirection = "none";
    } else {
      newSortDirection = "asc";
    }

    let sorted = [];

    if (filterOverdue) {
      sorted = [...sortedData];
    } else {
      sorted = [...customers];
    }

    if (newSortDirection !== "none") {
      sorted.sort((a, b) => {
        if (column === "fullName") {
          return newSortDirection === "asc"
            ? a.fullName.localeCompare(b.fullName)
            : b.fullName.localeCompare(a.fullName);
        } else if (column === "overdueBalance") {
          return newSortDirection === "asc"
            ? a.overdueBalance - b.overdueBalance
            : b.overdueBalance - a.overdueBalance;
        } else if (column === "overdueInvoices") {
          return newSortDirection === "asc"
            ? (a.overdueInvoices || 0) - (b.overdueInvoices || 0)
            : (b.overdueInvoices || 0) - (a.overdueInvoices || 0);
        }
        return 0;
      });
    }

    setSortedData(sorted);
    setSortColumn(column);
    setSortDirection(newSortDirection);
  };

  useEffect(() => {
    let filteredData = [...customers];
    if (filterOverdue) {
      setSortedData(
        filteredData.filter((item) => Number(item.overdueBalance) > 0)
      );
      return;
    }
    setSortedData(filteredData);
  }, [filterOverdue]);

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortDirection === "asc"
        ? "▲"
        : sortDirection === "desc"
        ? "▼"
        : "•";
    }
    return "•";
  };

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/invoice/outstanding`
        );
        if (serverResponse.message === "OK") {
          setCustomers(serverResponse.results.data);
          setSortedData(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      async function fetchBalanceSummary() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/invoice/balanceSummary`
        );
        if (serverResponse.message === "OK") {
          setBalanceSummary(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchData();
      fetchBalanceSummary();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleBulkCreate = async () => {
    if (!bulkMonth) return;
    setBulkLoading(true);
    setBulkError("");
    try {
      // bulkMonth is "YYYY-MM", convert to first day of month
      const startDate = `${bulkMonth}-01`;
      const serverResponse = await saveData(
        `${process.env.REACT_APP_API_URL}/api/invoice/bulk`,
        { startDate }
      );
      if (serverResponse.message === "OK") {
        setBulkResults(serverResponse.results.data);
        setBulkModalOpen(false);
        setResultsModalOpen(true);
      } else {
        setBulkError(serverResponse.message);
      }
    } catch (error) {
      setBulkError(error.message || "An error occurred");
    } finally {
      setBulkLoading(false);
    }
  };

  const handleCloseBulkModal = () => {
    setBulkModalOpen(false);
    setBulkError("");
  };

  const handleCloseResultsModal = () => {
    setResultsModalOpen(false);
    setBulkResults(null);
  };

  return (
    <div className="customerPageContainer">
      <h2 className="title">Customers</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">All Customers</div>
          <Button
            variant="contained"
            onClick={() => setBulkModalOpen(true)}
            sx={{ ml: "auto" }}
          >
            Bulk Create Invoices
          </Button>
        </div>
        <div className="search">
          <TextField
            className="text"
            id="standard-basic"
            sx={{ mr: 2 }}
            size="small"
            variant="outlined"
            label="Query"
            value={query}
            onChange={({ target: { value } }) => setQuery(value.toLowerCase())}
          />
        </div>
        <div className="container">
          <div className="balanceSummary">
            <div
              className="item hoverable"
              onClick={() => setFilterOverdue((prev) => !prev)}
              style={{ backgroundColor: "#ff8000" }}
            >
              <div className="amount">
                £
                {Number(
                  balanceSummary ? balanceSummary.overdueBalance : 0
                ).toFixed(2)}
              </div>
              <div className="text">
                {balanceSummary?.overdueInvoices} OVERDUE INVOICES
              </div>
            </div>
            <div
              className="item"
              style={{
                backgroundColor: filterOverdue ? "#0077C580" : "#0077C5",
              }}
            >
              <div className="amount">
                £
                {Number(
                  balanceSummary ? balanceSummary.openBalance : 0
                ).toFixed(2)}
              </div>
              <div className="text">
                {balanceSummary?.openInvoices} OPEN INVOICES
              </div>
            </div>
            <div
              className="item"
              style={{
                backgroundColor: filterOverdue ? "#BABEC5BF" : "#BABEC5",
              }}
            >
              <div className="amount">
                £
                {Number(
                  balanceSummary
                    ? balanceSummary.openBalance - balanceSummary.overdueBalance
                    : 0
                ).toFixed(2)}
              </div>
              <div className="text">NOT DUE YET</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th
                  className="sortable"
                  onClick={() => handleSortClick("fullName")}
                >
                  CUSTOMER {getSortIcon("fullName")}
                </th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th
                  className="sortable"
                  onClick={() => handleSortClick("overdueInvoices")}
                >
                  PENDING INVOICES {getSortIcon("overdueInvoices")}
                </th>
                <th
                  className="sortable"
                  onClick={() => handleSortClick("overdueBalance")}
                >
                  OVERDUE BALANCE {getSortIcon("overdueBalance")}
                </th>
                <th>OPEN BALANCE</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.length !== 0 ? (
                (query
                  ? sortedData.filter((customer) =>
                      (
                        customer.firstName +
                        customer.lastName +
                        customer.students
                      )
                        .toString()
                        .toLowerCase()
                        .includes(query)
                    )
                  : sortedData
                ).map((customer, index) => {
                  return (
                    <tr
                      key={index}
                      className="hoverable"
                      onClick={() =>
                        navigate(`/customers/detail/${customer.familyID}`)
                      }
                    >
                      <td>
                        <div className="customerName">
                          {customer.firstName + " " + customer.lastName}
                        </div>
                        <div className="studentNames">
                          Ref: {customer.students}
                        </div>
                      </td>
                      <td>{customer.mobile}</td>
                      <td>{customer.email}</td>
                      <td>
                        {customer.overdueInvoices ? (
                          <div className="overdueInvoice">
                            <ErrorIcon sx={{ color: "#da4647" }} />{" "}
                            <span style={{ color: "#0075c5" }}>
                              {customer.overdueInvoices} Overdue Invoice
                            </span>
                          </div>
                        ) : null}
                      </td>
                      <td>£{Number(customer.overdueBalance).toFixed(2)}</td>
                      <td>£{Number(customer.openBalance).toFixed(2)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {bulkModalOpen && (
        <BulkCreateModal
          bulkMonth={bulkMonth}
          onMonthChange={setBulkMonth}
          onClose={handleCloseBulkModal}
          onSubmit={handleBulkCreate}
          bulkLoading={bulkLoading}
          bulkError={bulkError}
        />
      )}

      {resultsModalOpen && (
        <BulkResultsModal
          bulkResults={bulkResults}
          onClose={handleCloseResultsModal}
        />
      )}
    </div>
  );
};

export default CustomerPage;
