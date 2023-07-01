import { useLocation } from "react-router-dom";
import "./customerInfo.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CustomerInfo = () => {
  const [customerInfo, setCustomerInfo] = useState([]);
  const [query, setQuery] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const [customerDetail, setCustomerDetail] = useState(state.customerDetail);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/customer/${customerDetail.customerID}`
        );
        if (serverResponse.message === "OK") {
          setCustomerInfo(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [customerDetail.customerID]);

  function getStatus(customer) {
    if (customer.status === "Paid") {
      return (
        <div className="statusComplete">
          <CheckCircleIcon
            className="icon"
            sx={{ color: "#2ca01c", fontSize: "24px" }}
          />
          <div className="text">Paid</div>
        </div>
      );
    }
    if (customer.status < 0) {
      if (customer.amountPaid !== 0) {
        return (
          <div className="overdue">
            <ErrorOutlineIcon
              className="icon"
              sx={{ color: "#ff9331", fontSize: "24px" }}
            />
            <div className="statusPartial">
              <div className="text">Overdue {-customer.status} days</div>
              <div className="credit">
                Partially paid, £
                {Number(customer.amountDue - customer.amountPaid).toFixed(2)}{" "}
                due
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="overdue">
            <ErrorOutlineIcon
              className="icon"
              sx={{ color: "#ff9331", fontSize: "24px" }}
            />
            <div className="text">Overdue {-customer.status} days</div>
          </div>
        );
      }
    }
    if (customer.status > 0) {
      if (customer.amountPaid !== 0) {
        return (
          <div className="statusPartial">
            <div className="text">Due in {customer.status} days</div>
            <div className="credit">
              Partially paid, £
              {Number(customer.amountDue - customer.amountPaid).toFixed(2)}
            </div>
          </div>
        );
      } else {
        return <div className="text">Due in {customer.status} days</div>;
      }
    }
    if (customer.status === 0) {
      if (customer.amountPaid !== 0) {
        return (
          <h1>
            "Due today" + "Partially paid, £" +
            {customer.amountDue - customer.amountPaid}
          </h1>
        );
      } else {
        return <h1>Due today</h1>;
      }
    }
  }

  return (
    <div className="customerPageContainer">
      <h2 className="title">Customers</h2>
      <div className="listContainer">
        <div className="gridContainer">
          <div className="customerSidebar"></div>
          <div className="customerMain">
            <div className="customerMainHeader">
              <div className="customerMainInfo">
                <h1>{customerDetail.customerName}</h1>
                <span>{customerDetail.customerMobile}</span>
              </div>
              <div className="customerMainStage">
                <div className="customerMainButtons">
                  <Button
                    onClick={() => navigate("/invoices/new")}
                    variant="contained"
                    // className="createInvoiceBtn"
                    className="createBtn"
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
                <div className="customerMainSum">
                  <div className="openSection">
                    <div className="amount">£21.00</div>
                    <div className="text">OPEN</div>
                  </div>
                  <div className="overdueSection">
                    <div className="amount">£5.00</div>
                    <div className="text">OVERDUE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="customerInfo">
            <table>
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>TYPE</th>
                  <th>NO.</th>
                  <th style={{ textAlign: "right" }}>AMOUNT</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {customerInfo.length !== 0
                  ? customerInfo.map((customer) => {
                      return (
                        <tr
                          onClick={() => {
                            if (customer.type === "Invoice") {
                              navigate(`/invoices/${customer.id}`);
                            } else {
                              navigate(
                                `/payments/${
                                  customerDetail.customerID
                                }/${customer.date.split("/").join("-")}`
                              );
                            }
                          }}
                        >
                          <td>{customer.date}</td>
                          <td>{customer.type}</td>
                          <td>{customer.id}</td>
                          <td style={{ textAlign: "right" }}>
                            {customer.type === "Invoice" ? "£" : "-£"}
                            {Number(
                              customer.type === "Invoice"
                                ? customer.amountDue
                                : customer.amountPaid
                            ).toFixed(2)}
                          </td>
                          <td>
                            {customer.type === "Invoice" ? (
                              getStatus(customer)
                            ) : customer.credit ? (
                              <div className="statusPartial">
                                <div className="text">Paid</div>
                                <div className="credit">
                                  £{customer.credit} credit
                                </div>
                              </div>
                            ) : (
                              <div className="statusComplete">
                                <CheckCircleIcon
                                  className="icon"
                                  sx={{ color: "#2ca01c", fontSize: "24px" }}
                                />
                                <div className="text">Closed</div>
                              </div>
                            )}
                          </td>
                          <td></td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
