import { useState, useEffect } from "react";
import { getData, saveData } from "../../helpers/apiFunctions";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [registerDate, setRegisterDate] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [templateError, setTemplateError] = useState("");
  const [sessionDate, setSessionDate] = useState([]);
  const [sessionDateID, setSessionDateID] = useState("");

  const navigate = useNavigate();

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

  function handleBlankCanvas() {
    if (registerDate === "") {
      setRegisterError("This is a required field");
      return;
    }
    try {
      async function createRegisterBlank() {
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/api/sessionDate`,
          registerDate
        );
        if (serverResponse.message === "OK") {
          const { newSessionDateID } = serverResponse.results.data;
          navigate("/register", { state: { newSessionDateID }, replace: true });
        } else {
          throw Error(serverResponse.message);
        }
      }
      createRegisterBlank();
    } catch (error) {
      console.log(error);
    }
  }

  function handleGenerateTemplate() {
    if (registerDate === "") {
      setRegisterError("This is a required field");
      return;
    }
    if (sessionDateID === "") {
      setTemplateError("This is a required field");
      return;
    }
    try {
      async function createRegisterTemplate() {
        const serverResponse = await saveData(
          `${process.env.REACT_APP_API_URL}/api/register`,
          { registerDate, templateID: sessionDateID }
        );
        if (serverResponse.message === "OK") {
          const { newSessionDateID } = serverResponse.results.data;
          navigate("/register", { state: { newSessionDateID }, replace: true });
        } else {
          throw Error(serverResponse.message);
        }
      }
      createRegisterTemplate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="registerForm form">
      <h3>Register Form</h3>
      <Grid container>
        <Grid item xs={12}>
          <InputLabel>Select a date to create a register for:</InputLabel>
          <TextField
            required
            error={registerError.length !== 0}
            helperText={registerError}
            id="date"
            label="Register Date"
            type="date"
            name="date"
            value={registerDate}
            onChange={(e) => {
              setRegisterDate(e.target.value);
              setRegisterError("");
              console.log(e.target.value);
            }}
            sx={{ width: 220, marginTop: "20px", marginBottom: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Create register from scratch:</InputLabel>
          <Button
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            variant="contained"
            color="secondary"
            onClick={() => handleBlankCanvas()}
          >
            Blank Canvas
          </Button>
        </Grid>
        <Grid item xs={12}>
          <InputLabel>
            Create a register using an existing one as a template:
          </InputLabel>
          <FormControl
            sx={{ width: 220, marginTop: "20px", marginBottom: "20px" }}
          >
            <InputLabel id="demo-simple-select-label">Template Date</InputLabel>
            <Select
              error={templateError.length !== 0}
              labelId="demo-simple-select-label"
              id="relation"
              multiline
              value={sessionDateID}
              onChange={(e) => {
                setSessionDateID(e.target.value);
                setTemplateError("");
                console.log(e.target.value);
              }}
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleGenerateTemplate();
            }}
          >
            Generate Template
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterForm;
