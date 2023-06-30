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
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/invoice/outstanding`
        );
        if (serverResponse.message === "OK") {
          setCustomers(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchData();
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
          {/* <div>
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
          </div> */}
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

        <table>
          <thead>
            <tr>
              <th>CUSTOMER</th>
              <th>PHONE</th>
              <th>EMAIL</th>
              <th>PENDING INVOICES</th>
              <th>OVERDUE BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {customers.length !== 0 ? (
              customers.map((customer) => {
                return (
                  <tr>
                    <th
                      onClick={() =>
                        navigate("/customers/detail", {
                          state: { customerID: customer.familyID },
                        })
                      }
                    >
                      {customer.fullName}
                    </th>
                    <th>{customer.mobile}</th>
                    <th>{customer.email}</th>
                    <th>
                      <ErrorIcon /> {customer.overdueInvoices} Overdue Invoice
                    </th>
                    <th>£{Number(customer.overdueBalance).toFixed(2)}</th>
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
  );
};

export default CustomerPage;
