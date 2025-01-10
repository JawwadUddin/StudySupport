import { useState, useEffect, useRef } from "react";
import { getData, updateData, saveData } from "../../helpers/apiFunctions";
import { validateInputs } from "../../helpers/validateInput";
import "./paymentForm.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import logo from "../invoiceForm/studysupportlogo.png";

const PaymentForm = ({
  familyID,
  firstName,
  lastName,
  paymentDate,
  paymentInfo,
  paymentType,
}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [familyDropdown, setFamilyDropdown] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    familyID: familyID || "",
    paymentDate: new Date().toISOString().split("T")[0],
    newPaymentDate: new Date().toISOString().split("T")[0],
    paymentType: "",
    outstandingTransactions: [],
    credit: 0,
  });
  const [familyContactInfo, setFamilyContactInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postCode: "",
    mobile: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [amountReceived, setAmountReceived] = useState(0);

  const componentPrintRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentPrintRef.current,
    documentTitle: `${familyID}-${firstName + " " + lastName}`,
  });

  const styles = {
    page: {
      border: "solid 1px red",
    },
    company: {
      display: "flex",
      marginBottom: "10px",
      padding: "50px 50px 0px 50px",
      companyLogo: {
        width: "100px",
        height: "100px",
      },
      companyAddress: {
        marginLeft: "20px",
        fontSize: "13px",
      },
    },
    invoice: {
      padding: "0 50px",
      marginTop: "10px",
      fontSize: "13px",
      display: "flex",
      justifyContent: "space-between",
      recipient: {},
      dates: {},
    },
    details: {
      margin: "0 20px",
      width: "-webkit-fill-available",
      textAlign: "left",
      borderCollapse: "collapse",
      padding: "5px",
      position: "relative",
      fontSize: "13px",
      header: {
        border: "none",
        backgroundColor: "rgb(207 233 235)",
      },
    },
    horizontal: {
      border: "none",
      borderTop: "2px dotted rgb(191 178 178)",
      margin: "30px 50px 10px",
    },
    summary: {
      padding: "0 50px",
      display: "flex",
      message: {
        flex: 2,
        fontSize: "12px",
      },
      balance: {
        flex: 1,
        fontSize: "16px",
      },
    },
    sessions: {
      padding: "0 50px",
      display: "flex",
      gap: "40px",
      marginTop: "20px",
    },
    account: {
      position: "absolute",
      left: "50px",
      bottom: "50px",
      fontSize: "13px",
    },
  };

  useEffect(() => {
    if (paymentInfo) {
      setEditMode(false);
      let updatedCredit =
        paymentInfo.find((transaction) => transaction.id === null)?.payment ||
        0;

      setDataToSubmit({
        familyID: familyID,
        paymentDate: paymentDate.split("-").reverse().join("-"),
        newPaymentDate: paymentDate.split("-").reverse().join("-"),
        paymentType: paymentType,
        outstandingTransactions: paymentInfo,
        credit: updatedCredit,
      });

      setAmountReceived(
        paymentInfo.reduce((accumulator, transaction) => {
          return accumulator + Number(transaction.payment || 0);
        }, 0)
      );

      setFamilyDropdown([
        { id: familyID, firstName: firstName, lastName: lastName },
      ]);
    } else {
      try {
        async function fetchData() {
          const serverResponse = await getData(
            `${process.env.REACT_APP_API_URL}/api/family`
          );
          if (serverResponse.message === "OK") {
            setFamilyDropdown(serverResponse.results.data);
          } else {
            throw Error(serverResponse.message);
          }
        }
        if (familyDropdown.length === 0) {
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [paymentInfo]);

  useEffect(() => {
    try {
      async function fetchOutstandingInfo() {
        setLoading(true);
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/invoice/outstanding/${dataToSubmit.familyID}`
        );
        if (serverResponse.message === "OK") {
          setLoading(false);

          console.log("Obtaining outstanding transactions details");
          setDataToSubmit((prev) => ({
            ...prev,
            outstandingTransactions: serverResponse.results.data,
          }));
        } else {
          throw Error(serverResponse.message);
        }
      }
      if (dataToSubmit.familyID && !paymentInfo) {
        setEditMode(true);
        fetchOutstandingInfo();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [dataToSubmit.familyID]);

  useEffect(() => {
    try {
      async function fetchContactInfo() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/family/${dataToSubmit.familyID}`
        );
        if (serverResponse.message === "OK") {
          console.log("Obtaining contact details");
          let { firstName, lastName, address, postCode, mobile, email } =
            serverResponse.results.data;
          setFamilyContactInfo((prev) => ({
            ...prev,
            firstName: firstName,
            lastName: lastName,
            address: address,
            postCode: postCode,
            mobile: mobile,
            email: email,
          }));
        } else {
          throw Error(serverResponse.message);
        }
      }
      if (dataToSubmit.familyID) {
        fetchContactInfo();
      }
    } catch (error) {
      console.log(error);
    }
  }, [dataToSubmit.familyID]);

  console.log(familyContactInfo);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    if (amountReceived === "" || amountReceived === 0) {
      return;
    }
    let updatedData;
    if (dataToSubmit.outstandingTransactions.length !== 0) {
      updatedData = {
        ...dataToSubmit,
        credit: amountReceived,
      };
    }
    let remaining = amountReceived;
    const updatedTransactionsArray = dataToSubmit.outstandingTransactions.map(
      (transaction) => {
        if (remaining === 0) return { ...transaction, payment: 0 };
        const openBalance = transaction.amountDue - transaction.amountPaid;
        if (remaining > openBalance) {
          remaining -= openBalance;
          return { ...transaction, payment: openBalance };
        } else {
          let payment = remaining;
          remaining = 0;
          return { ...transaction, payment: payment };
        }
      }
    );
    updatedData = {
      ...dataToSubmit,
      outstandingTransactions: updatedTransactionsArray,
      credit: remaining,
    };
    setDataToSubmit((prev) => updatedData);
  }, [amountReceived]);

  const handleChange = (e, type) => {
    setFormErrors({});
    let updateData;
    if (type === "family") {
      updateData = {
        ...dataToSubmit,
        familyID: e.target.value,
      };
    }
    setDataToSubmit((prev) => updateData);
  };

  const addData = (e) => {
    setFormErrors({});
    const updatedData = {
      ...dataToSubmit,
      [e.target.name]: e.target.value,
    };
    setDataToSubmit((prev) => updatedData);
  };

  function updateInvoicePayment(invoice_id, e) {
    const payment = Number(e.target.value);
    let udpatedCredit = dataToSubmit.credit;

    const invoicePayments = dataToSubmit.outstandingTransactions.reduce(
      (accumulator, transaction) => {
        if (transaction.id === invoice_id || transaction.id === null)
          return accumulator;
        return accumulator + Number(transaction.payment || 0);
      },
      0
    );

    if (amountReceived < invoicePayments + payment) {
      return;
    }

    const updatedTransactions = dataToSubmit.outstandingTransactions.map(
      (transaction) => {
        if (transaction.id !== invoice_id) {
          return transaction;
        } else {
          if (payment > transaction.amountDue - transaction.amountPaid) {
            return transaction;
          }
          udpatedCredit = amountReceived - (invoicePayments + payment);
          return { ...transaction, payment: payment };
        }
      }
    );
    const updatedData = {
      ...dataToSubmit,
      outstandingTransactions: updatedTransactions,
      credit: udpatedCredit,
    };
    setDataToSubmit((prev) => updatedData);
  }

  function handleSubmit() {
    try {
      let errorCount;
      errorCount = validateForm(dataToSubmit);
      if (errorCount !== 0) {
        return;
      }
      async function submitData() {
        try {
          setLoadingSave(true);
          let serverResponse;
          if (paymentInfo) {
            serverResponse = await updateData(
              `${process.env.REACT_APP_API_URL}/api/payment/update`,
              dataToSubmit
            );
          } else {
            serverResponse = await saveData(
              `${process.env.REACT_APP_API_URL}/api/payment`,
              dataToSubmit
            );
          }
          if (serverResponse.message === "OK") {
            setLoadingSave(false);
            navigate(-1, {
              replace: true,
            });
          } else {
            setLoadingSave(false);
            throw Error(serverResponse.message);
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
      submitData();
    } catch (error) {
      console.log(error);
    }
  }

  function cancelChanges() {
    setEditMode(false);
    let updatedCredit =
      paymentInfo.find((transaction) => transaction.id === null)?.payment || 0;

    setDataToSubmit({
      familyID: familyID,
      paymentDate: paymentDate.split("-").reverse().join("-"),
      newPaymentDate: paymentDate.split("-").reverse().join("-"),
      outstandingTransactions: paymentInfo,
      credit: updatedCredit,
    });

    setAmountReceived(
      paymentInfo.reduce((accumulator, transaction) => {
        return accumulator + Number(transaction.payment || 0);
      }, 0)
    );
  }

  function cleanErrorObject(obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null) {
        delete obj[key];
      }
    });
  }
  const validateForm = (inputData) => {
    const _errors = {};
    _errors.familyID = validateInputs({
      data: inputData.familyID,
      required: true,
    });
    _errors.paymentDate = validateInputs({
      data: inputData.paymentDate,
      required: true,
    });
    _errors.paymentType = validateInputs({
      data: inputData.paymentType,
      required: true,
    });
    let message = null;
    if (amountReceived === 0 || amountReceived === "") {
      message = "This is a required field";
    }
    if (isNaN(amountReceived)) {
      message = "Amount received must be a number";
    }
    _errors.amountReceived = message;

    cleanErrorObject(_errors);
    setFormErrors(_errors);
    let errorCount = Object.keys(_errors).length;
    return errorCount;
  };

  return (
    <>
      <div className="paymentForm form">
        <h3>Customer Information</h3>
        <Grid container spacing={3} sx={{ marginBottom: 3 }}>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: 200, backgroundColor: "white" }}>
              <InputLabel id="demo-simple-select-label">Family</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="relation"
                error={!!formErrors.familyID}
                multiline
                value={dataToSubmit.familyID}
                onChange={(e) => handleChange(e, "family")}
                disabled={paymentInfo ? true : false}
              >
                {familyDropdown.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.firstName + " " + item.lastName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <div style={{ float: "right", textAlign: "right" }}>
              <h4>AMOUNT RECEIVED</h4>
              <h2> £{Number(amountReceived).toFixed(2)}</h2>
            </div>
          </Grid>
        </Grid>
        <h3>Key Dates</h3>
        <Grid container sx={{ marginBottom: 3 }}>
          <Grid item xs={12}>
            <TextField
              error={!!formErrors.paymentDate}
              helperText={formErrors.paymentDate}
              required
              id="newPaymentDate"
              label="Payment Date"
              type="date"
              name="newPaymentDate"
              value={dataToSubmit.newPaymentDate}
              onChange={addData}
              sx={{ backgroundColor: "white" }}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!editMode}
            />
          </Grid>
        </Grid>
        <h3>Key Dates</h3>
        <Grid
          container
          spacing={3}
          sx={{ marginBottom: 3 }}
          justifyContent="space-between"
        >
          <Grid item xs={4}>
            <FormControl sx={{ minWidth: 200, backgroundColor: "white" }}>
              <InputLabel id="demo-simple-select-label">
                Payment Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="paymentType"
                error={!!formErrors.paymentType}
                multiline
                value={dataToSubmit.paymentType}
                onChange={(e) =>
                  setDataToSubmit((prev) => ({
                    ...prev,
                    paymentType: e.target.value,
                  }))
                }
                disabled={!editMode}
              >
                <MenuItem value={"Cash"}>Cash</MenuItem>
                <MenuItem value={"Bank Transfer"}>Bank Transfer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              error={!!formErrors.amountReceived}
              helperText={formErrors.amountReceived}
              required
              id="amountReceived"
              label="Amount Received"
              name="amountReceived"
              value={amountReceived}
              onChange={(e) => setAmountReceived(e.target.value)}
              sx={{ backgroundColor: "white" }}
              disabled={!editMode}
            />
          </Grid>
        </Grid>
        <h3>Outstanding Transactions</h3>
        <Table
          sx={{
            backgroundColor: "white",
            outline: "solid 1px #962626",
            "& .MuiTableCell-head": {
              fontWeight: "800",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>DUE DATE</TableCell>
              <TableCell>ORIGINAL AMOUNT</TableCell>
              <TableCell>OPEN BALANCE</TableCell>
              <TableCell>PAYMENT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <CircularProgress />
            ) : dataToSubmit.outstandingTransactions.length !== 0 ? (
              dataToSubmit.outstandingTransactions.map((invoice) => {
                if (!invoice.id) return;
                return (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>
                      {invoice.dueDate.split("-").reverse().join("/")}
                    </TableCell>
                    <TableCell>{invoice.amountDue}</TableCell>
                    <TableCell>
                      {invoice.amountDue - invoice.amountPaid}
                    </TableCell>
                    <TableCell>
                      <TextField
                        error={!!formErrors.payment}
                        helperText={formErrors.payment}
                        required
                        id="payment"
                        label="Payment"
                        type="number"
                        value={invoice.payment || ""}
                        onChange={(e) => updateInvoicePayment(invoice.id, e)}
                        sx={{ backgroundColor: "white" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={!editMode}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : null}
          </TableBody>
        </Table>
        {dataToSubmit.familyID && (
          <>
            <div className="summary">
              <div className="summaryItem">
                <div className="summaryText">Amount to Apply</div>
                <div className="summaryValue">
                  £{Number(amountReceived).toFixed(2)}
                </div>
              </div>
              <div className="summaryItem">
                <div className="summaryText">Amount to Credit</div>
                <div className="summaryValue">
                  £{Number(dataToSubmit.credit).toFixed(2)}
                </div>
              </div>
            </div>
          </>
        )}
        {errorMessage && <h3 className="error">{errorMessage}</h3>}
        <div className="formEnd">
          {paymentInfo ? (
            <>
              {editMode ? (
                <>
                  <Button
                    onClick={() => cancelChanges()}
                    variant="outlined"
                    color="warning"
                    className="cancelBtn"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loadingSave}
                    variant="contained"
                    className="submitBtn"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="warning"
                    className="editBtn"
                    onClick={handlePrint}
                  >
                    PRINT
                  </Button>
                  <Button
                    onClick={() => setEditMode(true)}
                    variant="contained"
                    color="secondary"
                    className="editBtn"
                  >
                    Edit
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate(-1)}
                variant="outlined"
                color="warning"
                className="cancelBtn"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loadingSave}
                variant="contained"
                className="submitBtn"
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
      {paymentInfo && !editMode && (
        <div className="pdfView">
          <div size="A4" ref={componentPrintRef} className="page">
            <div style={styles.company}>
              <img style={styles.company.companyLogo} src={logo} alt="" />
              <div style={styles.company.companyAddress}>
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Study Support
                </span>
                <br />
                255 Commercial Road <br /> London <br /> E12BT <br />{" "}
                info@studysupportuk.com <br /> www.studysupportuk.com
              </div>
            </div>

            <h1
              style={{
                color: "rgb(48 177 178)",
                padding: "0 50px",
                fontWeight: "500",
                fontSize: "28px",
              }}
            >
              RECEIPT
            </h1>

            <div style={styles.invoice}>
              <div style={styles.invoice.recipient}>
                <span style={{ fontWeight: "bold" }}>RECEIEVED FROM</span>{" "}
                <br />
                {firstName + " " + lastName} <br />
                {familyContactInfo.address} <br /> {familyContactInfo.postCode}
              </div>

              <div style={styles.invoice.dates}>
                <table>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>DATE</td>
                    <td style={{ paddingLeft: "5px" }}>
                      {paymentDate.split("-").reverse().join("/")}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>PAYMENT METHOD</td>
                    <td style={{ paddingLeft: "5px" }}>{paymentType}</td>
                  </tr>
                </table>
              </div>
            </div>

            <div
              style={{
                border: "solid 0.5px rgb(48 177 178)",
                margin: "20px 50px 10px",
              }}
            ></div>

            <table style={styles.details}>
              <tr style={styles.details.header}>
                <th style={{ width: "25%", padding: "5px 30px" }}>
                  INVOICE NO.
                </th>
                <th>DUE DATE</th>
                <th>ORIGINAL AMOUNT</th>
                <th>BALANCE</th>
                <th>PAYMENT</th>
              </tr>
              {dataToSubmit.outstandingTransactions.length !== 0
                ? dataToSubmit.outstandingTransactions.map((invoice) => {
                    if (!invoice.id) return;
                    if (!invoice.payment || invoice.payment === 0) return;
                    return (
                      <tr key={invoice.id} style={{ paddingTop: "10px" }}>
                        <td style={{ paddingLeft: "30px", paddingTop: "10px" }}>
                          {invoice.id}
                        </td>
                        <td>
                          {invoice.dueDate.split("-").reverse().join("/")}
                        </td>
                        <td>{Number(invoice.amountDue).toFixed(2)}</td>
                        <td>
                          {Number(
                            invoice.amountDue - invoice.amountPaid
                          ).toFixed(2)}
                        </td>
                        <td>{Number(invoice.payment).toFixed(2)}</td>
                      </tr>
                    );
                  })
                : null}
            </table>

            <hr style={styles.horizontal} />

            <div style={styles.summary}>
              <div style={styles.summary.message}>
                Thank you for your continued commitment to us.
              </div>
              <div style={styles.summary.balance}>
                <table style={{ width: "100%" }}>
                  {dataToSubmit.amountPaid !== 0 ? (
                    <tr>
                      <td style={{ fontWeight: "bold" }}>AMOUNT CREDITED</td>
                      <td>£{Number(dataToSubmit.credit).toFixed(2)}</td>
                    </tr>
                  ) : null}
                  <tr>
                    <td style={{ fontWeight: "bold" }}>TOTAL</td>

                    <td>£{Number(amountReceived).toFixed(2)}</td>
                  </tr>
                </table>
              </div>
            </div>

            <div style={styles.account}>
              Account Details: <br /> Study Support <br /> Account Number:
              17084545 <br /> Sort Code: 04-06-05
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
