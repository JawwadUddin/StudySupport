import { useParams } from "react-router-dom";
import "./customerInfo.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, deleteData } from "../../helpers/apiFunctions";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";

const CustomerInfo = () => {
  const [customerInfo, setCustomerInfo] = useState([]);
  const [query, setQuery] = useState("");
  let { customerID } = useParams();
  const navigate = useNavigate();
  const [customerDetail, setCustomerDetail] = useState("");
  const [customers, setCustomers] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

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

  useEffect(() => {
    try {
      if (customers.length !== 0 && customerID) {
        let customer = customers.find(
          (customer) => customer.familyID == customerID
        );
        if (customer) {
          let {
            firstName,
            lastName,
            mobile,
            overdueBalance,
            openBalance,
            students,
          } = customer;
          setCustomerDetail({
            firstName,
            lastName,
            mobile,
            overdueBalance,
            openBalance,
            students,
          });
        }
      }
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
      if (customerID) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [customerID, customers]);

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
      if (customers === "") fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [customers]);

  function getStatus(customer) {
    if (customer.status === "Paid") {
      return (
        <div className="statusComplete iconContainer">
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
          <div className="overdue iconContainer">
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
          <div className="overdue iconContainer">
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

  function openDeleteModal(id) {
    setOpenModal(true);
    setDeleteID(id);
  }

  function cancelDeleteModal() {
    setOpenModal(false);
    setDeleteID(null);
  }

  function handleDeleteInvoice() {
    //run delete request
    async function removeData() {
      await deleteData(
        `${process.env.REACT_APP_API_URL}/api/invoice/${deleteID}`
      );
    }
    removeData();

    setOpenModal(false);
    setDeleteID(null);
  }

  return (
    <div className="customerPageContainer">
      <h2 className="title">Customers</h2>
      <div className="listContainer">
        <div className="gridContainer">
          <div className="customerSidebar">
            <div className="search">
              <TextField
                className="text"
                id="standard-basic"
                sx={{ mt: 2 }}
                size="small"
                variant="outlined"
                label="Name"
                value={query}
                onChange={({ target: { value } }) =>
                  setQuery(value.toLowerCase())
                }
              />
            </div>
            <div className="customerSidebarContent">
              {customers.length !== 0
                ? (query
                    ? customers.filter((customer) =>
                        (
                          customer.firstName +
                          customer.lastName +
                          customer.students
                        )
                          .toString()
                          .toLowerCase()
                          .includes(query)
                      )
                    : customers
                  ).map((customer, index) => {
                    return (
                      <div
                        key={index}
                        className="customerSummary"
                        onClick={() =>
                          navigate(`/customers/detail/${customer.familyID}`)
                        }
                      >
                        <div className="customerName">
                          {customer.firstName + " " + customer.lastName}
                        </div>
                        <div className="studentNames">
                          Ref: {customer.students}
                        </div>
                        <div className="customerBalance">
                          £{Number(customer.overdueBalance).toFixed(2)}
                        </div>
                      </div>
                    );
                  })
                : "Error retrieving customers, please go back to the customers page and come back again"}
            </div>
          </div>
          <div className="customerMain">
            <div className="customerMainHeader">
              <div className="customerMainInfo">
                {customerDetail ? (
                  <>
                    <h1>
                      {customerDetail.firstName + " " + customerDetail.lastName}
                    </h1>
                    <p style={{ marginBottom: "10px" }}>
                      {customerDetail.students}
                    </p>
                    <span>{customerDetail.mobile}</span>
                  </>
                ) : null}
              </div>
              <div className="customerMainStage">
                <div className="customerMainButtons">
                  <Button
                    onClick={() =>
                      navigate("/invoices/new", {
                        state: { familyID: customerID },
                      })
                    }
                    variant="contained"
                    className="createBtn"
                  >
                    New Invoice
                  </Button>
                  <Button
                    onClick={() =>
                      navigate("/payments/new", {
                        state: { familyID: customerID },
                      })
                    }
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
                    <div className="amount">
                      £{Number(customerDetail.openBalance).toFixed(2)}
                    </div>
                    <div className="text">OPEN</div>
                  </div>
                  <div className="overdueSection">
                    <div className="amount">
                      £{Number(customerDetail.overdueBalance).toFixed(2)}
                    </div>
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
                  ? customerInfo.map((customer, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {customer.date.split("-").reverse().join("/")}
                          </td>
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
                              <div className="statusComplete iconContainer">
                                <CheckCircleIcon
                                  className="icon"
                                  sx={{ color: "#2ca01c", fontSize: "24px" }}
                                />
                                <div className="text">Closed</div>
                              </div>
                            )}
                          </td>
                          <td>
                            <IconButton
                              onClick={() => {
                                if (customer.type === "Invoice") {
                                  navigate(`/invoices/${customer.id}`);
                                } else {
                                  navigate(
                                    `/payments/${customerID}/${customer.date
                                      .split("-")
                                      .reverse()
                                      .join("-")}`,
                                    {
                                      state: {
                                        firstName: customerDetail.firstName,
                                        lastName: customerDetail.lastName,
                                      },
                                    }
                                  );
                                }
                              }}
                              aria-label="edit"
                              color="secondary"
                            >
                              <EditIcon />
                            </IconButton>
                            {customer.type === "Invoice" ? (
                              <IconButton
                                onClick={() => openDeleteModal(customer.id)}
                                aria-label="delete"
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openModal && (
        <div className="modalContainer">
          <div className="modal">
            <div className="modalTop">
              <IconButton
                onClick={() => cancelDeleteModal()}
                aria-label="delete"
                color="primary"
                className="modalExit"
              >
                <ClearIcon />
              </IconButton>
            </div>
            <div className="modalWarning">
              <ErrorOutlineIcon className="warningIcon" />
              <h1>Delete invoice?</h1>
              <p>
                This erases the invoice forever. You can’t undo this. <br />{" "}
                <br /> Any payments associated with this invoice will become
                unapplied rather than deleted.
              </p>
            </div>
            <div className="modalButtons">
              <Button
                variant="outlined"
                size="large"
                onClick={() => cancelDeleteModal()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={() => handleDeleteInvoice()}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerInfo;
