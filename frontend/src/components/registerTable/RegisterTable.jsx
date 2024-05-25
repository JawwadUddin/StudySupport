import { useState, useEffect } from "react";
import "./registerTable.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getData, deleteData } from "../../helpers/apiFunctions";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import CachedIcon from "@mui/icons-material/Cached";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ClearIcon from "@mui/icons-material/Clear";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


const RegisterTable = ({
  updatedSessions,
  updateRegisterState,
  editMode,
  setEditMode,
  cancelChanges,
  handleSubmit,
  sessionDateID,
  loading
}) => {
  const [register, setRegister] = useState([]);
  const [students, setStudents] = useState([]);
  const [compensations, setCompensations] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setRegister([...updatedSessions]);
  }, [updatedSessions]);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverStudentResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/student`
        );
        if (serverStudentResponse.message === "OK") {
          setStudents(serverStudentResponse.results.data);
        } else {
          throw Error(serverStudentResponse.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      async function fetchCompensations() {
        const serverCompensationResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/compensations/${sessionDateID}`
        );
        if (serverCompensationResponse.message === "OK") {
          setCompensations(serverCompensationResponse.results.data);
        } else {
          throw Error(serverCompensationResponse.message);
        }
      }
    fetchCompensations()
    } catch (error) {
      console.log(error);
    }
  }, [sessionDateID])

    function openDeleteModal() {
    setOpenModal(true);
    console.log(sessionDateID)
  }

  function cancelDeleteModal() {
    setOpenModal(false);
    console.log("cancel delete")
  }

  function handleDeleteRegister() {
    //run delete request
    async function removeData() {
      await deleteData(
        `${process.env.REACT_APP_API_URL}/api/register/${sessionDateID}`
      );
    }
    removeData();
    window.location.reload(false);
    setOpenModal(false);
  }

  const NewStudentSession = ({ sessionTime, sessionTable }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCompensation, setSelectedCompensation] = useState(null);
    const [showField, setShowField] = useState(false);
    const [fullSession, setFullSession] = useState(true);

    return (
      <>
        {showField ? (
          <>
            <div className="student-session-form">
              <IconButton
                className="half-session-icon"
                sx={{ color: fullSession ? "grey" : "#16629f" }}
                onClick={() => {
                  if (editMode) {
                    setFullSession((prev) => !prev);
                  } else {
                    console.log("cant edit");
                  }
                }}
                aria-label="delete"
                color="error"
              >
                <HourglassBottomIcon />
              </IconButton>
              <Autocomplete
                className="form-input"
                size="small"
                disablePortal
                id="combo-box-demo"
                options={students}
                value={selectedStudent}
                onChange={(e, value) => {
                  setSelectedStudent(value);
                }}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.firstName + " " + option.lastName + " - Yr " + option.schoolYear}
                renderInput={(params) => (
                  <TextField {...params} label="Student" />
                )}
              />
              <IconButton
                className="form-tick-icon"
                onClick={() => {
                  if (selectedStudent === null) return;
                  updateRegisterState({
                    type: "add-session",
                    sessionTime,
                    sessionTable,
                    student: {
                      student_id: selectedStudent.id,
                      firstName: selectedStudent.firstName,
                      lastName: selectedStudent.lastName,
                      schoolYear: selectedStudent.schoolYear,
                      attendance: false,
                      student_session_id: "new",
                      compensation_id: null,
                      full_session: fullSession,
                    },
                  });
                }}
                aria-label="confirm-edit"
                color="success"
              >
                <CheckIcon />
              </IconButton>
            </div>
            <div className="compensation-session-form">
              <Autocomplete
                className="form-input"
                size="small"
                disablePortal
                id="combo-box"
                options={compensations}
                value={selectedCompensation}
                onChange={(e, value) => {
                  setSelectedCompensation(value);
                }}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.firstName + " " + option.lastName}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.studentSessionID}>
                      {option.firstName + " " + option.lastName + " - Yr " + option.schoolYear} - {option.sessionDate}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Compensation" />
                )}
              />
              <IconButton
                className="form-tick-icon"
                onClick={() => {
                  if (selectedCompensation === null) return;
                  updateRegisterState({
                    type: "add-session",
                    sessionTime,
                    sessionTable,
                    student: {
                      student_id: selectedCompensation.studentID,
                      firstName: selectedCompensation.firstName,
                      lastName: selectedCompensation.lastName,
                      schoolYear: selectedCompensation.schoolYear,
                      attendance: true,
                      student_session_id: "new",
                      compensation_id: selectedCompensation.studentSessionID,
                      full_session: true,
                    },
                  });
                }}
                aria-label="confirm-edit"
                color="success"
              >
                <CheckIcon />
              </IconButton>
            </div>
          </>
        ) : null}
        {showField ? (
          <Button
            className="cancel-add-icon"
            variant="contained"
            color="warning"
            size="small"
            onClick={() => {
              setShowField(false);
              setSelectedStudent(null);
            }}
          >
            -
          </Button>
        ) : (
          <Button
            className="add-icon"
            variant="contained"
            size="small"
            onClick={() => setShowField(true)}
          >
            +
          </Button>
        )}
      </>
    );
  };

  return (
    <div>
      {register.map((session, index) => {
        return (
          <div key={index}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px", marginBottom: "20px", position: "relative"}}>
            <h2 className="session-time">{session.session_time}</h2>
            <div className="session-count">{session.tables.map(table => table.students.reduce((acc, cur) => acc + cur.attendance, 0)).reduce((acc, cur) => acc + cur, 0)}</div>
            </div>
            <div className="tables-container">
              {session.tables.map((table, index) => {
                return (
                  <div key={index} className="table">
                    <h3 className="table-name">{table.session_table}</h3>
                    <div className="table-items">
                      {table.students?.map((student, index) => {
                        return (
                          <div key={index} className="student">
                            <div className="student-name">
                              {editMode ? (
                                <IconButton
                                  className="remove-icon"
                                  onClick={() => {
                                    if (editMode) {
                                      updateRegisterState({
                                        type: "remove-session",
                                        sessionTime: session.session_time,
                                        sessionTable: table.session_table,
                                        student,
                                      });
                                    } else {
                                      console.log("cant remove");
                                    }
                                  }}
                                  aria-label="delete"
                                  color="error"
                                >
                                  <RemoveCircleOutlineIcon />
                                </IconButton>
                              ) : null}

                              {student.firstName + " " + student.lastName + " - Yr " + student.schoolYear}
                              {student.compensation_id && (
                                // <div className="compensation-tag"></div>
                                <CachedIcon className="compensation-tag" />
                              )}
                              {!student.full_session &&
                                !student.compensation_id && (
                                  <HourglassBottomIcon className="half-session-tag" />
                                )}
                            </div>
                            <div
                              className="student-attendance"
                              onClick={() => {
                                if (editMode) {
                                  updateRegisterState({
                                    type: "update-attendance",
                                    sessionTime: session.session_time,
                                    sessionTable: table.session_table,
                                    student,
                                  });
                                } else {
                                  console.log("cant edit");
                                }
                              }}
                            >
                              {student.attendance ? (
                                <CheckCircleIcon className="present-icon" />
                              ) : (
                                <CancelIcon className="absent-icon" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {editMode ? (
                        <NewStudentSession
                          sessionTime={session.session_time}
                          sessionTable={table.session_table}
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="legend">
        <div>
          <CachedIcon className="compensation-tag icon" /> Compensation
        </div>
        <div>
          <HourglassBottomIcon className="half-session-tag icon" /> 1 Hour
          Session
        </div>
        <div>
          <CheckCircleIcon className="present-icon icon" /> Present
        </div>
        <div>
          <CancelIcon className="absent-icon icon" /> Absent
        </div>
      </div>
      <div className="formEnd" style={{position: 'relative'}}>
        <Button variant="outlined"
            color="error"
            className="deleteBtn"
            onClick={() => openDeleteModal()}>Delete Register</Button>
          {!editMode ? (
            <Button
              onClick={() => setEditMode(true)}
              variant="outlined"
              color="secondary"
              className="editBtn"
            >
              Edit Register
            </Button>
          ) : (
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
                onClick={() => handleSubmit()}
                variant="contained"
                disabled={loading}
                color="secondary"
                className="submitBtn"
              >
                Confirm Changes
              </Button>
            </>
          )}
        
        {openModal && (
        <div className="modalContainerRegister">
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
              <h1>Delete register?</h1>
              <p>
                This erases the register forever. You can’t undo this. <br />{" "}
                <br /> Any invoices already generated from this register will be updated.
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
                onClick={() => handleDeleteRegister()}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default RegisterTable;
