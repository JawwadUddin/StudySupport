import { useState, useEffect } from "react";
import "./invoicePage.css";
import { getData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "../../components/table/Table";
import { useNavigate } from "react-router-dom";

const InvoicePage = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [query, setQuery] = useState("");
  const [columnToQuery, setColumnToQuery] = useState("fullName");

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/invoice`
        );
        if (serverResponse.message === "OK") {
          setInvoices(serverResponse.results.data);
          setRefresh(false);
        } else {
          throw Error(serverResponse.message);
        }
      }
      if (refresh) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  return (
    <div className="invoicePageContainer">
      <h2 className="title">Invoices</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">All Invoices</div>
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
            {/* <MenuItem value="address">Status</MenuItem> */}
            <MenuItem value="amountDue">Amount</MenuItem>
          </Select>
        </div>
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
      </div>
    </div>
  );
};

export default InvoicePage;
