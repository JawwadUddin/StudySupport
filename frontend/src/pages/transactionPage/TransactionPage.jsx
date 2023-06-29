import { useState, useEffect } from "react";
import "./transactionPage.css";
import { getData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "../../components/table/Table";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const TransactionPage = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [query, setQuery] = useState("");
  const [columnToQuery, setColumnToQuery] = useState("fullName");
  const [transactionType, setTransactionType] = useState("invoice");

  const handleChange = (e, newValue) => {
    setColumnToQuery("fullName");
    setQuery("");
    setTransactionType(newValue);
  };

  useEffect(() => {
    try {
      async function fetchInvoiceData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/invoice`
        );
        if (serverResponse.message === "OK") {
          setInvoices(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      async function fetchPaymentData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/payment`
        );
        if (serverResponse.message === "OK") {
          setPayments(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }

      fetchInvoiceData();
      fetchPaymentData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="invoicePageContainer">
      <h2 className="title">Transactions</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">All Transactions</div>
          <div>
            <Button
              onClick={() => navigate("/invoices/new")}
              variant="contained"
              className="createInvoiceBtn"
            >
              New Invoice
            </Button>
            <Button
              onClick={() => navigate("/payments/new")}
              variant="contained"
              className="createPaymentBtn"
              color="secondary"
              style={{ marginLeft: "20px" }}
            >
              New Payment
            </Button>
          </div>
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
          <Select
            id="select-search"
            value={columnToQuery}
            size="small"
            label="Search column"
            onChange={({ target: { value } }) => setColumnToQuery(value)}
          >
            <MenuItem value="fullName">Full Name</MenuItem>
            <MenuItem
              value={transactionType === "invoice" ? "amountDue" : "amountPaid"}
            >
              Amount
            </MenuItem>
          </Select>
        </div>

        <Tabs
          value={transactionType}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ marginBottom: "20px" }}
        >
          <Tab value="invoice" label="Invoices" />
          <Tab value="payment" label="Payments" />
        </Tabs>

        {transactionType === "invoice" ? (
          <Table
            data={
              query
                ? invoices.filter((invoice) =>
                    invoice[columnToQuery]
                      .toString()
                      .toLowerCase()
                      .includes(query)
                  )
                : invoices
            }
            type="invoice"
          />
        ) : (
          <Table
            data={
              query
                ? payments.filter((payment) =>
                    payment[columnToQuery]
                      .toString()
                      .toLowerCase()
                      .includes(query)
                  )
                : payments
            }
            type="payment"
          />
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
