import { useEffect, useState } from "react";
import { getData } from "../../helpers/apiFunctions";
import "./registerPage.css";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import RegisterTable from "../../components/registerTable/RegisterTable";

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

  useEffect(() => {
    try {
      async function fetchSessionDates() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/sessionDate`
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
    setSessionDateID(sessionDateID);
    setEditMode(false);
    setChanges({
      add: [],
      update: [],
      remove: [],
    });

    try {
      async function fetchRegister() {
        const serverResponse = await getData(
          `${process.env.REACT_APP_API_URL}/api/register/${sessionDateID}`
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

  function updateRegisterState(input) {
    console.log({ input });

    setUpdatedSessions((prevState) => {
      // find the index of the sessionTime that needs to be updated
      const sessionIndex = prevState.findIndex(
        (session) => session.session_time === input.sessionTime
      );

      if (sessionIndex === -1) {
        // sessionTime not found, return the previous state
        console.log("session index not found");
        return prevState;
      }

      // find the index of the sessionTable that needs to be updated
      const tableIndex = prevState[sessionIndex].tables.findIndex(
        (table) => table.session_table === input.sessionTable
      );

      if (tableIndex === -1) {
        // sessionTable not found, return the previous state
        console.log("table index not found");
        return prevState;
      }

      const { student_session_id, student_id } = input.student;

      // find the index of the student session that needs to be updated
      let studentSessionIndex;
      // if (student_session_id !== "new") {
      //   studentSessionIndex = prevState[sessionIndex].tables[
      //     tableIndex
      //   ].students.findIndex(
      //     (student) => student.student_session_id === student_session_id
      //   );
      // } else {
      studentSessionIndex = prevState[sessionIndex].tables[
        tableIndex
      ].students.findIndex(
        (student) =>
          student.student_session_id === student_session_id &&
          student.student_id === student_id
      );
      // }

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
                student.student_id === student_id
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
                student.student_id === student_id
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
          1
        );

        if (student_session_id === "new") {
          setChanges((prevChanges) => {
            const existingObjectIndex = prevChanges.add.findIndex(
              (student) =>
                student.student_session_id === student_session_id &&
                student.student_id === student_id
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
                student.student_id === student_id
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
            session_slot: input.sessionTime,
            session_table: input.sessionTable,
            session_date_id: sessionDateID,
          };
          const newAddArray = [...prevChanges.add, newObject];
          return { ...prevChanges, add: newAddArray };
        });
      }

      // return the updated state
      return [...prevState];
    });
  }

  return (
    <div className="registerPageContainer">
      <h2 className="title">Register</h2>
      <div className="listContainer">
        <div className="listHeader">
          <div className="listTitle">Register</div>
          <Button
            // onClick={() => navigate("/contacts/new")}
            variant="contained"
            className="createBtn"
          >
            Create New Register
          </Button>
        </div>
        <Grid item xs={4}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Select Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="relation"
              multiline
              value={sessionDateID}
              onChange={(e) => findRegister(e.target.value)}
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
        </Grid>
        {sessions.length !== 0 ? (
          <RegisterTable
            updatedSessions={updatedSessions}
            updateRegisterState={updateRegisterState}
            editMode={editMode}
            setEditMode={setEditMode}
            cancelChanges={cancelChanges}
          />
        ) : (
          <h3 style={{ marginTop: "20px", fontSize: "16px", color: "red" }}>
            Please select a date to show register
          </h3>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
