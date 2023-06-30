import { useLocation } from "react-router-dom";
import "./customerInfo.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CustomerInfo = () => {
  const [customerInfo, setCustomerInfo] = useState([]);
  const [query, setQuery] = useState("");
  const { state } = useLocation();

  const [customerID, setCustomerID] = useState(state.customerID);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/customer/${customerID}`
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
  }, [customerID]);

  function getStatus(customer) {
    if (customer.status === "Paid") return "Paid";
    if (customer.status < 0) {
      if (customer.amountPaid !== 0) {
        return (
          "Overdue " +
          customer.status +
          " days " +
          "Partially paid, £" +
          (customer.amountDue - customer.amountPaid)
        );
      } else {
        return "Overdue " + customer.status + " days ";
      }
    }
    if (customer.status > 0) {
      if (customer.amountPaid !== 0) {
        return (
          "Due in -" +
          customer.status +
          " days " +
          "Partially paid, £" +
          (customer.amountDue - customer.amountPaid)
        );
      } else {
        return "Due in -" + customer.status + " days ";
      }
    }
    if (customer.status === 0) {
      if (customer.amountPaid !== 0) {
        return (
          "Due today" +
          "Partially paid, £" +
          (customer.amountDue - customer.amountPaid)
        );
      } else {
        return "Due today ";
      }
    }
  }

  return (
    <div className="customerPageContainer">
      <h2 className="title">Customers</h2>
      <div className="listContainer">
        <div className="gridContainer">
          <div className="customerSidebar"></div>
          <div className="customerMain"></div>
          <div className="customerInfo">
            <table>
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>TYPE</th>
                  <th>NO.</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {customerInfo.length !== 0
                  ? customerInfo.map((customer) => {
                      return (
                        <tr>
                          <td>{customer.date}</td>
                          <td>{customer.type}</td>
                          <td>{customer.id}</td>
                          <td>
                            {customer.type === "Invoice"
                              ? customer.amountDue
                              : customer.amountPaid}
                          </td>
                          <td>
                            {customer.type === "Invoice"
                              ? getStatus(customer)
                              : customer.credit
                              ? "Paid £" +
                                (customer.amountPaid - customer.credit) +
                                " credit"
                              : "Closed"}
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
