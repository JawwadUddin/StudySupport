import { useState, useEffect } from "react";
import "./invoiceForm.css";
import { getData, updateData, saveData } from "../../helpers/apiFunctions";
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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const InvoiceForm = ({ invoiceInfo }) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
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
    amountDue: 0,
    JSONInvoiceMisc: [],
  });
  const [sessions, setSessions] = useState();
  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [sessionsAmountDue, setSessionsAmountDue] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (invoiceInfo) {
      setDataToSubmit({ ...invoiceInfo });
      let amountDueMisc = 0;
      amountDueMisc += invoiceInfo.JSONInvoiceMisc?.reduce(
        (accumulator, invoiceMisc) => accumulator + Number(invoiceMisc.rate),
        0
      );
      setSessionsAmountDue(invoiceInfo.amountDue - amountDueMisc);
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
        if (familyDropdown.length === 0) {
          fetchData();
        }
        setEditMode(true);
      } catch (error) {
        console.log(error);
      }
    }
  }, [invoiceInfo]);

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

  useEffect(() => {
    try {
      async function fetchContactInfo() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/family/${dataToSubmit.familyID}`
        );
        if (serverResponse.message === "OK") {
          console.log("Obtaining contact details");
          let { fullName, address, postCode, mobile, email } =
            serverResponse.results.data;
          setDataToSubmit((prev) => ({
            ...prev,
            fullName: fullName,
            address: address,
            postCode: postCode,
            mobile: mobile,
            email: email,
            amountDue: 0,
          }));
        } else {
          throw Error(serverResponse.message);
        }
      }
      if (dataToSubmit.familyID) {
        fetchContactInfo();
        setSessions();
      }
    } catch (error) {
      console.log(error);
    }
  }, [dataToSubmit.familyID]);

  useEffect(() => {
    try {
      function updateAmountDue() {
        let amountDue = 0;
        sessions.map((student) => {
          let QTY =
            student.sessions?.reduce(
              (accumulator, studentSessions) =>
                accumulator + (studentSessions.full_session ? 2 : 1),
              0
            ) || 0;
          amountDue += QTY * student.rate;
        });
        setSessionsAmountDue(amountDue);
      }

      if (sessions && !invoiceInfo) {
        updateAmountDue();
      }
    } catch (error) {
      console.log(error);
    }
  }, [sessions]);

  useEffect(() => {
    try {
      function updateAmountDue() {
        let amountDueMisc = 0;
        amountDueMisc += dataToSubmit.JSONInvoiceMisc?.reduce(
          (accumulator, invoiceMisc) => accumulator + Number(invoiceMisc.rate),
          0
        );
        setDataToSubmit((prev) => ({
          ...prev,
          amountDue: sessionsAmountDue + amountDueMisc,
        }));
      }
      updateAmountDue();
    } catch (error) {
      console.log(error);
    }
  }, [dataToSubmit.JSONInvoiceMisc, sessionsAmountDue]);

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

  function handleAddMisc() {
    if (description === "" || rate === "") {
      return;
    }
    setDataToSubmit((prev) => ({
      ...prev,
      JSONInvoiceMisc: [...prev.JSONInvoiceMisc, { rate, description }],
    }));
    setDescription("");
    setRate("");
  }

  function editMiscMode(invoiceMisc) {
    setCurrentlyEditing(true);
    setDescription(invoiceMisc.description);
    setRate(invoiceMisc.rate);

    const updatedInvoiceMiscArray = dataToSubmit.JSONInvoiceMisc.map((item) => {
      if (!invoiceMisc.invoice_misc_id) {
        if (item !== invoiceMisc) {
          return item;
        } else {
          return { ...invoiceMisc, edit: true };
        }
      }
      if (item.invoice_misc_id !== invoiceMisc.invoice_misc_id) {
        return item;
      } else {
        return { ...invoiceMisc, edit: true };
      }
    });
    const updatedData = {
      ...dataToSubmit,
      JSONInvoiceMisc: updatedInvoiceMiscArray,
    };
    setDataToSubmit((prev) => updatedData);
  }

  function editMisc(invoiceMisc) {
    setCurrentlyEditing(false);

    const updatedInvoiceMiscArray = dataToSubmit.JSONInvoiceMisc.map((item) => {
      if (!invoiceMisc.invoice_misc_id) {
        if (item !== invoiceMisc) {
          return item;
        } else {
          return {
            ...invoiceMisc,
            edit: false,
            description: description,
            rate: rate,
          };
        }
      }
      if (item.invoice_misc_id !== invoiceMisc.invoice_misc_id) {
        return item;
      } else {
        return {
          ...invoiceMisc,
          edit: false,
          description: description,
          rate: rate,
        };
      }
    });
    const updatedData = {
      ...dataToSubmit,
      JSONInvoiceMisc: updatedInvoiceMiscArray,
    };
    setDataToSubmit((prev) => updatedData);
    setDescription("");
    setRate("");
  }

  function removeMisc(invoiceMisc) {
    const newInvoiceMiscArray = dataToSubmit.JSONInvoiceMisc.filter(
      (item) => item !== invoiceMisc
    );
    const updatedData = {
      ...dataToSubmit,
      JSONInvoiceMisc: newInvoiceMiscArray,
    };
    setDataToSubmit((prev) => updatedData);
  }

  const cancelEdit = (invoiceMisc) => {
    const updatedInvoiceMiscArray = dataToSubmit.JSONInvoiceMisc.map((item) => {
      if (!invoiceMisc.invoice_misc_id) {
        if (item !== invoiceMisc) {
          return item;
        } else {
          return { ...invoiceMisc, edit: false };
        }
      }
      if (item.invoice_misc_id !== invoiceMisc.invoice_misc_id) {
        return item;
      } else {
        return { ...invoiceMisc, edit: false };
      }
    });
    const updatedData = {
      ...dataToSubmit,
      JSONInvoiceMisc: updatedInvoiceMiscArray,
    };
    setDataToSubmit((prev) => updatedData);
    setCurrentlyEditing(false);
    setDescription("");
    setRate("");
  };

  function cancelChanges() {
    setEditMode(false);
    setDataToSubmit({ ...invoiceInfo });
    let amountDueMisc = 0;
    amountDueMisc += invoiceInfo.JSONInvoiceMisc?.reduce(
      (accumulator, invoiceMisc) => accumulator + Number(invoiceMisc.rate),
      0
    );
    setSessionsAmountDue(invoiceInfo.amountDue - amountDueMisc);
  }

  function handleSubmit() {
    try {
      async function submitData() {
        let serverResponse;
        if (invoiceInfo) {
          serverResponse = await updateData(
            `${process.env.REACT_APP_API_URL}/api/invoice/${invoiceInfo.id}`,
            dataToSubmit
          );
        } else {
          serverResponse = await saveData(
            `${process.env.REACT_APP_API_URL}/api/invoice`,
            dataToSubmit
          );
        }
        if (serverResponse.message === "OK") {
          if (invoiceInfo) {
            navigate(`/invoices`, {
              replace: true,
            });
          } else {
            const { newInvoiceID } = serverResponse.results.data;
            navigate(`/invoices/${newInvoiceID}`, {
              replace: true,
            });
          }
        } else {
          throw Error(serverResponse.message);
        }
      }
      submitData();
    } catch (error) {
      console.log(error);
    }
  }

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
            disabled={!editMode}
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
            disabled={!editMode || invoiceInfo}
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
            disabled={!editMode}
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
                let QTY =
                  student.sessions?.reduce(
                    (accumulator, studentSessions) =>
                      accumulator + (studentSessions.full_session ? 2 : 1),
                    0
                  ) || 0;
                return (
                  <TableRow key={student.student_id}>
                    <TableCell>{student.full_name}</TableCell>
                    <TableCell>
                      {student.sessions ? (
                        student.sessions.map((studentSession) => {
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
            ? dataToSubmit.JSONInvoiceMisc?.map((invoiceMisc, index) => {
                return (
                  <TableRow key={invoiceMisc.invoice_misc_id || index}>
                    <TableCell>
                      {editMode ? (
                        invoiceMisc.edit ? (
                          <>
                            <IconButton
                              onClick={() => cancelEdit(invoiceMisc)}
                              aria-label="cancel-edit"
                              color="error"
                            >
                              <CloseIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => editMisc(invoiceMisc)}
                              aria-label="confirm-edit"
                              color="success"
                            >
                              <CheckIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton
                              onClick={() => editMiscMode(invoiceMisc)}
                              aria-label="edit"
                              color="secondary"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => removeMisc(invoiceMisc)}
                              aria-label="delete"
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )
                      ) : null}{" "}
                    </TableCell>
                    {invoiceMisc.edit ? (
                      <>
                        <TableCell>
                          <TextField
                            error={!!formErrors.description}
                            required
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></TextField>
                        </TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>
                          <TextField
                            error={!!formErrors.rate}
                            required
                            id="rate"
                            type="number"
                            name="rate"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                          ></TextField>
                        </TableCell>
                        <TableCell>{invoiceMisc.rate}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{invoiceMisc.description}</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>{invoiceMisc.rate}</TableCell>
                        <TableCell>{invoiceMisc.rate}</TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })
            : null}
          {!currentlyEditing && editMode && (
            <TableRow>
              <TableCell>
                <Button onClick={handleAddMisc}>+</Button>
              </TableCell>
              <TableCell>
                <TextField
                  error={!!formErrors.description}
                  required
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></TextField>
              </TableCell>
              <TableCell>1</TableCell>
              <TableCell>
                <TextField
                  error={!!formErrors.rate}
                  required
                  id="rate"
                  type="number"
                  name="rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                ></TextField>
              </TableCell>
              <TableCell>{rate}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div>Balance Due - {dataToSubmit.amountDue}</div>
      <div className="formEnd">
        {invoiceInfo ? (
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
                variant="outlined"
                color="warning"
                className="editBtn"
              >
                Edit
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate("/invoices")}
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

export default InvoiceForm;
