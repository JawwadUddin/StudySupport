import { useState, useEffect } from "react";
import { getData, updateData, saveData } from "../../helpers/apiFunctions";
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

const PaymentForm = ({ paymentInfo }) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(
    paymentInfo ? true : false
  );
  const [familyDropdown, setFamilyDropdown] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    familyID: "",
    paymentDate: "",
    outstandingTransactions: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [amountReceived, setAmountReceived] = useState(0);
  useEffect(() => {
    if (paymentInfo) {
      //   setDataToSubmit({ ...invoiceInfo });
      //   let amountDueMisc = 0;
      //   amountDueMisc += invoiceInfo.JSONInvoiceMisc?.reduce(
      //     (accumulator, invoiceMisc) => accumulator + Number(invoiceMisc.rate),
      //     0
      //   );
      //   setFamilyDropdown([
      //     { id: dataToSubmit.familyID, fullName: dataToSubmit.fullName },
      //   ]);
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
        setEditMode(true);
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
        fetchOutstandingInfo();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [dataToSubmit.familyID]);

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
      <Grid
        container
        spacing={3}
        sx={{ marginBottom: 3 }}
        justifyContent="space-between"
      >
        <Grid item xs={4}>
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
              return (
                <TableRow>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
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
                      // value={student.rateInfo ? student.rateInfo[0].rate : ""}
                      // onChange={(e) =>
                      //   updateStudentRate(student.student_id, e)
                      // }
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
              <div className="summaryValue">sort out later</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentForm;
