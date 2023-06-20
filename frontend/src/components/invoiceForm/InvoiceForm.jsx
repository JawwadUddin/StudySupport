import { useState, useEffect } from "react";
import "./invoiceForm.css";
import { getData } from "../../helpers/apiFunctions";
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

const InvoiceForm = ({ invoiceInfo }) => {
  const [editScreen, setEditScreen] = useState(false);
  const [familyDropdown, setFamilyDropdown] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    familyID: "",
    fullName: "",
    address: "",
    postCode: "",
    mobile: "",
    email: "",
    invoiceDate: "",
    dueDate: "",
    startDate: "",
    amountDue: "",
    JSONInvoiceMisc: [],
  });
  const [sessions, setSessions] = useState();
  const [rate, setRate] = useState([]);

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (invoiceInfo) {
      setDataToSubmit({ ...invoiceInfo });
      setEditScreen(true);
      setFamilyDropdown([
        { id: dataToSubmit.familyID, fullName: dataToSubmit.fullName },
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
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  }, [invoiceInfo]);

  useEffect(() => {
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
      if (!invoiceInfo) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      async function fetchSessions() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/invoice/sessions/${dataToSubmit.familyID}/${dataToSubmit.startDate}`
        );
        if (serverResponse.message === "OK") {
          console.log("I have run to get the sessions");
          setSessions(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      if (dataToSubmit.familyID && dataToSubmit.startDate) {
        fetchSessions();
      }
    } catch (error) {
      console.log(error);
    }
  }, [dataToSubmit.startDate]);

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
    <div className="invoiceForm">
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
              disabled={invoiceInfo ? true : false}
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
        </Grid>
        <div
          style={{
            marginLeft: "24px",
            marginTop: "24px",
            display: "flex",
            gap: "20px",
          }}
        >
          <div>
            <h4>Billing Address</h4>
            <div className="contactInfo">
              {dataToSubmit.address} <br /> {dataToSubmit.postCode} <br />
            </div>
          </div>
          <div>
            <h4>Contact Number</h4>
            <div className="contactInfo">{dataToSubmit.mobile}</div>
          </div>

          <div>
            <h4>Customer Email</h4>
            <div className="contactInfo">{dataToSubmit.email}</div>
          </div>
        </div>
      </Grid>
      <h3>Key Dates</h3>
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12}>
          <TextField
            error={!!formErrors.invoiceDate}
            helperText={formErrors.invoiceDate}
            required
            id="invoiceDate"
            label="Invoice Date"
            type="date"
            name="invoiceDate"
            value={dataToSubmit.invoiceDate}
            onChange={addData}
            sx={{ backgroundColor: "white" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={!!formErrors.startDate}
            helperText={formErrors.startDate}
            required
            id="startDate"
            label="Start Date"
            type="date"
            name="startDate"
            value={dataToSubmit.startDate}
            onChange={addData}
            sx={{ backgroundColor: "white" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={!!formErrors.dueDate}
            helperText={formErrors.dueDate}
            required
            id="dueDate"
            label="Due Date"
            type="date"
            name="dueDate"
            value={dataToSubmit.dueDate}
            onChange={addData}
            sx={{ backgroundColor: "white" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <h3>Product Information</h3>
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
            <TableCell>STUDENT NAME</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>QTY</TableCell>
            <TableCell>RATE</TableCell>
            <TableCell>AMOUNT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions
            ? sessions.map((student) => {
                let QTY = 0;
                return (
                  <TableRow key={student.student_id}>
                    <TableCell>{student.full_name}</TableCell>
                    <TableCell>
                      {student.sessions ? (
                        student.sessions.map((studentSession) => {
                          QTY += studentSession.full_session ? 2 : 1;
                          return (
                            <div key={studentSession.student_session_id}>
                              {studentSession.session_date} -{" "}
                              {studentSession.full_session
                                ? "(2 hours)"
                                : "(1 hour)"}{" "}
                              <span>
                                {!studentSession.attendance && " - absent"}
                              </span>
                              <br />
                            </div>
                          );
                        })
                      ) : (
                        <h3 style={{ margin: 0, color: "#962626" }}>
                          The student has not booked any sessions this month
                        </h3>
                      )}
                    </TableCell>
                    <TableCell>{QTY}</TableCell>
                    <TableCell>
                      {/* <input type="number" value={student.rate} disabled /> */}
                      {student.rate}
                    </TableCell>
                    <TableCell>
                      {/* <input type="amount" value={QTY * student.rate} disabled /> */}
                      {QTY * student.rate}
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
          {dataToSubmit.JSONInvoiceMisc
            ? dataToSubmit.JSONInvoiceMisc.map((invoiceMisc) => {
                return (
                  <TableRow key={invoiceMisc.invoice_misc_id}>
                    <TableCell>Miscallaneous</TableCell>
                    <TableCell>{invoiceMisc.description}</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>{invoiceMisc.rate}</TableCell>
                    <TableCell>{invoiceMisc.rate}</TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
      <div>
        Total due -{" "}
        {dataToSubmit.amountDue +
          dataToSubmit.JSONInvoiceMisc.reduce(
            (accumulator, currentValue) => accumulator + currentValue.rate,
            0
          )}
      </div>
    </div>
  );
};

export default InvoiceForm;
