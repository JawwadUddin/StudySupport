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
              (query
                ? customers.filter((customer) =>
                    (customer.fullName + customer.students)
                      .toString()
                      .toLowerCase()
                      .includes(query)
                  )
                : customers
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
                          customers: customers.map((obj) => {
                            // Extract the desired keys from each object
                            const {
                              familyID,
                              fullName,
                              students,
                              overdueBalance,
                              mobile,
                            } = obj;

                            // Create a new object with the extracted keys
                            return {
                              familyID,
                              fullName,
                              students,
                              overdueBalance,
                              mobile,
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
