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

  function findRegister(sessionDateID) {
    if (sessionDateID === "") return;
    setSessionDateID(sessionDateID);

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
          <RegisterTable sessions={sessions} />
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
