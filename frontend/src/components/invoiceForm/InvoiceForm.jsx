import { useState, useEffect, useRef } from "react";
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
import { validateInputs } from "../../helpers/validateInput";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import logo from "./studysupportlogo.png";

const InvoiceForm = ({ invoiceInfo, familyID }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [familyDropdown, setFamilyDropdown] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState({
    familyID: familyID || "",
    firstName: "",
    lastName: "",
    address: "",
    postCode: "",
    mobile: "",
    email: "",
    invoiceDate: "",
    dueDate: "",
    startDate: "",
    amountDue: 0,
    amountPaid: 0,
    JSONInvoiceMisc: [],
  });
  const [sessions, setSessions] = useState();
  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [sessionsAmountDue, setSessionsAmountDue] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [invoiceSummary, setInvoiceSummary] = useState([]);
  const componentPrintRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentPrintRef.current,
    documentTitle: `${invoiceInfo?.id}-${invoiceInfo?.familyID}-${invoiceInfo?.firstName + ' ' + invoiceInfo?.lastName}`
  });

  const styles = {
    page: {
      border: "solid 1px red",
    },
    company: {
      display: "flex",
      marginBottom: "30px",
      padding: "50px 50px 0px 50px",
      companyLogo: {
        width: "100px",
        height: "100px",
      },
      companyAddress: {
        marginLeft: "20px",
      },
    },
    invoice: {
      padding: "0 50px",
      marginTop: "20px",
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
      header: {
        border: "none",
        backgroundColor: "rgb(207 233 235)",
      },
    },
    horizontal: {
      border: "none",
      borderTop: "3px dotted rgb(191 178 178)",
      margin: "30px 50px",
    },
    summary: {
      padding: "0 50px",
      display: "flex",
      message: {
        flex: 2,
        fontSize: "14px",
      },
      balance: {
        flex: 1,
      },
    },
    account: {
      position: "absolute",
      left: "50px",
      bottom: "50px",
    },
  };

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
        { id: dataToSubmit.familyID, firstName: dataToSubmit.firstName, lastName: dataToSubmit.lastName },
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
        setDataToSubmit((prev) => ({
          ...prev,
          dueDate: new Date(
            new Date(prev.startDate).getTime() + 14 * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0],
        }));
        fetchSessions();
      }
    } catch (error) {
      console.log(error);
    }
  }, [dataToSubmit.startDate]);

  useEffect(() => {
    try {
      function updateAmountDue() {
        let amountDue = 0;
        console.log("updating the sessionsAmount");
        sessions.map((student) => {
          let QTY =
            student.sessions?.reduce(
              (accumulator, studentSessions) =>
                accumulator + (studentSessions.full_session ? 2 : 1),
              0
            ) || 0;
          amountDue += QTY * (student.rateInfo ? student.rateInfo[0].rate : 0);
        });
        setSessionsAmountDue(amountDue);
      }

      if (sessions) {
        updateAmountDue();
      }
    } catch (error) {
      console.log(error);
    }
  }, [sessions]);

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
          setDataToSubmit((prev) => ({
            ...prev,
            firstName: firstName,
            lastName: lastName,
            address: address,
            postCode: postCode,
            mobile: mobile,
            email: email,
            amountDue: 0,
            startDate: "",
          }));
        } else {
          throw Error(serverResponse.message);
        }
      }
      if (dataToSubmit.familyID && !invoiceInfo) {
        fetchContactInfo();
        setSessions(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dataToSubmit.familyID]);

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
      let errorCount;
      errorCount = validateForm(dataToSubmit);
      if (errorCount !== 0) {
        return;
      }
      async function submitData() {
        try {
          let serverResponse;
          let JSONRateInfo = [];
          sessions &&
            sessions.map((item) => {
              return JSONRateInfo.push(...item.rateInfo);
            });

          if (invoiceInfo) {
            console.log(invoiceInfo);
            serverResponse = await updateData(
              `${process.env.REACT_APP_API_URL}/api/invoice/${invoiceInfo.id}`,
              { ...dataToSubmit, JSONRateInfo }
            );
          } else {
            serverResponse = await saveData(
              `${process.env.REACT_APP_API_URL}/api/invoice`,
              { ...dataToSubmit, JSONRateInfo }
            );
          }
          if (serverResponse.message === "OK") {
            if (invoiceInfo) {
              navigate(-1, {
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
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
      submitData();
    } catch (error) {
      console.log(error);
    }
  }

  function updateStudentRate(studentID, e) {
    const rateValue = e.target.value;
    if (!studentID) return;

    const updatedSessions = sessions.map((student) => {
      if (student.student_id !== studentID) {
        return student;
      } else if (!student.rateInfo) {
        return {
          ...student,
          rateInfo: [
            {
              student_id: studentID,
              rate: rateValue,
            },
          ],
        };
      } else {
        return {
          ...student,
          rateInfo: [
            {
              ...student.rateInfo[0],
              student_id: studentID,
              rate: rateValue,
            },
          ],
        };
      }
    });
    setSessions((prev) => updatedSessions);
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
    _errors.invoiceDate = validateInputs({
      data: inputData.invoiceDate,
      required: true,
    });
    _errors.startDate = validateInputs({
      data: inputData.startDate,
      required: true,
    });
    _errors.dueDate = validateInputs({
      data: inputData.dueDate,
      required: true,
    });
    let message = null;
    if (sessions) {
      for (let i = 0; i < sessions.length; i++) {
        if (!sessions[i].rateInfo || sessions[i].rateInfo[0].rate === "") {
          message = "This is a required field";
          break;
        }
      }
    }
    _errors.rate = message;

    cleanErrorObject(_errors);
    setFormErrors(_errors);
    let errorCount = Object.keys(_errors).length;
    return errorCount;
  };

  return (
    <>
      <div className="invoiceForm form" style={{ position: "relative" }}>
        <h3>Customer Information</h3>
        {dataToSubmit.amountDue !== 0 &&
        dataToSubmit.amountDue - dataToSubmit.amountPaid === 0 ? (
          <div className="paymentStatus">
            <div
              style={{
                fontWeight: 600,
                color: "#6b6c72",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              PAYMENT STATUS
            </div>
            <div
              style={{
                fontWeight: 600,
                color: "#6b6c72",
                fontSize: "4.8rem",
                textAlign: "center",
              }}
            >
              PAID
            </div>
          </div>
        ) : null}
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
                      {item.firstName + ' ' + item.lastName}
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
              disabled={!editMode || invoiceInfo ? true : false}
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
                      <TableCell>{student.firstName + ' ' + student.lastName}</TableCell>
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
                        <TextField
                          error={!!formErrors.rate}
                          helperText={formErrors.rate}
                          required
                          id="rate"
                          label="Rate"
                          type="number"
                          value={
                            student.rateInfo ? student.rateInfo[0].rate : ""
                          }
                          onChange={(e) =>
                            updateStudentRate(student.student_id, e)
                          }
                          sx={{ backgroundColor: "white" }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          disabled={!editMode}
                        />
                      </TableCell>
                      <TableCell>
                        {student.rateInfo ? QTY * student.rateInfo[0].rate : 0}
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
                    // error={!!formErrors.description}
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
                    // error={!!formErrors.rate}
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
        <div className="summary">
          <div className="summaryItem">
            <div className="summaryText">Total</div>
            <div className="summaryValue">
              £{Number(dataToSubmit.amountDue).toFixed(2)}
            </div>
          </div>
          {invoiceInfo && (
            <>
              <div className="summaryItem">
                <div className="summaryText">Amount Received</div>
                <div className="summaryValue">
                  £{Number(dataToSubmit.amountPaid).toFixed(2)}
                </div>
              </div>
              <div className="summaryItem">
                <div className="summaryText">Balance Due</div>
                <div className="summaryValue">
                  £
                  {Number(
                    dataToSubmit.amountDue - dataToSubmit.amountPaid
                  ).toFixed(2)}
                </div>
              </div>
            </>
          )}
        </div>
        {errorMessage && <h3 className="error">{errorMessage}</h3>}
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
                variant="contained"
                className="submitBtn"
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
      {invoiceInfo && !editMode && (
        <>
          {/* <div className="horizontal"></div> */}
          {/* <Button
            variant="contained"
            color="warning"
            style={{
              margin: "0 auto",
              display: "block",
              marginBottom: "20px",
            }}
            onClick={handlePrint}
          >
            PRINT
          </Button> */}
          <div className="pdfView">
            <div
              size="A4"
              // style={styles.page}
              ref={componentPrintRef}
              className="page"
            >
              <div style={styles.company}>
                <img style={styles.company.companyLogo} src={logo} alt="" />
                <div style={styles.company.companyAddress}>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Study Support
                  </span>
                  <br />
                  255 Commercial Road <br /> London <br /> E12BT <br />{" "}
                  info@studysupportuk.com <br /> www.studysupportuk.com
                </div>
              </div>

              <h1 style={{ color: "rgb(48 177 178)", padding: "0 50px" }}>
                INVOICE
              </h1>

              <div style={styles.invoice}>
                <div style={styles.invoice.recipient}>
                  <span style={{ fontWeight: "bold" }}>INVOICE TO</span> <br />
                  {dataToSubmit.firstName + ' ' + dataToSubmit.lastName} <br /> {dataToSubmit.address} <br />{" "}
                  {dataToSubmit.postCode}
                </div>
                <div style={styles.invoice.dates}>
                  <table>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>INVOICE NO.</td>
                      <td style={{ paddingLeft: "5px" }}>{invoiceInfo.id}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>DATE</td>
                      <td style={{ paddingLeft: "5px" }}>
                        {dataToSubmit.invoiceDate
                          .split("-")
                          .reverse()
                          .join("/")}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>DUE DATE</td>
                      <td style={{ paddingLeft: "5px" }}>
                        {dataToSubmit.dueDate.split("-").reverse().join("/")}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>TERMS</td>
                      <td style={{ paddingLeft: "5px" }}>Due on receipt</td>
                    </tr>
                  </table>
                </div>
              </div>

              <div
                style={{
                  border: "solid 2px rgb(48 177 178)",
                  margin: "40px 50px 20px 50px",
                }}
              ></div>

              <div style={{ marginBottom: "40px", padding: "0 50px" }}>
                <span style={{ fontWeight: "bold" }}>START DATE</span> <br />
                {dataToSubmit.startDate.split("-").reverse().join("/")}
              </div>

              <table style={styles.details}>
                {dataToSubmit.amountDue === dataToSubmit.amountPaid ? (
                  <div class="watermark">
                    <div class="watermark__inner">
                      <div class="watermark__body">PAID</div>
                    </div>
                  </div>
                ) : null}

                <tr style={styles.details.header}>
                  <th style={{ width: "50%", padding: "5px 30px" }}>
                    ACTIVTIY
                  </th>
                  <th style={{ width: "20%" }}>QTY</th>
                  <th style={{ width: "15%" }}>RATE</th>
                  <th style={{ width: "15%", paddingRight: "30px" }}>AMOUNT</th>
                </tr>
                {sessions
                  ? sessions.map((student) => {
                      let QTY =
                        student.sessions?.reduce(
                          (accumulator, studentSessions) =>
                            accumulator +
                            (studentSessions.full_session ? 2 : 1),
                          0
                        ) || 0;
                        if (QTY === 0) return;
                      return (
                        <tr key={student.student_id}>
                          <td
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              paddingLeft: "30px",
                            }}
                          >
                            Sessions - {student.firstName + ' ' + student.lastName}
                          </td>
                          <td>{QTY}</td>
                          <td>
                            {student.rateInfo ? student.rateInfo[0].rate : 0}
                          </td>
                          <td>
                            {student.rateInfo
                              ? QTY * student.rateInfo[0].rate
                              : 0}
                          </td>
                        </tr>
                      );
                    })
                  : null}
                {dataToSubmit.JSONInvoiceMisc
                  ? dataToSubmit.JSONInvoiceMisc?.map((invoiceMisc, index) => {
                      return (
                        <tr>
                          <td
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              paddingLeft: "30px",
                            }}
                          >
                            {invoiceMisc.description}
                          </td>
                          <td>1</td>
                          <td>{invoiceMisc.rate}</td>
                          <td>{invoiceMisc.rate}</td>
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
                        <td style={{ fontWeight: "bold" }}>PAYMENT</td>
                        <td>{dataToSubmit.amountPaid}</td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{ fontWeight: "bold" }}>BALANCE DUE</td>
                      <td style={{ fontSize: "30px", fontWeight: "bold" }}>
                        £
                        {Number(
                          dataToSubmit.amountDue - dataToSubmit.amountPaid
                        ).toFixed(2)}
                      </td>
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
        </>
      )}
    </>
  );
};

export default InvoiceForm;
