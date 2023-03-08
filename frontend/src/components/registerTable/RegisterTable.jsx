import { useState, useEffect } from "react";
import "./registerTable.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getData } from "../../helpers/apiFunctions";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const RegisterTable = ({
  updatedSessions,
  updateRegisterState,
  editMode,
  setEditMode,
  cancelChanges,
}) => {
  const [register, setRegister] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setRegister([...updatedSessions]);
  }, [updatedSessions]);

  useEffect(() => {
    try {
      async function fetchData() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/student`
        );
        if (serverResponse.message === "OK") {
          setStudents(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const NewStudentSession = ({ sessionTime, sessionTable }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showField, setShowField] = useState(false);

    return (
      <>
        {showField ? (
          <div className="student-session-form">
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
              getOptionLabel={(option) => option.fullName}
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
                    full_name: selectedStudent.fullName,
                    attendance: false,
                    student_session_id: "new",
                  },
                });
              }}
              aria-label="confirm-edit"
              color="success"
            >
              <CheckIcon />
            </IconButton>
          </div>
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
            <h2 className="session-time">{session.session_time}</h2>
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

                              {student.full_name}
                              {student.compensation_id && (
                                <div className="compensation-tag"></div>
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
      <div className="formEnd">
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
            <Button variant="contained" color="secondary" className="submitBtn">
              Confirm Changes
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterTable;
