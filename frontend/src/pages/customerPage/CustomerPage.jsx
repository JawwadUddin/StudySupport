import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./customerPage.css";
import { getData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ErrorIcon from "@mui/icons-material/Error";

const CustomerPage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(""); // Possible values: 'fullName', 'overdueBalance'
  const [sortDirection, setSortDirection] = useState("asc"); // Possible values: 'asc', 'desc', 'none'
  const [balanceSummary, setBalanceSummary] = useState();

  const handleSortClick = (column) => {
    let newSortDirection;
    if (sortColumn === column && sortDirection === "asc") {
      newSortDirection = "desc";
    } else if (sortColumn === column && sortDirection === "desc") {
      newSortDirection = "none";
    } else {
      newSortDirection = "asc";
    }

    let sortedData = [...customers];
    if (newSortDirection !== "none") {
      sortedData.sort((a, b) => {
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

    setSortedData(sortedData);
    setSortColumn(column);
    setSortDirection(newSortDirection);
  };

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

  return (
    <div className="customerPageContainer">
      <h2 className="title">Customers</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">All Customers</div>
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
            <div className="item" style={{ backgroundColor: "#ff8000" }}>
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
            <div className="item" style={{ backgroundColor: "#0077C5" }}>
              <div className="amount">
                £
                {Number(
                  balanceSummary ? balanceSummary.openBalance : 0
                ).toFixed(2)}
              </div>
              <div className="text">
                {balanceSummary?.overdueBalance} OPEN INVOICES
              </div>
            </div>
            <div className="item" style={{ backgroundColor: "#BABEC5" }}>
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
                      (customer.fullName + customer.students)
                        .toString()
                        .toLowerCase()
                        .includes(query)
                    )
                  : sortedData
                ).map((customer) => {
                  return (
                    <tr
                      className="hoverable"
                      onClick={() =>
                        navigate(`/customers/detail/${customer.familyID}`, {
                          state: {
                            customerDetail: {
                              customerID: customer.familyID,
                              customerName: customer.fullName,
                              customerMobile: customer.mobile,
                            },
                            customers: sortedData.map((obj) => {
                              // Extract the desired keys from each object
                              const {
                                familyID,
                                fullName,
                                students,
                                overdueBalance,
                                mobile,
                                openBalance,
                              } = obj;

                              // Create a new object with the extracted keys
                              return {
                                familyID,
                                fullName,
                                students,
                                overdueBalance,
                                mobile,
                                openBalance,
                              };
                            }),
                          },
                        })
                      }
                    >
                      <td>
                        <div className="customerName">{customer.fullName}</div>
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
    </div>
  );
};

export default CustomerPage;
