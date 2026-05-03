import { useEffect, useState } from "react";
import { getData, updateData } from "../../helpers/apiFunctions";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RegisterTable from "../../components/registerTable/RegisterTable";
import { useNavigate, useLocation } from "react-router-dom";
import "./registerPage.css";

const RegisterPage = () => {
  const [sessionDate, setSessionDate] = useState([]);
  const [sessionDateID, setSessionDateID] = useState("");
  const [sessions, setSessions] = useState([]);
  const [updatedSessions, setUpdatedSessions] = useState([]);
  const [changes, setChanges] = useState({
    add: [],
    update: [],
    remove: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const newSessionDateID = location.state
    ? location.state.newSessionDateID
    : null;

  useEffect(() => {
    try {
      async function fetchSessionDates() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/sessionDate`,
        );
        if (serverResponse.message === "OK") {
          setSessionDate(serverResponse.results.data);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchSessionDates();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (newSessionDateID) {
      setSessionDateID(newSessionDateID);
    }
  }, [newSessionDateID]);

  useEffect(() => {
    findRegister(sessionDateID);
  }, [sessionDateID]);

  useEffect(() => {
    setUpdatedSessions(JSON.parse(JSON.stringify(sessions)));
  }, [sessions]);

  function cancelChanges() {
    setEditMode(false);
    setUpdatedSessions(JSON.parse(JSON.stringify(sessions)));
    setChanges({
      add: [],
      update: [],
      remove: [],
    });
  }

  function findRegister(sessionDateID) {
    if (sessionDateID === "") return;
    setEditMode(false);
    setChanges({
      add: [],
      update: [],
      remove: [],
    });

    try {
      async function fetchRegister() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/register/${sessionDateID}`,
        );
        if (serverResponse.message === "OK") {
          console.log(serverResponse);
          setSessions(serverResponse.results.data[0]?.sessions);
        } else {
          throw Error(serverResponse.message);
        }
      }
      fetchRegister();
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit() {
    try {
      async function updateRegister() {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const serverResponse = await updateData(
          `${process.env.REACT_APP_API_URL}/api/register/`,
          changes,
        );
        if (serverResponse.message === "OK") {
          setLoading(false);
          findRegister(sessionDateID);
        } else {
          setLoading(false);
          throw Error(serverResponse.message);
        }
      }
      updateRegister();
    } catch (error) {
      console.log(error);
    }
  }

  function updateRegisterState(input) {
    setUpdatedSessions((prevState) => {
      const sessionIndex = prevState.findIndex(
        (session) => session.session_time === input.sessionTime,
      );

      if (sessionIndex === -1) {
        console.log("session index not found");
        return prevState;
      }

      const tableIndex = prevState[sessionIndex].tables.findIndex(
        (table) => table.session_table === input.sessionTable,
      );

      if (tableIndex === -1) {
        console.log("table index not found");
        return prevState;
      }

      const { student_session_id, student_id } = input.student;

      let studentSessionIndex;
      studentSessionIndex = prevState[sessionIndex].tables[
        tableIndex
      ].students.findIndex(
        (student) =>
          student.student_session_id === student_session_id &&
          student.student_id === student_id,
      );

      if (input.type === "update-attendance") {
        prevState[sessionIndex].tables[tableIndex].students[
          studentSessionIndex
        ].attendance =
          !prevState[sessionIndex].tables[tableIndex].students[
            studentSessionIndex
          ].attendance;

        setChanges((prevChanges) => {
          if (student_session_id === "new") {
            const existingObjectIndex = prevChanges.add.findIndex(
              (student) =>
                student.student_session_id === student_session_id &&
                student.student_id === student_id,
            );
            const updatedObject = {
              ...prevChanges.add[existingObjectIndex],
              attendance: !prevChanges.add[existingObjectIndex].attendance,
            };
            const newAddArray = [...prevChanges.add];
            newAddArray.splice(existingObjectIndex, 1, updatedObject);
            return { ...prevChanges, add: newAddArray };
          } else {
            const existingObjectIndex = prevChanges.update.findIndex(
              (student) =>
                student.student_session_id === student_session_id &&
                student.student_id === student_id,
            );

            if (existingObjectIndex !== -1) {
              const updatedObject = {
                ...prevChanges.update[existingObjectIndex],
                attendance: !prevChanges.update[existingObjectIndex].attendance,
              };
              const newUpdateArray = [...prevChanges.update];
              newUpdateArray.splice(existingObjectIndex, 1, updatedObject);
              return { ...prevChanges, update: newUpdateArray };
            } else {
              const newObject = {
                ...input.student,
              };
              const newUpdateArray = [...prevChanges.update, newObject];
              return { ...prevChanges, update: newUpdateArray };
            }
          }
        });
      }

      if (input.type === "remove-session") {
        prevState[sessionIndex].tables[tableIndex].students.splice(
          studentSessionIndex,
          1,
        );

        if (student_session_id === "new") {
          setChanges((prevChanges) => {
            const existingObjectIndex = prevChanges.add.findIndex(
              (student) =>
                student.student_session_id === student_session_id &&
                student.student_id === student_id,
            );
            const newAddArray = [...prevChanges.add];
            newAddArray.splice(existingObjectIndex, 1);
            return {
              ...prevChanges,
              add: newAddArray,
            };
          });
        } else {
          setChanges((prevChanges) => {
            const existingObjectIndex = prevChanges.update.findIndex(
              (student) =>
                student.student_session_id === student_session_id &&
                student.student_id === student_id,
            );
            let newUpdateArray = [...prevChanges.update];
            if (existingObjectIndex !== -1) {
              newUpdateArray.splice(existingObjectIndex, 1);
            }
            return {
              ...prevChanges,
              update: newUpdateArray,
              remove: [
                ...prevChanges.remove,
                { student_session_id: input.student.student_session_id },
              ],
            };
          });
        }
      }

      if (input.type === "add-session") {
        prevState[sessionIndex].tables[tableIndex].students.push(input.student);

        setChanges((prevChanges) => {
          const newObject = {
            ...input.student,
            session_time: input.sessionTime,
            session_table: input.sessionTable,
            session_date_id: sessionDateID,
          };
          const newAddArray = [...prevChanges.add, newObject];
          return { ...prevChanges, add: newAddArray };
        });
      }

      return [...prevState];
    });
  }

  return (
    <div className="registerPageContainer">
      <div className="pageHeader">
        <div className="headerLeft">
          <h2>Register</h2>
          <div className="subtitle">Manage attendance records</div>
        </div>
        <button className="btnNewRegister" onClick={() => navigate("new")}>
          + New Register
        </button>
      </div>
      <div className="registerCard">
        <div className="dateSelector">
          <FormControl fullWidth sx={{ maxWidth: 280 }}>
            <InputLabel>Select Date</InputLabel>
            <Select
              label="Select Date"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 500,
                  },
                },
              }}
              value={sessionDateID}
              onChange={(e) => setSessionDateID(e.target.value)}
            >
              {sessionDate.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.sessionDate}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        {sessions.length !== 0 ? (
          <RegisterTable
            updatedSessions={updatedSessions}
            updateRegisterState={updateRegisterState}
            editMode={editMode}
            setEditMode={setEditMode}
            cancelChanges={cancelChanges}
            handleSubmit={handleSubmit}
            sessionDateID={sessionDateID}
            sessionDate={
              sessionDate.find((session) => session.id === sessionDateID)
                .sessionDate
            }
            loading={loading}
          />
        ) : (
          <div className="emptyState">
            <div className="emptyIcon">
              <EventNoteIcon sx={{ fontSize: 28, color: "var(--accent)" }} />
            </div>
            <p>No register found</p>
            <p className="emptyHint">Select a date above to view the register</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
