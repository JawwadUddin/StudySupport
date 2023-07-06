import { useState, useEffect } from "react";
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

const PaymentForm = ({
  familyID,
  fullName,
  paymentDate,
  paymentInfo,
  paymentType,
}) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [familyDropdown, setFamilyDropdown] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    familyID: familyID || "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentType: "",
    outstandingTransactions: [],
    credit: 0,
  });
  const [formErrors, setFormErrors] = useState({});
  const [amountReceived, setAmountReceived] = useState(0);

  useEffect(() => {
    if (paymentInfo) {
      setEditMode(false);
      let updatedCredit =
        paymentInfo.find((transaction) => transaction.id === null)?.payment ||
        0;

      setDataToSubmit({
        familyID: familyID,
        paymentDate: paymentDate.split("-").reverse().join("-"),
        paymentType: paymentType,
        outstandingTransactions: paymentInfo,
        credit: updatedCredit,
      });

      setAmountReceived(
        paymentInfo.reduce((accumulator, transaction) => {
          return accumulator + Number(transaction.payment || 0);
        }, 0)
      );

      setFamilyDropdown([{ id: familyID, fullName: fullName }]);
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
        let serverResponse;

        if (paymentInfo) {
          console.log(dataToSubmit);
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
          navigate(-1, {
            replace: true,
          });
        } else {
          throw Error(serverResponse.message);
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
    _errors.amountReceived = message;

    cleanErrorObject(_errors);
    setFormErrors(_errors);
    let errorCount = Object.keys(_errors).length;
    return errorCount;
  };

  return (
    <div className="paymentForm">
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
                    {item.fullName}
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
            id="paymentDate"
            label="Payment Date"
            type="date"
            name="paymentDate"
            value={dataToSubmit.paymentDate}
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
            <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
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
            type="number"
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
                <TableRow>
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
                  variant="contained"
                  className="submitBtn"
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setEditMode(true)}
                variant="contained"
                color="secondary"
                className="editBtn"
              >
                Edit
              </Button>
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
              variant="contained"
              className="submitBtn"
            >
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
